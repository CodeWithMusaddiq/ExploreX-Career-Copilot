import axios from 'axios'
import {
  careerAnalysisResponseSchema,
  careerComparisonResponseSchema
} from '../validation/schemas.js'

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
const geminiHeaders = {
  'Content-Type': 'application/json',
  'x-goog-api-key': process.env.GEMINI_API_KEY
}

const parseGeminiJson = (text, schema) => {
  const cleaned = text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '')
    .trim()
  return schema.parse(JSON.parse(cleaned))
}

export const analyzeCareerWithGemini = async ({ education, interests, goals, skills, language = 'English' }) => {
  const prompt = `
You are an expert career counselor for Indian students. Analyze the student profile and return ONLY a valid JSON response.

Student Profile:
- Education: ${education}
- Interests: ${interests}
- Goals: ${goals}
- Current Skills: ${skills}
- Preferred Language: ${language}

Return ONLY this JSON structure (no markdown, no explanation):
{
  "careers": [
    {
      "title": "Career Title",
      "compatibility": 92,
      "salary": "Rs X-Y LPA",
      "demand": "Very High",
      "description": "Brief student-friendly description"
    }
  ],
  "roadmap": [
    {
      "stage": "Stage Name",
      "duration": "X months",
      "topics": ["Topic 1", "Topic 2", "Topic 3"]
    }
  ],
  "skills": ["Skill1", "Skill2", "Skill3", "Skill4", "Skill5"],
  "internships": [
    {
      "company": "Company Name",
      "role": "Role Title",
      "stipend": "Rs X/month"
    }
  ],
  "freelancing": [
    {
      "platform": "Platform Name",
      "avgEarning": "$X-Y/hr",
      "projects": "Type of projects"
    }
  ],
  "aiOpportunities": [
    "AI opportunity 1",
    "AI opportunity 2",
    "AI opportunity 3"
  ]
}

Rules:
- Return exactly 3 careers, sorted by compatibility (highest first)
- Return exactly 4 roadmap stages
- Return exactly 6-8 skills
- Return exactly 3 internships
- Return exactly 2 freelancing options
- Return exactly 3 AI opportunities
- Keep all text concise and student-friendly
- Use Indian context (rupees, Indian companies)
`

  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        }
      },
      { headers: geminiHeaders, timeout: 30000 }
    )

    const rawText = response.data.candidates[0].content.parts[0].text
    return parseGeminiJson(rawText, careerAnalysisResponseSchema)

  } catch (error) {
    console.error('Gemini career analysis failed:', error.name || 'Error')
    return getFallbackData(education, interests)
  }
}

export const compareCareerWithGemini = async (careers) => {
  const prompt = `
Compare these careers for an Indian student: ${careers.join(' vs ')}

Return ONLY this JSON (no markdown):
{
  "comparison": [
    {
      "career": "Career Name",
      "salaryScore": 85,
      "demandScore": 90,
      "growthScore": 88,
      "workLifeScore": 75,
      "entryDifficulty": "Medium",
      "avgSalary": "Rs X-Y LPA",
      "topSkills": ["Skill1", "Skill2", "Skill3"],
      "pros": ["Pro 1", "Pro 2", "Pro 3"],
      "cons": ["Con 1", "Con 2"]
    }
  ],
  "winner": "Career Name",
  "verdict": "One line verdict for student"
}
`

  try {
    const response = await axios.post(
      GEMINI_API_URL,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: geminiHeaders, timeout: 30000 }
    )

    const rawText = response.data.candidates[0].content.parts[0].text
    return parseGeminiJson(rawText, careerComparisonResponseSchema)

  } catch (error) {
    console.error('Gemini career comparison failed:', error.name || 'Error')
    return {
      comparison: careers.map(c => ({
        career: c, salaryScore: 80, demandScore: 85, growthScore: 82,
        workLifeScore: 75, entryDifficulty: 'Medium', avgSalary: 'Rs 8-20 LPA',
        topSkills: ['Skill 1', 'Skill 2', 'Skill 3'],
        pros: ['Good growth', 'High demand', 'Good salary'],
        cons: ['Competitive field']
      })),
      winner: careers[0],
      verdict: 'Both careers have strong prospects in India.'
    }
  }
}

// NEW: Chat function for follow-up questions
export const chatWithGemini = async (message, language = 'English') => {
  const prompt = `
You are ExploreX AI Career Copilot, an expert career counselor for Indian students.
Answer the student's question in a helpful, concise, and student-friendly way.

Student Question: "${message}"
Preferred Language: ${language}

Guidelines:
- Keep response under 150 words
- Be specific and actionable
- Use Indian context (companies, salaries in INR)
- If asking about careers, mention relevant skills and roadmaps
- If asking about internships, mention real Indian companies
- Be encouraging and motivational

Response:
`

  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 1024,
        }
      },
      { headers: geminiHeaders, timeout: 30000 }
    )

    const rawText = response.data.candidates[0].content.parts[0].text
    return rawText.trim()

  } catch (error) {
    console.error('Gemini chat request failed:', error.name || 'Error')
    return `I'm sorry, I couldn't process your question right now. Please try again later.`
  }
}

// Fallback data when Gemini API fails
const getFallbackData = (education, interests) => ({
  careers: [
    { title: 'Full Stack Developer', compatibility: 92, salary: 'Rs 8-25 LPA', demand: 'Very High', description: 'Build complete web applications using modern tech stack.' },
    { title: 'Data Scientist', compatibility: 85, salary: 'Rs 10-30 LPA', demand: 'High', description: 'Analyze data and build ML models to solve business problems.' },
    { title: 'Product Manager', compatibility: 78, salary: 'Rs 15-40 LPA', demand: 'Very High', description: 'Lead product development from ideation to launch.' }
  ],
  roadmap: [
    { stage: 'Foundation', duration: '3 months', topics: ['Programming Basics', 'Data Structures', 'Git'] },
    { stage: 'Core Skills', duration: '4 months', topics: ['React/Node.js', 'Databases', 'APIs'] },
    { stage: 'Projects', duration: '3 months', topics: ['Real Projects', 'Portfolio Building', 'Open Source'] },
    { stage: 'Career Ready', duration: '2 months', topics: ['Interview Prep', 'Resume Building', 'Networking'] }
  ],
  skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS'],
  internships: [
    { company: 'Google', role: 'SWE Intern', stipend: 'Rs 80,000/month' },
    { company: 'Microsoft', role: 'Frontend Intern', stipend: 'Rs 70,000/month' },
    { company: 'Startup (via AngelList)', role: 'Full Stack Intern', stipend: 'Rs 25,000/month' }
  ],
  freelancing: [
    { platform: 'Upwork', avgEarning: '$50-150/hr', projects: 'Web apps, APIs' },
    { platform: 'Fiverr', avgEarning: '$500-5000/project', projects: 'Landing pages, E-commerce' }
  ],
  aiOpportunities: [
    'Build AI-powered SaaS products using GPT APIs',
    'Offer AI integration services to local businesses',
    'Create AI chatbots for customer service'
  ]
})