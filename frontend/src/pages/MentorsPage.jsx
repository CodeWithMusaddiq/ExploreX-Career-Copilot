import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Search, Star, Calendar, Clock, X, CheckCircle2, IndianRupee } from 'lucide-react'
import MentorCard from '../components/MentorCard'
import { mockMentors } from '../utils/mockData'

const MentorsPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedMentor, setSelectedMentor] = useState(null)
  const [bookingStep, setBookingStep] = useState(0)
  const [bookingData, setBookingData] = useState({ date: '', time: '', topic: '' })

  const categories = ['All', 'Technology', 'Design', 'Product', 'Data Science', 'Marketing', 'Cloud']

  const filteredMentors = mockMentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) || mentor.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'All' || mentor.expertise.some(e => e.toLowerCase().includes(selectedCategory.toLowerCase()))
    return matchesSearch && matchesCategory
  })

  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM']

  const handleBook = (mentor) => { setSelectedMentor(mentor); setBookingStep(1) }

  const confirmBooking = () => {
    setBookingStep(3)
    setTimeout(() => { setSelectedMentor(null); setBookingStep(0); setBookingData({ date: '', time: '', topic: '' }) }, 3000)
  }

  return (
    <div className="min-h-screen bg-dark-950 pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Find a Mentor</h1>
              <p className="text-dark-400 text-sm">Learn from industry experts at top companies</p>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by name or expertise..." className="input-field pl-11 py-3" />
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 md:pb-0">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-gradient-to-r from-primary-500 to-blue-500 text-white' : 'bg-white/5 text-dark-300 hover:bg-white/10'}`}>{cat}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor, index) => (
            <MentorCard key={mentor.id} mentor={mentor} index={index} onBook={handleBook} />
          ))}
        </div>

        <AnimatePresence>
          {selectedMentor && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass-card w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                  <h3 className="text-white font-bold text-lg">{bookingStep === 3 ? 'Booking Confirmed!' : 'Book a Session'}</h3>
                  <button onClick={() => { setSelectedMentor(null); setBookingStep(0) }} className="p-2 rounded-lg hover:bg-white/5 transition-colors"><X className="w-5 h-5 text-dark-400" /></button>
                </div>
                <div className="p-6">
                  {bookingStep === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                      <div className="flex items-center gap-4 mb-6">
                        <img src={selectedMentor.image} alt={selectedMentor.name} className="w-16 h-16 rounded-xl object-cover" />
                        <div>
                          <h4 className="text-white font-bold">{selectedMentor.name}</h4>
                          <p className="text-primary-400 text-sm">{selectedMentor.role} at {selectedMentor.company}</p>
                          <div className="flex items-center gap-1 mt-1"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /><span className="text-white text-sm">{selectedMentor.rating}</span></div>
                        </div>
                      </div>
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                          <div className="flex items-center gap-3"><IndianRupee className="w-5 h-5 text-green-400" /><span className="text-dark-300">Session Price</span></div>
                          <span className="text-white font-bold">Rs {selectedMentor.price}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                          <div className="flex items-center gap-3"><Clock className="w-5 h-5 text-blue-400" /><span className="text-dark-300">Duration</span></div>
                          <span className="text-white font-bold">45 minutes</span>
                        </div>
                      </div>
                      <button onClick={() => setBookingStep(2)} className="w-full btn-primary py-3 flex items-center justify-center gap-2">Continue to Schedule</button>
                    </motion.div>
                  )}

                  {bookingStep === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <div>
                        <label className="text-dark-300 text-sm font-medium mb-2 block flex items-center gap-2"><Calendar className="w-4 h-4" /> Select Date</label>
                        <input type="date" value={bookingData.date} onChange={(e) => setBookingData({...bookingData, date: e.target.value})} className="input-field" min={new Date().toISOString().split('T')[0]} required />
                      </div>
                      <div>
                        <label className="text-dark-300 text-sm font-medium mb-2 block flex items-center gap-2"><Clock className="w-4 h-4" /> Select Time</label>
                        <div className="grid grid-cols-4 gap-2">
                          {timeSlots.map((time) => (
                            <button key={time} onClick={() => setBookingData({...bookingData, time})} className={`p-2 rounded-lg text-sm transition-all ${bookingData.time === time ? 'bg-gradient-to-r from-primary-500 to-blue-500 text-white' : 'bg-white/5 text-dark-300 hover:bg-white/10'}`}>{time}</button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-dark-300 text-sm font-medium mb-2 block">Discussion Topic</label>
                        <textarea value={bookingData.topic} onChange={(e) => setBookingData({...bookingData, topic: e.target.value})} className="input-field h-24 resize-none" placeholder="What would you like to discuss?" required />
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => setBookingStep(1)} className="flex-1 btn-secondary py-3">Back</button>
                        <button onClick={confirmBooking} disabled={!bookingData.date || !bookingData.time || !bookingData.topic} className="flex-1 btn-primary py-3 disabled:opacity-50">Confirm Booking</button>
                      </div>
                    </motion.div>
                  )}

                  {bookingStep === 3 && (
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-white" />
                      </div>
                      <h4 className="text-white font-bold text-xl mb-2">Booking Confirmed!</h4>
                      <p className="text-dark-400 mb-2">Your session with {selectedMentor.name} is scheduled</p>
                      <p className="text-primary-400 font-medium">{bookingData.date} at {bookingData.time}</p>
                      <p className="text-dark-500 text-sm mt-4">A confirmation email has been sent to your inbox.</p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default MentorsPage
