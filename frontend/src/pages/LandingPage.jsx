import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Compass, Brain, GitCompare, Users, TrendingUp, Briefcase, Sparkles, ArrowRight, CheckCircle2, Star, Zap, Globe, ChevronRight, Play, Award, Target, Rocket } from 'lucide-react'
import AnimatedBackground from '../components/AnimatedBackground'

const LandingPage = () => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    { icon: Brain, title: 'AI Career Copilot', description: 'Get personalized career recommendations powered by advanced AI. Our system analyzes your skills, interests, and goals to find your perfect career match.', color: 'from-purple-500 to-pink-500', stats: '95% Accuracy' },
    { icon: GitCompare, title: 'Career Comparison', description: 'Compare multiple career paths side by side. Analyze salary, growth, demand, and compatibility scores to make informed decisions.', color: 'from-blue-500 to-cyan-500', stats: '50+ Careers' },
    { icon: Users, title: 'Expert Mentors', description: 'Connect with industry professionals from top companies. Book 1-on-1 sessions for personalized guidance and career advice.', color: 'from-green-500 to-emerald-500', stats: '200+ Mentors' },
    { icon: TrendingUp, title: 'Skill Roadmaps', description: 'Follow step-by-step learning paths curated by experts. Track your progress and build job-ready skills efficiently.', color: 'from-orange-500 to-amber-500', stats: '100+ Roadmaps' },
    { icon: Briefcase, title: 'Internship Finder', description: 'Discover curated internship opportunities from top companies. Get matched with roles that align with your career goals.', color: 'from-pink-500 to-rose-500', stats: '1000+ Openings' },
    { icon: Globe, title: 'Multilingual Support', description: 'Get career guidance in your preferred language. Our AI supports English, Hindi, and Telugu with more languages coming soon.', color: 'from-violet-500 to-purple-500', stats: '3 Languages' },
  ]

  const stats = [
    { value: '50K+', label: 'Students Guided' },
    { value: '95%', label: 'Satisfaction Rate' },
    { value: '200+', label: 'Expert Mentors' },
    { value: 'Rs 15Cr+', label: 'Internship Stipends' },
  ]

  const testimonials = [
    { name: 'Amit Kumar', role: 'Software Engineer at Google', text: 'ExploreX helped me discover my passion for backend development. The AI recommendations were spot on!', rating: 5 },
    { name: 'Priya Sharma', role: 'Data Scientist at Microsoft', text: 'The mentor sessions were game-changing. I got insights that no blog or course could provide.', rating: 5 },
    { name: 'Rahul Verma', role: 'Product Manager at Flipkart', text: 'Career comparison feature helped me choose between PM and consulting. Best decision ever!', rating: 5 },
  ]

  useEffect(() => {
    const interval = setInterval(() => { setActiveFeature((prev) => (prev + 1) % features.length) }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8">
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-primary-400 text-sm font-medium">AI-Powered Career Guidance</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="text-white">Find Your</span><br />
              <span className="gradient-text">Dream Career</span>
            </h1>
            <p className="text-dark-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              AI-powered career copilot that helps students discover careers, build skills, connect with mentors, and find internships all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
                <Zap className="w-5 h-5" /> Start Your Journey <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="btn-secondary text-lg px-8 py-4 flex items-center gap-2">
                <Play className="w-5 h-5" /> Watch Demo
              </button>
            </div>
          </motion.div>
          <motion.div style={{ y }} className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Target, title: 'Career Match', desc: '92% compatibility', color: 'text-purple-400' },
              { icon: Award, title: 'Top Skills', desc: 'React, Node.js, AI', color: 'text-blue-400' },
              { icon: Rocket, title: 'Roadmap', desc: '6-month plan ready', color: 'text-green-400' },
            ].map((card, i) => (
              <motion.div key={card.title} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.2, duration: 0.6 }} className="glass-card p-6 text-left hover:border-primary-500/30 transition-all">
                <card.icon className={`w-8 h-8 ${card.color} mb-3`} />
                <h3 className="text-white font-bold mb-1">{card.title}</h3>
                <p className="text-dark-400 text-sm">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-6 text-center">
                <h3 className="text-3xl md:text-4xl font-black gradient-text mb-2">{stat.value}</h3>
                <p className="text-dark-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Everything You Need to <span className="gradient-text">Succeed</span></h2>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">One platform for all your career needs. No more switching between apps.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -5 }} className={`glass-card p-6 cursor-pointer transition-all ${activeFeature === i ? 'ring-2 ring-primary-500/50' : ''}`} onClick={() => setActiveFeature(i)}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-white font-bold text-lg">{feature.title}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs text-dark-300">{feature.stats}</span>
                </div>
                <p className="text-dark-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It <span className="gradient-text">Works</span></h2>
            <p className="text-dark-400 text-lg">Three simple steps to transform your career</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Tell Us About You', desc: 'Share your education, interests, skills, and career goals with our AI.', icon: Brain },
              { step: '02', title: 'Get AI Insights', desc: 'Receive personalized career matches, roadmaps, and skill recommendations.', icon: Sparkles },
              { step: '03', title: 'Take Action', desc: 'Connect with mentors, apply to internships, and start building your career.', icon: Rocket },
            ].map((item, i) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className="relative">
                <div className="glass-card p-8 text-center h-full">
                  <div className="text-6xl font-black gradient-text opacity-20 mb-4">{item.step}</div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-blue-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-500/20">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-dark-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
                {i < 2 && <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10"><ChevronRight className="w-8 h-8 text-primary-500/30" /></div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="students" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Built For <span className="gradient-text">Every Student</span></h2>
            <p className="text-dark-400 text-lg">Whether you are in 10th grade or a fresh graduate</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['10th Students', '12th Students', 'Diploma Students', 'Engineering Students', 'MBA Students', 'Commerce Students', 'Medical Students', 'Fresh Graduates'].map((student, i) => (
              <motion.div key={student} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.05 }} className="glass-card p-4 text-center hover:border-primary-500/30 transition-all">
                <CheckCircle2 className="w-6 h-6 text-primary-400 mx-auto mb-2" />
                <span className="text-white text-sm font-medium">{student}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Success <span className="gradient-text">Stories</span></h2>
            <p className="text-dark-400 text-lg">Hear from students who transformed their careers</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div key={testimonial.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="glass-card p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-dark-200 text-sm leading-relaxed mb-6">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">{testimonial.name.charAt(0)}</div>
                  <div>
                    <p className="text-white font-medium text-sm">{testimonial.name}</p>
                    <p className="text-dark-400 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto glass-card p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-blue-500/10" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Find Your <span className="gradient-text">Perfect Career?</span></h2>
            <p className="text-dark-300 text-lg mb-8 max-w-xl mx-auto">Join 50,000+ students who have already discovered their dream careers with ExploreX.</p>
            <Link to="/register" className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2">
              <Sparkles className="w-5 h-5" /> Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-dark-500 text-sm mt-4">No credit card required. Free forever.</p>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default LandingPage
