import User from '../models/User.js'
import { generateToken } from '../middleware/auth.js'

export const register = async (req, res) => {
  try {
    const { name, email, password, education } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) return res.status(400).json({ message: 'User already exists' })
    const user = await User.create({ name, email, password, education })
    res.status(201).json({ token: generateToken(user._id), user: { id: user._id, name: user.name, email: user.email, education: user.education } })
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: 'An account with this email already exists' })
    res.status(500).json({ message: 'Unable to register at this time' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })
    const isMatch = await user.comparePassword(password)
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' })
    res.json({ token: generateToken(user._id), user: { id: user._id, name: user.name, email: user.email, education: user.education } })
  } catch {
    res.status(500).json({ message: 'Unable to log in at this time' })
  }
}
