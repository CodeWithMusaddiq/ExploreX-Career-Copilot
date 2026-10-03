import mongoose from 'mongoose'

const careerAnalysisSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  input: { education: String, interests: String, goals: String, skills: String, language: { type: String, default: 'en' } },
  results: {
    careers: [{ title: String, compatibility: Number, salary: String, description: String }],
    roadmap: [{ stage: String, duration: String, topics: [String] }],
    skills: [String],
    internships: [{ company: String, role: String, stipend: String }],
    freelancing: [{ platform: String, avgEarning: String, projects: String }],
    aiOpportunities: [String]
  },
  geminiResponse: { type: String }
}, { timestamps: true })

export default mongoose.model('CareerAnalysis', careerAnalysisSchema)
