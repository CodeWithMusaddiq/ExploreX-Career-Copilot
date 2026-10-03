import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Mentor from '../models/Mentor.js'

dotenv.config()

const mentors = [
  {
    name: 'Rahul Sharma',
    email: 'rahul@explorex.com',
    role: 'Senior Software Engineer',
    company: 'Google',
    experience: '8 years',
    expertise: ['System Design', 'React', 'Node.js', 'Technology'],
    bio: 'Ex-Amazon, currently leading frontend teams at Google. Passionate about mentoring students.',
    price: 1500,
    rating: 4.9,
    reviews: 124,
    sessions: 500,
    availability: ['Mon', 'Wed', 'Fri'],
    languages: ['English', 'Hindi'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    isVerified: true
  },
  {
    name: 'Priya Patel',
    email: 'priya@explorex.com',
    role: 'Data Science Lead',
    company: 'Microsoft',
    experience: '7 years',
    expertise: ['Machine Learning', 'Python', 'AI Strategy', 'Data Science'],
    bio: 'PhD in ML from IIT Bombay. Built recommendation systems serving 100M+ users.',
    price: 2000,
    rating: 4.8,
    reviews: 98,
    sessions: 350,
    availability: ['Tue', 'Thu', 'Sat'],
    languages: ['English', 'Hindi', 'Telugu'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    isVerified: true
  },
  {
    name: 'Arjun Reddy',
    email: 'arjun@explorex.com',
    role: 'Product Manager',
    company: 'Flipkart',
    experience: '6 years',
    expertise: ['Product Strategy', 'Growth', 'Analytics', 'Product'],
    bio: 'Grew Flipkart grocery vertical from 0 to $1B GMV. Love helping aspiring PMs.',
    price: 1200,
    rating: 4.7,
    reviews: 87,
    sessions: 280,
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    languages: ['English', 'Telugu'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    isVerified: true
  },
  {
    name: 'Ananya Gupta',
    email: 'ananya@explorex.com',
    role: 'UX Director',
    company: 'Swiggy',
    experience: '9 years',
    expertise: ['UX Design', 'Design Systems', 'User Research', 'Design'],
    bio: 'Led design at Swiggy, Ola, and early-stage startups. Mentor at DesignUp.',
    price: 1800,
    rating: 4.9,
    reviews: 156,
    sessions: 420,
    availability: ['Wed', 'Fri', 'Sun'],
    languages: ['English', 'Hindi'],
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    isVerified: true
  },
  {
    name: 'Vikram Mehta',
    email: 'vikram@explorex.com',
    role: 'Cloud Architect',
    company: 'AWS',
    experience: '10 years',
    expertise: ['AWS', 'DevOps', 'System Architecture', 'Cloud'],
    bio: 'AWS certified all 12 certifications. Helped 50+ startups migrate to cloud.',
    price: 2500,
    rating: 4.8,
    reviews: 112,
    sessions: 600,
    availability: ['Tue', 'Thu'],
    languages: ['English', 'Hindi'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    isVerified: true
  },
  {
    name: 'Sneha Iyer',
    email: 'sneha@explorex.com',
    role: 'Marketing Director',
    company: 'Nykaa',
    experience: '8 years',
    expertise: ['Digital Marketing', 'Brand Strategy', 'Growth Hacking', 'Marketing'],
    bio: 'Built Nykaa digital presence from scratch. Expert in D2C marketing.',
    price: 1000,
    rating: 4.6,
    reviews: 76,
    sessions: 310,
    availability: ['Mon', 'Wed', 'Sat'],
    languages: ['English', 'Hindi', 'Telugu'],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
    isVerified: true
  }
]

const seedMentors = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ MongoDB Connected')

    await Mentor.deleteMany({})
    console.log('🗑️  Cleared existing mentors')

    await Mentor.insertMany(mentors)
    console.log(`✅ Seeded ${mentors.length} mentors successfully!`)

    process.exit(0)
  } catch {
    console.error('❌ Mentor seeding failed.')
    process.exit(1)
  }
}

seedMentors()