import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GitCompare, Plus, X, ArrowRight, Sparkles } from 'lucide-react'
import ComparisonCard from '../components/ComparisonCard'
import { mockCareers } from '../utils/mockData'

const ComparisonPage = () => {
  const [selectedCareers, setSelectedCareers] = useState([mockCareers[0], mockCareers[1]])
  const [showSelector, setShowSelector] = useState(false)

  const addCareer = (career) => {
    if (selectedCareers.length < 3 && !selectedCareers.find(c => c.id === career.id)) {
      setSelectedCareers([...selectedCareers, career])
      setShowSelector(false)
    }
  }

  const removeCareer = (id) => setSelectedCareers(selectedCareers.filter(c => c.id !== id))
  const getWinner = () => selectedCareers.reduce((prev, current) => (prev.compatibility > current.compatibility) ? prev : current)

  return (
    <div className="min-h-screen bg-dark-950 pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <GitCompare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Career Comparison</h1>
              <p className="text-dark-400 text-sm">Compare multiple career paths side by side</p>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          {selectedCareers.map((career) => (
            <motion.div key={career.id} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500/20 to-blue-500/20 border border-primary-500/30">
              <span className="text-white font-medium text-sm">{career.title}</span>
              <button onClick={() => removeCareer(career.id)} className="p-1 rounded-lg hover:bg-white/10 transition-colors"><X className="w-4 h-4 text-dark-300" /></button>
            </motion.div>
          ))}
          {selectedCareers.length < 3 && (
            <button onClick={() => setShowSelector(!showSelector)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-primary-500/30 transition-all text-dark-300 text-sm">
              <Plus className="w-4 h-4" /> Add Career
            </button>
          )}
        </div>

        <AnimatePresence>
          {showSelector && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 glass-card p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {mockCareers.filter(c => !selectedCareers.find(sc => sc.id === c.id)).map((career) => (
                  <button key={career.id} onClick={() => addCareer(career)} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 text-left transition-all">
                    <p className="text-white text-sm font-medium">{career.title}</p>
                    <p className="text-dark-400 text-xs">{career.category}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {selectedCareers.length >= 2 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {selectedCareers.map((career, index) => (
              <ComparisonCard key={career.id} career={career} isWinner={career.id === getWinner().id} index={index} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center">
            <GitCompare className="w-16 h-16 text-dark-600 mx-auto mb-4" />
            <h3 className="text-white font-bold text-xl mb-2">Select at least 2 careers</h3>
            <p className="text-dark-400">Add careers to compare them side by side</p>
          </div>
        )}

        {selectedCareers.length >= 2 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8 glass-card p-6 border-primary-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-primary-400" />
              <h3 className="text-white font-bold text-lg">AI Recommendation</h3>
            </div>
            <p className="text-dark-200 leading-relaxed mb-4">
              Based on your profile and market trends, <span className="text-primary-400 font-semibold">{getWinner().title}</span> appears to be the best match for you. It offers {getWinner().compatibility}% compatibility with your skills, {getWinner().demand.toLowerCase()} market demand, and strong earning potential at {getWinner().salary}.
            </p>
            <button className="btn-primary text-sm flex items-center gap-2">View Full Roadmap <ArrowRight className="w-4 h-4" /></button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ComparisonPage
