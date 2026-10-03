import Mentor from '../models/Mentor.js'
import Booking from '../models/Booking.js'

export const getMentors = async (req, res) => {
  try {
    const { category, search } = req.query
    let query = {}
    if (category && category !== 'All') query.expertise = { $in: [new RegExp(category, 'i')] }
    if (search) query.$or = [{ name: new RegExp(search, 'i') }, { expertise: { $in: [new RegExp(search, 'i')] } }]
    const mentors = await Mentor.find(query).sort({ rating: -1 })
    res.json(mentors)
  } catch (error) { res.status(500).json({ message: error.message }) }
}

export const createBooking = async (req, res) => {
  try {
    const { mentorId, date, time, topic } = req.body
    const mentor = await Mentor.findById(mentorId)
    if (!mentor) return res.status(404).json({ message: 'Mentor not found' })
    const booking = await Booking.create({ user: req.user._id, mentor: mentorId, date, time, topic, price: mentor.price, status: 'confirmed' })
    await booking.populate('mentor')
    res.status(201).json({ success: true, booking, message: 'Booking confirmed successfully' })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'This mentor time slot is already booked' })
    }
    res.status(500).json({ message: 'Unable to create booking' })
  }
}

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('mentor', 'name role company image').sort({ createdAt: -1 })
    res.json(bookings)
  } catch { res.status(500).json({ message: 'Unable to load bookings' }) }
}
