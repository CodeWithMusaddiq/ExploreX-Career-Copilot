import express from 'express'
import { protect } from '../middleware/auth.js'
import { getProfile, updateProfile } from '../controllers/user.controller.js'
import { validateBody } from '../middleware/validation.js'
import { profileUpdateSchema } from '../validation/schemas.js'
const router = express.Router()
router.get('/profile', protect, getProfile)
router.put('/profile', protect, validateBody(profileUpdateSchema), updateProfile)
export default router
