import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, Award, ArrowRight } from 'lucide-react'

const CareerCard = ({ career, index, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={() => onSelect(career)}
      className="glass-card p-6 cursor-pointer group hover:border-primary-500/30 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary-500/10 text-primary-400 mb-2">
            {career.category}
          </span>
          <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors">{career.title}</h3>
        </div>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-blue-500/20 flex items-center justify-center">
          <Award className="w-6 h-6 text-primary-400" />
        </div>
      </div>
      <p className="text-dark-400 text-sm mb-4 line-clamp-2">{career.description}</p>
      <div className="flex items-center gap-4 mb-4 text-sm">
        <div className="flex items-center gap-1.5 text-dark-300">
          <DollarSign className="w-4 h-4 text-green-400" />
          <span>{career.salary}</span>
        </div>
        <div className="flex items-center gap-1.5 text-dark-300">
          <TrendingUp className="w-4 h-4 text-blue-400" />
          <span>{career.demand}</span>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-dark-400">Compatibility</span>
          <span className="text-primary-400 font-semibold">{career.compatibility}%</span>
        </div>
        <div className="h-2 rounded-full bg-dark-800 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${career.compatibility}%` }}
            transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
            className="h-full rounded-full bg-gradient-to-r from-primary-500 to-blue-500"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {career.skills.slice(0, 3).map((skill) => (
          <span key={skill} className="px-2.5 py-1 rounded-md bg-white/5 text-dark-300 text-xs">{skill}</span>
        ))}
        {career.skills.length > 3 && (
          <span className="px-2.5 py-1 rounded-md bg-white/5 text-dark-400 text-xs">+{career.skills.length - 3}</span>
        )}
      </div>
      <div className="flex items-center text-primary-400 text-sm font-medium group-hover:gap-2 transition-all">
        <span>Explore Career</span>
        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  )
}

export default CareerCard
