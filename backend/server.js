import 'dotenv/config'
import app from './app.js'
import { validateEnvironment } from './config/environment.js'
import connectDB from './config/db.js'

const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    validateEnvironment()
    await connectDB()
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
      console.log(`📡 API: http://localhost:${PORT}/api/health`)
    })
  } catch (error) {
    console.error('❌ API startup failed. Check required configuration and database connectivity.')
    process.exitCode = 1
  }
}

startServer()