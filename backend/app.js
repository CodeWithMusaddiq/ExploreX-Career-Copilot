import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import careerRoutes from './routes/career.routes.js'
import mentorRoutes from './routes/mentor.routes.js'
import { authLimiter } from './middleware/rateLimiters.js'

const app = express()
const configuredClientUrl = process.env.CLIENT_URL
let corsOrigin = process.env.NODE_ENV === 'production'
  ? configuredClientUrl
  : configuredClientUrl || 'http://localhost:5173'

if (process.env.NODE_ENV === 'production' && !configuredClientUrl) {
  throw new Error('CLIENT_URL must be configured in production.')
}

if (corsOrigin) {
  let parsedOrigin
  try {
    parsedOrigin = new URL(corsOrigin)
  } catch {
    throw new Error('CLIENT_URL must be a valid HTTP or HTTPS origin.')
  }
  if (!['http:', 'https:'].includes(parsedOrigin.protocol) || parsedOrigin.origin !== corsOrigin.replace(/\/$/, '')) {
    throw new Error('CLIENT_URL must be a valid HTTP or HTTPS origin.')
  }
  corsOrigin = parsedOrigin.origin
}

app.use(helmet())
app.use(cors({
  origin: corsOrigin,
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/career', careerRoutes)
app.use('/api/mentors', mentorRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'ExploreX API is running' })
})

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` })
})

app.use((err, req, res, next) => {
  if (err.status === 400) {
    return res.status(400).json({ message: 'Invalid JSON request body' })
  }
  console.error('Request failed:', err.name || 'Error')
  res.status(err.status || 500).json({
    message: process.env.NODE_ENV === 'development' && err.status ? err.message : 'Internal server error'
  })
})

export default app
