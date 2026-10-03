import { motion } from 'framer-motion'
import { Star, Calendar, MessageCircle, IndianRupee } from 'lucide-react'

const MentorCard = ({ mentor, index, onBook }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="glass-card p-6 group"
    >
      <div className="flex items-start gap-4 mb-4">
        <img src={mentor.image} alt={mentor.name} className="w-16 h-16 rounded-xl object-cover ring-2 ring-primary-500/20" />
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold truncate">{mentor.name}</h3>
          <p className="text-primary-400 text-sm">{mentor.role}</p>
          <p className="text-dark-400 text-xs">{mentor.company} - {mentor.experience}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 mb-3">
        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        <span className="text-white font-semibold text-sm">{mentor.rating}</span>
        <span className="text-dark-400 text-xs">({mentor.reviews} reviews)</span>
      </div>
      <p className="text-dark-400 text-sm mb-4 line-clamp-2">{mentor.bio}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {mentor.expertise.map((skill) => (
          <span key={skill} className="px-2 py-0.5 rounded-md bg-primary-500/10 text-primary-300 text-xs">{skill}</span>
        ))}
      </div>
      <div className="flex items-center gap-2 mb-4 text-xs text-dark-400">
        <MessageCircle className="w-3.5 h-3.5" />
        <span>{mentor.sessions} sessions</span>
        <span className="mx-1">-</span>
        <Calendar className="w-3.5 h-3.5" />
        <span>{mentor.availability}</span>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex items-center gap-1 text-white font-bold">
          <IndianRupee className="w-4 h-4" />
          <span>{mentor.price}</span>
          <span className="text-dark-400 text-xs font-normal">/session</span>
        </div>
        <button onClick={() => onBook(mentor)} className="btn-primary text-sm py-2 px-4">Book Now</button>
      </div>
    </motion.div>
  )
}

export default MentorCard
