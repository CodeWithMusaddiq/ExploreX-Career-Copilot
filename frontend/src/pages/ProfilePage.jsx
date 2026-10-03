import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { User, Mail, GraduationCap, MapPin, Camera, Save, Award, BookOpen, Briefcase, Target } from 'lucide-react'

const ProfilePage = () => {
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    education: user?.education || 'Engineering',
    location: 'Bangalore, India',
    bio: 'Passionate about technology and building products that make a difference. Looking for opportunities in full-stack development and AI.',
    skills: ['React', 'Node.js', 'Python', 'MongoDB', 'AWS'],
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    portfolio: 'johndoe.dev'
  })
  const [newSkill, setNewSkill] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  const handleSave = async () => {
    setSaveError('')
    setSaving(true)
    const editableProfile = {
      name: formData.name,
      education: formData.education,
      skills: formData.skills,
      location: formData.location,
      bio: formData.bio,
      linkedin: formData.linkedin,
      github: formData.github,
      portfolio: formData.portfolio
    }
    const result = await updateProfile(editableProfile)
    setSaving(false)
    if (result.success) setIsEditing(false)
    else setSaveError(result.error)
  }

  const addSkill = () => {
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData({...formData, skills: [...formData.skills, newSkill]})
      setNewSkill('')
    }
  }

  const removeSkill = (skill) => setFormData({...formData, skills: formData.skills.filter(s => s !== skill)})

  const achievements = [
    { icon: Award, title: 'Top Performer', desc: 'Completed 10 skills in record time', color: 'from-yellow-500 to-amber-500' },
    { icon: BookOpen, title: 'Fast Learner', desc: 'Finished 3 roadmaps', color: 'from-blue-500 to-cyan-500' },
    { icon: Briefcase, title: 'Internship Ready', desc: 'Profile 90% complete', color: 'from-green-500 to-emerald-500' },
    { icon: Target, title: 'Goal Crusher', desc: 'Achieved all weekly targets', color: 'from-purple-500 to-pink-500' },
  ]

  return (
    <div className="min-h-screen bg-dark-950 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 mb-6">
          {saveError && <p role="alert" className="mb-4 text-sm text-red-400">{saveError}</p>}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-500 to-blue-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-primary-500/20">
                {formData.name.charAt(0)}
              </div>
              {isEditing && <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center shadow-lg"><Camera className="w-4 h-4 text-white" /></button>}
            </div>
            <div className="flex-1">
              {isEditing ? <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="input-field text-xl font-bold mb-2 w-full md:w-auto" /> : <h1 className="text-2xl font-bold text-white mb-1">{formData.name}</h1>}
              <p className="text-primary-400 font-medium mb-2">{formData.education} Student</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-dark-400">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {formData.location}</span>
                <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {formData.email}</span>
              </div>
            </div>
            <button onClick={() => isEditing ? handleSave() : setIsEditing(true)} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${isEditing ? 'btn-primary' : 'btn-secondary'}`}>
              {isEditing ? (saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save className="w-4 h-4" /> Save</>) : <><User className="w-4 h-4" /> Edit Profile</>}
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
              <h3 className="text-white font-bold text-lg mb-4">About</h3>
              {isEditing ? <textarea value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} className="input-field h-32 resize-none" /> : <p className="text-dark-300 leading-relaxed">{formData.bio}</p>}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
              <h3 className="text-white font-bold text-lg mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary-500/20 to-blue-500/20 text-primary-300 text-sm border border-primary-500/20 flex items-center gap-2">
                    {skill}
                    {isEditing && <button onClick={() => removeSkill(skill)} className="hover:text-red-400 transition-colors">×</button>}
                  </span>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2">
                  <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addSkill()} placeholder="Add a skill..." className="input-field flex-1" />
                  <button onClick={addSkill} className="btn-primary px-4">Add</button>
                </div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
              <h3 className="text-white font-bold text-lg mb-4">Links</h3>
              <div className="space-y-3">
                {[
                  { key: 'linkedin', label: 'LinkedIn' },
                  { key: 'github', label: 'GitHub' },
                  { key: 'portfolio', label: 'Portfolio' },
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center gap-3">
                    <div className="w-5 h-5 text-dark-500">🔗</div>
                    {isEditing ? <input type="text" value={formData[key]} onChange={(e) => setFormData({...formData, [key]: e.target.value})} className="input-field flex-1" placeholder={label} /> : <a href={`https://${formData[key]}`} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 text-sm">{formData[key]}</a>}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
              <h3 className="text-white font-bold mb-4">Profile Stats</h3>
              <div className="space-y-4">
                {[
                  { label: 'Profile Completion', value: '85%', color: 'from-primary-500 to-blue-500' },
                  { label: 'Skills Acquired', value: '12/20', color: 'from-green-500 to-emerald-500' },
                  { label: 'Mentor Sessions', value: '5', color: 'from-orange-500 to-amber-500' },
                  { label: 'Applications', value: '8', color: 'from-pink-500 to-rose-500' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-dark-300">{stat.label}</span>
                      <span className="text-white font-medium">{stat.value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div className={`h-full rounded-full bg-gradient-to-r ${stat.color}`} style={{ width: stat.value.includes('%') ? stat.value : '60%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
              <h3 className="text-white font-bold mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div key={achievement.title} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${achievement.color} flex items-center justify-center flex-shrink-0`}>
                      <achievement.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{achievement.title}</p>
                      <p className="text-dark-400 text-xs">{achievement.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
