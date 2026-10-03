import { z } from 'zod'

const requiredText = (max) => z.string().trim().min(1).max(max)

export const registerSchema = z.object({
  name: requiredText(120),
  email: z.string().trim().email().max(254).transform((email) => email.toLowerCase()),
  password: z.string().min(6).max(128),
  education: requiredText(120)
}).strict()

export const loginSchema = z.object({
  email: z.string().trim().email().max(254).transform((email) => email.toLowerCase()),
  password: z.string().min(1).max(128)
}).strict()

export const profileUpdateSchema = z.object({
  name: requiredText(120).optional(),
  education: requiredText(120).optional(),
  interests: z.array(requiredText(80)).max(50).optional(),
  skills: z.array(requiredText(80)).max(100).optional(),
  goals: z.string().trim().max(2000).optional(),
  location: z.string().trim().max(200).optional(),
  bio: z.string().trim().max(2000).optional(),
  linkedin: z.string().trim().max(500).optional(),
  github: z.string().trim().max(500).optional(),
  portfolio: z.string().trim().max(500).optional()
}).strict().refine((profile) => Object.keys(profile).length > 0, {
  message: 'At least one editable profile field is required'
})

export const careerAnalysisSchema = z.object({
  education: requiredText(500),
  interests: requiredText(2000),
  goals: requiredText(2000),
  skills: requiredText(2000),
  language: requiredText(32).default('English')
}).strict()

export const careerComparisonSchema = z.object({
  careers: z.array(requiredText(100)).min(2).max(5)
}).strict()

export const aiChatSchema = z.object({
  message: requiredText(4000),
  language: requiredText(32).default('English')
}).strict()

export const mentorBookingSchema = z.object({
  mentorId: z.string().regex(/^[a-f\d]{24}$/i, 'Must be a valid mentor ID'),
  date: z.string().date(),
  time: z.enum(['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM']),
  topic: requiredText(1000)
}).strict()

const textList = z.array(requiredText(300)).min(1)

export const careerAnalysisResponseSchema = z.object({
  careers: z.array(z.object({
    title: requiredText(200),
    compatibility: z.number().min(0).max(100),
    salary: requiredText(120),
    demand: requiredText(80),
    description: requiredText(1000)
  })).min(1),
  roadmap: z.array(z.object({
    stage: requiredText(120),
    duration: requiredText(80),
    topics: textList
  })).min(1),
  skills: textList,
  internships: z.array(z.object({
    company: requiredText(200),
    role: requiredText(200),
    stipend: requiredText(120)
  })).min(1),
  freelancing: z.array(z.object({
    platform: requiredText(120),
    avgEarning: requiredText(120),
    projects: requiredText(500)
  })).min(1),
  aiOpportunities: textList
})

export const careerComparisonResponseSchema = z.object({
  comparison: z.array(z.object({
    career: requiredText(200),
    salaryScore: z.number().min(0).max(100),
    demandScore: z.number().min(0).max(100),
    growthScore: z.number().min(0).max(100),
    workLifeScore: z.number().min(0).max(100),
    entryDifficulty: requiredText(80),
    avgSalary: requiredText(120),
    topSkills: textList,
    pros: textList,
    cons: textList
  })).min(1),
  winner: requiredText(200),
  verdict: requiredText(1000)
})
