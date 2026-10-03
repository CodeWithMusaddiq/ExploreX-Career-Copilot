import CareerAnalysis from '../models/CareerAnalysis.js'
import { analyzeCareerWithGemini, compareCareerWithGemini, chatWithGemini } from '../services/gemini.service.js'

export const analyzeCareer = async (req, res) => {
  try {
    const { education, interests, goals, skills, language = 'English' } = req.body

    if (!education || !interests || !goals || !skills) {
      return res.status(400).json({ message: 'All fields are required: education, interests, goals, skills' })
    }

    const aiResults = await analyzeCareerWithGemini({ education, interests, goals, skills, language })

    const analysis = await CareerAnalysis.create({
      user: req.user._id,
      input: { education, interests, goals, skills, language },
      results: aiResults,
      geminiResponse: JSON.stringify(aiResults)
    })

    res.json({
      success: true,
      data: aiResults,
      analysisId: analysis._id
    })

  } catch (error) {
    console.error('Career analysis could not be completed:', error.name || 'Error')
    res.status(500).json({ message: 'Unable to complete career analysis' })
  }
}

export const compareCareers = async (req, res) => {
  try {
    const { careers } = req.body

    if (!careers || !Array.isArray(careers) || careers.length < 2) {
      return res.status(400).json({ message: 'Please provide at least 2 careers to compare' })
    }

    const result = await compareCareerWithGemini(careers)
    res.json({ success: true, ...result })

  } catch (error) {
    console.error('Career comparison could not be completed:', error.name || 'Error')
    res.status(500).json({ message: 'Unable to compare careers' })
  }
}

export const getAnalysisHistory = async (req, res) => {
  try {
    const history = await CareerAnalysis.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('-geminiResponse')
    res.json(history)
  } catch {
    res.status(500).json({ message: 'Unable to load career analysis history' })
  }
}

// NEW: Chat handler for follow-up questions
export const chatWithAI = async (req, res) => {
  try {
    const { message, language = 'English' } = req.body

    if (!message) {
      return res.status(400).json({ message: 'Message is required' })
    }

    const response = await chatWithGemini(message, language)

    res.json({
      success: true,
      response: response
    })

  } catch (error) {
    console.error('AI chat could not be completed:', error.name || 'Error')
    res.status(500).json({ message: 'Unable to complete AI chat request' })
  }
}