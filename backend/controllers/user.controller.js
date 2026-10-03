import User from '../models/User.js'

const editableProfileFields = [
  'name',
  'education',
  'interests',
  'skills',
  'goals',
  'location',
  'bio',
  'linkedin',
  'github',
  'portfolio'
]

export const getProfile = async (req, res) => {
  try { const user = await User.findById(req.user._id).select('-password'); res.json(user) }
  catch { res.status(500).json({ message: 'Unable to load profile' }) }
}

export const updateProfile = async (req, res) => {
  try {
    const updates = Object.fromEntries(
      editableProfileFields
        .filter((field) => Object.hasOwn(req.body, field))
        .map((field) => [field, req.body[field]])
    )
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password')
    res.json(user)
  } catch { res.status(500).json({ message: 'Unable to update profile' }) }
}
