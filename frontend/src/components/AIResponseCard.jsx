import { motion } from 'framer-motion'
import { Sparkles, Lightbulb, Target, Rocket, Briefcase, TrendingUp, Zap } from 'lucide-react'

const AIResponseCard = ({ type, data, index }) => {
  const icons = {
    careers: Target, roadmap: Rocket, skills: Lightbulb,
    internships: Briefcase, freelancing: TrendingUp, aiOpportunities: Zap,
  }
  const titles = {
    careers: 'Career Matches', roadmap: 'Learning Roadmap', skills: 'Skill Recommendations',
    internships: 'Internship Opportunities', freelancing: 'Freelancing Opportunities', aiOpportunities: 'AI Business Ideas',
  }
  const colors = {
    careers: 'from-purple-500 to-pink-500', roadmap: 'from-blue-500 to-cyan-500',
    skills: 'from-yellow-500 to-orange-500', internships: 'from-green-500 to-emerald-500',
    freelancing: 'from-pink-500 to-rose-500', aiOpportunities: 'from-violet-500 to-purple-500',
  }
  const Icon = icons[type] || Sparkles
  const title = titles[type] || 'AI Insight'
  const gradient = colors[type] || 'from-primary-500 to-blue-500'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card p-6 hover:border-primary-500/30 transition-all"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-white font-bold text-lg">{title}</h3>
      </div>
      <div className="space-y-3">
        {Array.isArray(data) ? data.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + i * 0.05 }}
            className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-primary-400">{i + 1}</span>
            </div>
            <div>
              {typeof item === 'string' ? (
                <p className="text-dark-200 text-sm">{item}</p>
              ) : (
                <>
                  <p className="text-white font-medium text-sm">
                    {item.title || item.company || item.name || item.platform || item.stage || JSON.stringify(item)}
                  </p>
                  {item.description && <p className="text-dark-400 text-xs mt-0.5">{item.description}</p>}
                  {item.salary && <p className="text-green-400 text-xs mt-0.5">{item.salary}</p>}
                  {item.avgEarning && <p className="text-green-400 text-xs mt-0.5">{item.avgEarning}</p>}
                  {item.duration && <p className="text-dark-400 text-xs mt-0.5">{item.duration}</p>}
                  {item.projects && <p className="text-dark-400 text-xs mt-0.5">{item.projects}</p>}
                  {item.topics && Array.isArray(item.topics) && (
                    <p className="text-dark-400 text-xs mt-0.5">Topics: {item.topics.join(', ')}</p>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )) : (
          <p className="text-dark-300 text-sm">{data}</p>
        )}
      </div>
    </motion.div>
  )
}

export default AIResponseCard
