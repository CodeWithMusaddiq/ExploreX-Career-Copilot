import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, Clock, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const ComparisonCard = ({ career, isWinner, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`glass-card p-6 relative overflow-hidden ${isWinner ? 'ring-2 ring-primary-500/50' : ''}`}
    >
      {isWinner && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-primary-500 to-blue-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">RECOMMENDED</div>
      )}
      <div className="mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary-500/10 text-primary-400 mb-2">{career.category}</span>
        <h3 className="text-2xl font-bold text-white">{career.title}</h3>
        <p className="text-dark-400 text-sm mt-1">{career.description}</p>
      </div>
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
          <div className="flex items-center gap-2 text-dark-300"><DollarSign className="w-4 h-4 text-green-400" /><span className="text-sm">Salary Range</span></div>
          <span className="text-white font-semibold">{career.salary}</span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
          <div className="flex items-center gap-2 text-dark-300"><TrendingUp className="w-4 h-4 text-blue-400" /><span className="text-sm">Market Demand</span></div>
          <span className="text-white font-semibold">{career.demand}</span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
          <div className="flex items-center gap-2 text-dark-300"><Clock className="w-4 h-4 text-yellow-400" /><span className="text-sm">Time to Job Ready</span></div>
          <span className="text-white font-semibold">{career.roadmap.reduce((acc, s) => acc + parseInt(s.duration), 0)} months</span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
          <div className="flex items-center gap-2 text-dark-300"><Users className="w-4 h-4 text-purple-400" /><span className="text-sm">Compatibility</span></div>
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold">{career.compatibility}%</span>
            {career.compatibility > 80 ? <ArrowUpRight className="w-4 h-4 text-green-400" /> : <ArrowDownRight className="w-4 h-4 text-yellow-400" />}
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-white font-semibold text-sm mb-3">Required Skills</h4>
        <div className="flex flex-wrap gap-2">
          {career.skills.map((skill) => (
            <span key={skill} className="px-3 py-1.5 rounded-lg bg-primary-500/10 text-primary-300 text-xs border border-primary-500/20">{skill}</span>
          ))}
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-white/5">
        <h4 className="text-white font-semibold text-sm mb-2">Top Internships</h4>
        <div className="space-y-2">
          {career.internships.slice(0, 2).map((intern) => (
            <div key={intern.company} className="flex items-center justify-between text-sm">
              <span className="text-dark-300">{intern.company} - {intern.role}</span>
              <span className="text-green-400 text-xs">{intern.stipend}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default ComparisonCard
