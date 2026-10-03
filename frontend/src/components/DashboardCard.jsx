import { motion } from 'framer-motion'

const DashboardCard = ({ title, value, subtitle, icon: Icon, color, index, children }) => {
  const colorClasses = {
    purple: 'from-primary-500 to-purple-600',
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    orange: 'from-orange-500 to-amber-500',
    pink: 'from-pink-500 to-rose-500',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card p-6 hover:border-primary-500/30 transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color] || colorClasses.purple} flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {children && children}
      </div>
      <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
      <p className="text-white font-medium text-sm mb-1">{title}</p>
      {subtitle && <p className="text-dark-400 text-xs">{subtitle}</p>}
    </motion.div>
  )
}

export default DashboardCard
