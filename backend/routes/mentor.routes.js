import express from 'express'
import { protect } from '../middleware/auth.js'
import { getMentors, createBooking, getUserBookings } from '../controllers/mentor.controller.js'
import { bookingLimiter } from '../middleware/rateLimiters.js'
import { validateBody } from '../middleware/validation.js'
import { mentorBookingSchema } from '../validation/schemas.js'
const router = express.Router()
router.get('/', protect, getMentors)
router.post('/bookings', protect, bookingLimiter, validateBody(mentorBookingSchema), createBooking)
router.get('/bookings', protect, getUserBookings)
export default router
