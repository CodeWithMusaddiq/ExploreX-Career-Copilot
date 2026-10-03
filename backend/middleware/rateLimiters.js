import rateLimit from 'express-rate-limit'

const createLimiter = (limit, message) => rateLimit({
  windowMs: 15 * 60 * 1000,
  limit,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message }
})

export const authLimiter = createLimiter(10, 'Too many authentication attempts. Try again later.')
export const aiLimiter = createLimiter(20, 'Too many AI requests. Try again later.')
export const bookingLimiter = createLimiter(10, 'Too many booking attempts. Try again later.')
