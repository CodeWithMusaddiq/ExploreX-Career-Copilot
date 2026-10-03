import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { Compass, Mail, Lock, Eye, EyeOff, ArrowRight, User, GraduationCap, Sparkles, CheckCircle2 } from 'lucide-react'

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', education: '12th', interests: [] })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const { register } = useAuth()
  const navigate = useNavigate()

  const educationOptions = ['10th', '12th', 'Diploma', 'Engineering', 'MBA', 'Commerce', 'Medical', 'Graduate']
  const interestOptions = ['Technology', 'Design', 'Business', 'Data Science', 'Marketing', 'Finance', 'Healthcare', 'Education']

  const toggleInterest = (interest) => {
    setFormData(prev => ({ ...prev, interests: prev.interests.includes(interest) ? prev.interests.filter(i => i !== interest) : [...prev.interests, interest] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await register(formData.name, formData.email, formData.password, formData.education)
    if (result.success) { navigate('/dashboard') } else { setError(result.error) }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-primary-900/20" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-lg relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-blue-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold"><span className="text-white">Explore</span><span className="gradient-text">X</span></span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Create Your Account</h1>
          <p className="text-dark-400">Start your personalized career journey</p>
        </div>
        <div className="glass-card p-8">
          <div className="flex items-center justify-center gap-4 mb-8">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= s ? 'bg-gradient-to-br from-primary-500 to-blue-500 text-white' : 'bg-white/5 text-dark-500'}`}>
                  {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                </div>
                {s === 1 && <div className={`w-16 h-0.5 rounded-full ${step > 1 ? 'bg-primary-500' : 'bg-white/10'}`} />}
              </div>
            ))}
          </div>
          {error && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</motion.div>}
          {step === 1 ? (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              <div>
                <label className="block text-dark-300 text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input-field pl-11" placeholder="John Doe" required />
                </div>
              </div>
              <div>
                <label className="block text-dark-300 text-sm font-medium mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="input-field pl-11" placeholder="you@example.com" required />
                </div>
              </div>
              <div>
                <label className="block text-dark-300 text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                  <input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="input-field pl-11 pr-11" placeholder="Min 6 characters" required minLength={6} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-300 transition-colors">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-dark-300 text-sm font-medium mb-2">Current Education</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                  <select value={formData.education} onChange={(e) => setFormData({ ...formData, education: e.target.value })} className="input-field pl-11 appearance-none cursor-pointer">
                    {educationOptions.map((opt) => <option key={opt} value={opt} className="bg-dark-900">{opt}</option>)}
                  </select>
                </div>
              </div>
              <button type="button" onClick={() => setStep(2)} disabled={!formData.name || !formData.email || !formData.password} className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50">
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          ) : (
            <motion.form initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-dark-300 text-sm font-medium mb-3">Select Your Interests (Optional)</label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((interest) => (
                    <button key={interest} type="button" onClick={() => toggleInterest(interest)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${formData.interests.includes(interest) ? 'bg-gradient-to-r from-primary-500 to-blue-500 text-white shadow-lg shadow-primary-500/20' : 'bg-white/5 text-dark-300 hover:bg-white/10 border border-white/5'}`}>
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="flex-1 btn-secondary py-3">Back</button>
                <button type="submit" disabled={loading} className="flex-1 btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50">
                  {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Sparkles className="w-5 h-5" /> Get Started</>}
                </button>
              </div>
            </motion.form>
          )}
          <div className="mt-6 text-center">
            <p className="text-dark-400 text-sm">Already have an account? <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">Sign in</Link></p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default RegisterPage
