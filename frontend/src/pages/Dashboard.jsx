import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import DashboardCard from '../components/DashboardCard'
import ProgressRing from '../components/ProgressRing'
import CareerCard from '../components/CareerCard'
import MentorCard from '../components/MentorCard'
import Sidebar from '../components/Sidebar'
import { Target, Users, Briefcase, TrendingUp, Flame, Award, Brain, ArrowRight, Calendar, BookOpen, Zap, ChevronRight } from 'lucide-react'
import { mockCareers, mockMentors, mockInternships, mockSideHustles, mockUserProgress } from '../utils/mockData'

const Dashboard = () => {
  const { user } = useAuth()
  const [selectedCareer, setSelectedCareer] = useState(null)
  const topCareer = mockCareers[0]
  const topMentor = mockMentors[0]
  const topInternship = mockInternships[0]
  const topHustle = mockSideHustles[2]

  return (
    <div className="min-h-screen bg-dark-950">
      <Sidebar />
      <div className="lg:ml-64 pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-blue-500 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Welcome back, {user?.name?.split(' ')[0] || 'Student'}!</h1>
                <p className="text-dark-400 text-sm">Here is your personalized career dashboard</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <DashboardCard title="Career Match" value={`${topCareer.compatibility}%`} subtitle={topCareer.title} icon={Target} color="purple" index={0} />
            <DashboardCard title="Skills Learned" value={`${mockUserProgress.skillsCompleted}/${mockUserProgress.totalSkills}`} subtitle={`${Math.round((mockUserProgress.skillsCompleted / mockUserProgress.totalSkills) * 100)}% complete`} icon={BookOpen} color="blue" index={1} />
            <DashboardCard title="Day Streak" value={`${mockUserProgress.streak} days`} subtitle="Keep it going!" icon={Flame} color="orange" index={2}>
              <div className="flex items-center gap-1 text-orange-400 text-xs"><Zap className="w-3 h-3" /><span>+12% this week</span></div>
            </DashboardCard>
            <DashboardCard title="Mentor Sessions" value={mockUserProgress.mentorSessions} subtitle="5 sessions completed" icon={Users} color="green" index={3} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6 lg:col-span-1">
              <h3 className="text-white font-bold text-lg mb-6">Overall Progress</h3>
              <div className="flex justify-center mb-6"><ProgressRing progress={mockUserProgress.overallProgress} size={160} /></div>
              <div className="space-y-3">
                {[
                  { label: 'Skills', value: 60, color: 'bg-primary-500' },
                  { label: 'Internships', value: 37, color: 'bg-blue-500' },
                  { label: 'Mentorship', value: 83, color: 'bg-green-500' },
                  { label: 'Certifications', value: 40, color: 'bg-orange-500' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-dark-300">{item.label}</span>
                      <span className="text-white font-medium">{item.value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${item.value}%` }} transition={{ duration: 1, delay: 0.5 }} className={`h-full rounded-full ${item.color}`} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-lg">Weekly Activity</h3>
                <span className="text-dark-400 text-sm">Last 7 days</span>
              </div>
              <div className="flex items-end justify-between gap-2 h-48">
                {mockUserProgress.weeklyActivity.map((day) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div initial={{ height: 0 }} animate={{ height: `${(day.hours / 5) * 100}%` }} transition={{ duration: 0.8, delay: 0.3 }} className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-primary-600 to-primary-400 relative group">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-dark-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">{day.hours} hrs</div>
                    </motion.div>
                    <span className="text-dark-400 text-xs">{day.day}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-lg flex items-center gap-2"><Target className="w-5 h-5 text-primary-400" /> Top Career Match</h3>
                <Link to="/copilot" className="text-primary-400 text-sm flex items-center gap-1 hover:gap-2 transition-all">View All <ChevronRight className="w-4 h-4" /></Link>
              </div>
              <CareerCard career={topCareer} index={0} onSelect={setSelectedCareer} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-lg flex items-center gap-2"><Users className="w-5 h-5 text-blue-400" /> Recommended Mentor</h3>
                <Link to="/mentors" className="text-primary-400 text-sm flex items-center gap-1 hover:gap-2 transition-all">View All <ChevronRight className="w-4 h-4" /></Link>
              </div>
              <MentorCard mentor={topMentor} index={0} onBook={() => {}} />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-lg flex items-center gap-2"><Briefcase className="w-5 h-5 text-green-400" /> Suggested Internship</h3>
                <span className="text-green-400 text-xs bg-green-500/10 px-2 py-1 rounded-full">New</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">{topInternship.logo}</div>
                <div className="flex-1">
                  <h4 className="text-white font-bold">{topInternship.role}</h4>
                  <p className="text-primary-400 text-sm">{topInternship.company}</p>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-dark-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {topInternship.duration}</span>
                    <span>{topInternship.location}</span>
                    <span className="text-green-400">{topInternship.stipend}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {topInternship.skills.map((skill) => <span key={skill} className="px-2 py-0.5 rounded bg-white/5 text-dark-300 text-xs">{skill}</span>)}
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 btn-primary py-2.5 text-sm">Apply Now</button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-lg flex items-center gap-2"><TrendingUp className="w-5 h-5 text-orange-400" /> Suggested Side Hustle</h3>
                <span className="text-orange-400 text-xs bg-orange-500/10 px-2 py-1 rounded-full">Trending</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg"><Zap className="w-7 h-7 text-white" /></div>
                <div className="flex-1">
                  <h4 className="text-white font-bold">{topHustle.title}</h4>
                  <p className="text-dark-400 text-sm mt-1">{topHustle.description}</p>
                  <div className="flex flex-wrap gap-3 mt-3 text-xs">
                    <span className="text-green-400 bg-green-500/10 px-2 py-1 rounded">{topHustle.earning}</span>
                    <span className="text-dark-400 bg-white/5 px-2 py-1 rounded">{topHustle.timeCommitment}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {topHustle.platforms.map((platform) => <span key={platform} className="px-2 py-0.5 rounded bg-primary-500/10 text-primary-300 text-xs">{platform}</span>)}
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 btn-secondary py-2.5 text-sm">Learn More</button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
