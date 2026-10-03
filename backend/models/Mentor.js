import mongoose from 'mongoose'

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  experience: { type: String, required: true },
  expertise: [{ type: String }],
  bio: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 5.0 },
  reviews: { type: Number, default: 0 },
  sessions: { type: Number, default: 0 },
  availability: [{ type: String }],
  languages: [{ type: String }],
  image: { type: String, default: '' },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true })

export default mongoose.model('Mentor', mentorSchema)
