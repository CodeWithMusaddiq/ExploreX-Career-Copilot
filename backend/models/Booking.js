import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor', required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  topic: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  price: { type: Number, required: true },
  meetingLink: { type: String, default: '' },
  notes: { type: String, default: '' }
}, { timestamps: true })

bookingSchema.index(
  { mentor: 1, date: 1, time: 1 },
  {
    unique: true,
    partialFilterExpression: { status: { $in: ['pending', 'confirmed'] } },
    name: 'uniq_active_mentor_booking_slot'
  }
)

export default mongoose.model('Booking', bookingSchema)
