import express from 'express'
import { protect } from '../middleware/auth.js'
import { analyzeCareer, compareCareers, getAnalysisHistory, chatWithAI } from '../controllers/career.controller.js'
import { aiLimiter } from '../middleware/rateLimiters.js'
import { validateBody } from '../middleware/validation.js'
import { aiChatSchema, careerAnalysisSchema, careerComparisonSchema } from '../validation/schemas.js'

const router = express.Router()

router.post('/analyze', protect, aiLimiter, validateBody(careerAnalysisSchema), analyzeCareer)
router.post('/compare', protect, aiLimiter, validateBody(careerComparisonSchema), compareCareers)
router.get('/history', protect, getAnalysisHistory)
router.post('/chat', protect, aiLimiter, validateBody(aiChatSchema), chatWithAI)

export default router