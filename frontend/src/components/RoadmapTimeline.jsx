import { motion } from 'framer-motion'
import { CheckCircle2, Circle, Clock, BookOpen } from 'lucide-react'

const RoadmapTimeline = ({ roadmap }) => {
  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-blue-500 to-cyan-500 rounded-full" />
      <div className="space-y-6">
        {roadmap.map((stage, index) => (
          <motion.div
            key={stage.stage}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="relative pl-14"
          >
            <div className="absolute left-0 top-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-blue-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
              {index === 0 ? <BookOpen className="w-5 h-5 text-white" /> : index === roadmap.length - 1 ? <CheckCircle2 className="w-5 h-5 text-white" /> : <Circle className="w-5 h-5 text-white" />}
            </div>
            <div className="glass-card p-5 hover:border-primary-500/30 transition-all">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-bold text-lg">{stage.stage}</h4>
                <div className="flex items-center gap-1.5 text-dark-400 text-sm">
                  <Clock className="w-4 h-4 text-primary-400" />
                  <span>{stage.duration}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {stage.topics.map((topic) => (
                  <span key={topic} className="px-3 py-1.5 rounded-lg bg-white/5 text-dark-200 text-sm border border-white/5 hover:border-primary-500/30 hover:text-primary-400 transition-all">{topic}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default RoadmapTimeline
