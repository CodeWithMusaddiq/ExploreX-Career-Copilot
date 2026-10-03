export const mockCareers = [
  {
    id: 1,
    title: 'Full Stack Developer',
    category: 'Technology',
    salary: 'Rs 8-25 LPA',
    demand: 'Very High',
    compatibility: 92,
    description: 'Build and maintain web applications using modern technologies.',
    skills: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'TypeScript'],
    roadmap: [
      { stage: 'Foundation', duration: '3 months', topics: ['HTML/CSS', 'JavaScript Basics', 'Git'] },
      { stage: 'Frontend', duration: '4 months', topics: ['React', 'Tailwind CSS', 'State Management'] },
      { stage: 'Backend', duration: '4 months', topics: ['Node.js', 'Express', 'MongoDB', 'API Design'] },
      { stage: 'Advanced', duration: '3 months', topics: ['System Design', 'DevOps', 'Testing'] },
    ],
    internships: [
      { company: 'Google', role: 'SWE Intern', stipend: 'Rs 80k/month' },
      { company: 'Microsoft', role: 'Frontend Intern', stipend: 'Rs 70k/month' },
      { company: 'Startups', role: 'Full Stack Intern', stipend: 'Rs 25k/month' },
    ],
    freelancing: [
      { platform: 'Upwork', avgEarning: '$50-150/hr', projects: 'Web apps, APIs' },
      { platform: 'Fiverr', avgEarning: '$500-5000/project', projects: 'Landing pages, E-commerce' },
    ],
    aiOpportunities: [
      'AI-powered code generation tools',
      'Chatbot development with LLMs',
      'AI SaaS product development',
    ]
  },
  {
    id: 2,
    title: 'Data Scientist',
    category: 'Technology',
    salary: 'Rs 10-30 LPA',
    demand: 'High',
    compatibility: 85,
    description: 'Analyze data and build ML models to solve business problems.',
    skills: ['Python', 'Machine Learning', 'SQL', 'Statistics', 'TensorFlow'],
    roadmap: [
      { stage: 'Foundation', duration: '3 months', topics: ['Python', 'Statistics', 'Linear Algebra'] },
      { stage: 'Data Analysis', duration: '3 months', topics: ['Pandas', 'NumPy', 'Data Visualization'] },
      { stage: 'Machine Learning', duration: '4 months', topics: ['Scikit-learn', 'Supervised Learning', 'Unsupervised Learning'] },
      { stage: 'Deep Learning', duration: '3 months', topics: ['Neural Networks', 'TensorFlow', 'NLP'] },
    ],
    internships: [
      { company: 'Amazon', role: 'Data Science Intern', stipend: 'Rs 75k/month' },
      { company: 'Flipkart', role: 'ML Intern', stipend: 'Rs 60k/month' },
    ],
    freelancing: [
      { platform: 'Turing', avgEarning: '$60-200/hr', projects: 'ML models, Data pipelines' },
      { platform: 'Upwork', avgEarning: '$40-120/hr', projects: 'Data analysis, Predictive modeling' },
    ],
    aiOpportunities: [
      'AI model fine-tuning services',
      'Custom GPT/LLM development',
      'AI data annotation business',
    ]
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    category: 'Design',
    salary: 'Rs 6-18 LPA',
    demand: 'High',
    compatibility: 78,
    description: 'Design intuitive and beautiful user interfaces and experiences.',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems'],
    roadmap: [
      { stage: 'Foundation', duration: '2 months', topics: ['Design Principles', 'Color Theory', 'Typography'] },
      { stage: 'Tools', duration: '2 months', topics: ['Figma', 'Adobe XD', 'Prototyping'] },
      { stage: 'UX Research', duration: '3 months', topics: ['User Research', 'Usability Testing', 'Personas'] },
      { stage: 'Advanced', duration: '3 months', topics: ['Design Systems', 'Motion Design', 'Design Leadership'] },
    ],
    internships: [
      { company: 'Zomato', role: 'Product Design Intern', stipend: 'Rs 50k/month' },
      { company: 'Swiggy', role: 'UX Intern', stipend: 'Rs 45k/month' },
    ],
    freelancing: [
      { platform: 'Dribbble', avgEarning: '$30-100/hr', projects: 'App design, Web design' },
      { platform: '99designs', avgEarning: '$500-3000/project', projects: 'Logo, Branding, UI kits' },
    ],
    aiOpportunities: [
      'AI-assisted design tools expertise',
      'AI product design consulting',
      'Generative AI art business',
    ]
  },
  {
    id: 4,
    title: 'Digital Marketing Specialist',
    category: 'Marketing',
    salary: 'Rs 5-15 LPA',
    demand: 'High',
    compatibility: 70,
    description: 'Create and execute digital marketing strategies for brands.',
    skills: ['SEO', 'Social Media', 'Google Ads', 'Content Marketing', 'Analytics'],
    roadmap: [
      { stage: 'Foundation', duration: '2 months', topics: ['Marketing Basics', 'Consumer Behavior', 'Digital Channels'] },
      { stage: 'SEO & Content', duration: '3 months', topics: ['SEO', 'Content Strategy', 'Blogging'] },
      { stage: 'Paid Ads', duration: '3 months', topics: ['Google Ads', 'Facebook Ads', 'Campaign Management'] },
      { stage: 'Analytics', duration: '2 months', topics: ['Google Analytics', 'A/B Testing', 'ROI Analysis'] },
    ],
    internships: [
      { company: 'Nykaa', role: 'Digital Marketing Intern', stipend: 'Rs 30k/month' },
      { company: 'Meesho', role: 'Growth Intern', stipend: 'Rs 35k/month' },
    ],
    freelancing: [
      { platform: 'Upwork', avgEarning: '$25-80/hr', projects: 'SEO, Social media management' },
      { platform: 'Freelancer', avgEarning: '$500-5000/project', projects: 'Campaign management, Strategy' },
    ],
    aiOpportunities: [
      'AI content generation services',
      'AI-powered marketing automation',
      'Chatbot marketing solutions',
    ]
  },
  {
    id: 5,
    title: 'Product Manager',
    category: 'Product',
    salary: 'Rs 15-40 LPA',
    demand: 'Very High',
    compatibility: 88,
    description: 'Lead product development from ideation to launch.',
    skills: ['Product Strategy', 'Agile', 'Data Analysis', 'Communication', 'Stakeholder Management'],
    roadmap: [
      { stage: 'Foundation', duration: '3 months', topics: ['Product Management Basics', 'Agile/Scrum', 'User Stories'] },
      { stage: 'Technical', duration: '3 months', topics: ['Basic Coding', 'APIs', 'Database Concepts'] },
      { stage: 'Strategy', duration: '4 months', topics: ['Product Strategy', 'Roadmapping', 'Metrics'] },
      { stage: 'Leadership', duration: '3 months', topics: ['Team Management', 'Stakeholder Management', 'Growth'] },
    ],
    internships: [
      { company: 'Razorpay', role: 'APM Intern', stipend: 'Rs 60k/month' },
      { company: 'PhonePe', role: 'Product Intern', stipend: 'Rs 55k/month' },
    ],
    freelancing: [
      { platform: 'Toptal', avgEarning: '$80-200/hr', projects: 'Product consulting, Strategy' },
      { platform: 'Upwork', avgEarning: '$50-150/hr', projects: 'Product audits, Roadmapping' },
    ],
    aiOpportunities: [
      'AI product strategy consulting',
      'AI feature prioritization tools',
      'AI-powered product analytics',
    ]
  },
  {
    id: 6,
    title: 'Cloud Architect',
    category: 'Technology',
    salary: 'Rs 20-50 LPA',
    demand: 'Very High',
    compatibility: 80,
    description: 'Design and manage cloud infrastructure for organizations.',
    skills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform'],
    roadmap: [
      { stage: 'Foundation', duration: '3 months', topics: ['Linux', 'Networking', 'Basic Cloud Concepts'] },
      { stage: 'Cloud Basics', duration: '3 months', topics: ['AWS Core Services', 'IAM', 'EC2', 'S3'] },
      { stage: 'DevOps', duration: '4 months', topics: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform'] },
      { stage: 'Architecture', duration: '3 months', topics: ['Microservices', 'Serverless', 'Security'] },
    ],
    internships: [
      { company: 'AWS', role: 'Cloud Intern', stipend: 'Rs 70k/month' },
      { company: 'Infosys', role: 'Cloud Engineer Intern', stipend: 'Rs 35k/month' },
    ],
    freelancing: [
      { platform: 'Upwork', avgEarning: '$60-200/hr', projects: 'Cloud migration, Architecture' },
      { platform: 'Toptal', avgEarning: '$100-250/hr', projects: 'Enterprise cloud solutions' },
    ],
    aiOpportunities: [
      'AI-powered cloud optimization',
      'MLOps infrastructure consulting',
      'AI workload management solutions',
    ]
  }
]

export const mockMentors = [
  {
    id: 1,
    name: 'Rahul Sharma',
    role: 'Senior Software Engineer',
    company: 'Google',
    experience: '8 years',
    expertise: ['System Design', 'React', 'Node.js'],
    rating: 4.9,
    reviews: 124,
    price: 1500,
    availability: 'Mon, Wed, Fri',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    bio: 'Ex-Amazon, currently leading frontend teams at Google. Passionate about mentoring students.',
    languages: ['English', 'Hindi'],
    sessions: 500
  },
  {
    id: 2,
    name: 'Priya Patel',
    role: 'Data Science Lead',
    company: 'Microsoft',
    experience: '7 years',
    expertise: ['Machine Learning', 'Python', 'AI Strategy'],
    rating: 4.8,
    reviews: 98,
    price: 2000,
    availability: 'Tue, Thu, Sat',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    bio: 'PhD in ML from IIT Bombay. Built recommendation systems serving 100M+ users.',
    languages: ['English', 'Hindi', 'Telugu'],
    sessions: 350
  },
  {
    id: 3,
    name: 'Arjun Reddy',
    role: 'Product Manager',
    company: 'Flipkart',
    experience: '6 years',
    expertise: ['Product Strategy', 'Growth', 'Analytics'],
    rating: 4.7,
    reviews: 87,
    price: 1200,
    availability: 'Mon-Fri',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    bio: 'Grew Flipkart grocery vertical from 0 to $1B GMV. Love helping aspiring PMs.',
    languages: ['English', 'Telugu'],
    sessions: 280
  },
  {
    id: 4,
    name: 'Ananya Gupta',
    role: 'UX Director',
    company: 'Swiggy',
    experience: '9 years',
    expertise: ['UX Design', 'Design Systems', 'User Research'],
    rating: 4.9,
    reviews: 156,
    price: 1800,
    availability: 'Wed, Fri, Sun',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    bio: 'Led design at Swiggy, Ola, and early-stage startups. Mentor at DesignUp.',
    languages: ['English', 'Hindi'],
    sessions: 420
  },
  {
    id: 5,
    name: 'Vikram Mehta',
    role: 'Cloud Architect',
    company: 'AWS',
    experience: '10 years',
    expertise: ['AWS', 'DevOps', 'System Architecture'],
    rating: 4.8,
    reviews: 112,
    price: 2500,
    availability: 'Tue, Thu',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    bio: 'AWS certified all 12 certifications. Helped 50+ startups migrate to cloud.',
    languages: ['English', 'Hindi'],
    sessions: 600
  },
  {
    id: 6,
    name: 'Sneha Iyer',
    role: 'Marketing Director',
    company: 'Nykaa',
    experience: '8 years',
    expertise: ['Digital Marketing', 'Brand Strategy', 'Growth Hacking'],
    rating: 4.6,
    reviews: 76,
    price: 1000,
    availability: 'Mon, Wed, Sat',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
    bio: 'Built Nykaa digital presence from scratch. Expert in D2C marketing.',
    languages: ['English', 'Hindi', 'Telugu'],
    sessions: 310
  }
]

export const mockInternships = [
  {
    id: 1,
    company: 'Google',
    role: 'Software Engineering Intern',
    location: 'Bangalore / Remote',
    stipend: 'Rs 80,000/month',
    duration: '6 months',
    deadline: '2024-03-15',
    skills: ['Python', 'Java', 'Data Structures'],
    type: 'Full-time',
    logo: 'G'
  },
  {
    id: 2,
    company: 'Microsoft',
    role: 'Data Science Intern',
    location: 'Hyderabad',
    stipend: 'Rs 75,000/month',
    duration: '6 months',
    deadline: '2024-03-20',
    skills: ['Python', 'SQL', 'Machine Learning'],
    type: 'Full-time',
    logo: 'M'
  },
  {
    id: 3,
    company: 'Amazon',
    role: 'Frontend Developer Intern',
    location: 'Bangalore',
    stipend: 'Rs 70,000/month',
    duration: '6 months',
    deadline: '2024-03-25',
    skills: ['React', 'JavaScript', 'CSS'],
    type: 'Full-time',
    logo: 'A'
  },
  {
    id: 4,
    company: 'Flipkart',
    role: 'Product Management Intern',
    location: 'Bangalore',
    stipend: 'Rs 60,000/month',
    duration: '3 months',
    deadline: '2024-04-01',
    skills: ['Product Strategy', 'Analytics', 'Communication'],
    type: 'Full-time',
    logo: 'F'
  },
  {
    id: 5,
    company: 'Zomato',
    role: 'UI/UX Design Intern',
    location: 'Gurgaon / Remote',
    stipend: 'Rs 50,000/month',
    duration: '3 months',
    deadline: '2024-03-30',
    skills: ['Figma', 'Prototyping', 'User Research'],
    type: 'Full-time',
    logo: 'Z'
  },
  {
    id: 6,
    company: 'Razorpay',
    role: 'Backend Engineering Intern',
    location: 'Bangalore',
    stipend: 'Rs 55,000/month',
    duration: '6 months',
    deadline: '2024-04-05',
    skills: ['Node.js', 'Go', 'Distributed Systems'],
    type: 'Full-time',
    logo: 'R'
  }
]

export const mockSideHustles = [
  {
    id: 1,
    title: 'Freelance Web Development',
    category: 'Tech',
    earning: 'Rs 50k-2L/month',
    timeCommitment: '10-20 hrs/week',
    difficulty: 'Medium',
    description: 'Build websites and web apps for clients on platforms like Upwork and Fiverr.',
    steps: ['Learn HTML/CSS/JS', 'Build portfolio', 'Create profiles on platforms', 'Start bidding on projects'],
    platforms: ['Upwork', 'Fiverr', 'Freelancer']
  },
  {
    id: 2,
    title: 'YouTube Content Creation',
    category: 'Content',
    earning: 'Rs 20k-1L/month',
    timeCommitment: '5-10 hrs/week',
    difficulty: 'Low',
    description: 'Create educational or entertainment content on YouTube and monetize.',
    steps: ['Choose niche', 'Create channel', 'Upload consistently', 'Apply for monetization'],
    platforms: ['YouTube', 'Instagram Reels']
  },
  {
    id: 3,
    title: 'AI Prompt Engineering',
    category: 'AI',
    earning: 'Rs 30k-1.5L/month',
    timeCommitment: '5-15 hrs/week',
    difficulty: 'Medium',
    description: 'Create and sell AI prompts, or offer prompt engineering services.',
    steps: ['Master ChatGPT/Claude', 'Build prompt library', 'Sell on marketplaces', 'Offer consulting'],
    platforms: ['PromptBase', 'Upwork', 'Gumroad']
  },
  {
    id: 4,
    title: 'Online Tutoring',
    category: 'Education',
    earning: 'Rs 25k-80k/month',
    timeCommitment: '10-15 hrs/week',
    difficulty: 'Low',
    description: 'Teach subjects or skills online to students globally.',
    steps: ['Choose subject', 'Create curriculum', 'Join tutoring platforms', 'Build student base'],
    platforms: ['Unacademy', 'Vedantu', 'Chegg']
  },
  {
    id: 5,
    title: 'Stock Trading & Investing',
    category: 'Finance',
    earning: 'Variable',
    timeCommitment: '5-10 hrs/week',
    difficulty: 'High',
    description: 'Learn stock market trading and investing for passive income.',
    steps: ['Learn basics', 'Paper trade', 'Start small', 'Diversify portfolio'],
    platforms: ['Zerodha', 'Upstox', 'Groww']
  },
  {
    id: 6,
    title: 'Dropshipping Business',
    category: 'E-commerce',
    earning: 'Rs 40k-3L/month',
    timeCommitment: '15-25 hrs/week',
    difficulty: 'Medium',
    description: 'Start an e-commerce store without holding inventory.',
    steps: ['Find niche', 'Set up Shopify store', 'Find suppliers', 'Run ads'],
    platforms: ['Shopify', 'Meesho', 'GlowRoad']
  }
]

export const mockUserProgress = {
  overallProgress: 65,
  skillsCompleted: 12,
  totalSkills: 20,
  internshipsApplied: 3,
  internshipsTotal: 8,
  mentorSessions: 5,
  certifications: 2,
  streak: 15,
  weeklyActivity: [
    { day: 'Mon', hours: 3.5 },
    { day: 'Tue', hours: 2.0 },
    { day: 'Wed', hours: 4.5 },
    { day: 'Thu', hours: 1.5 },
    { day: 'Fri', hours: 3.0 },
    { day: 'Sat', hours: 5.0 },
    { day: 'Sun', hours: 2.5 },
  ]
}
