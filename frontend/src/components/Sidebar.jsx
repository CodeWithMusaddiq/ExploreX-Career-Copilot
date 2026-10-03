import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, Brain, GitCompare, Users, UserCircle, Briefcase, TrendingUp, Settings, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Sidebar = () => {
  const location = useLocation()
  const { logout } = useAuth()

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Copilot', path: '/copilot', icon: Brain },
    { name: 'Compare Careers', path: '/compare', icon: GitCompare },
    { name: 'Mentors', path: '/mentors', icon: Users },
    { name: 'Internships', path: '/dashboard', icon: Briefcase },
    { name: 'Side Hustles', path: '/dashboard', icon: TrendingUp },
    { name: 'Profile', path: '/profile', icon: UserCircle },
    { name: 'Settings', path: '/profile', icon: Settings },
  ]

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 glass border-r border-white/5 pt-20 pb-6 px-4"
    >
      <div className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-primary-600/20 to-blue-600/20 text-primary-400 border border-primary-500/20'
                  : 'text-dark-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-primary-400' : ''}`} />
              {item.name}
            </Link>
          )
        })}
      </div>
      <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all">
        <LogOut className="w-5 h-5" /> Logout
      </button>
    </motion.aside>
  )
}

export default Sidebar
