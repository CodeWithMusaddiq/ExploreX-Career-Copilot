import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, Mic, MicOff, Brain, Sparkles, Loader2, 
  Globe, BookOpen, Target, Briefcase, TrendingUp, Zap, RotateCcw, Volume2
} from 'lucide-react'
import AIResponseCard from '../components/AIResponseCard'
import axios from 'axios'

const AICopilotPage = () => {
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: 'Hi! I am your AI Career Copilot. Tell me about your education, interests, and goals, and I will help you discover the perfect career path. You can also speak to me in Hindi or Telugu!',
      data: null
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [language, setLanguage] = useState('en')
  const [showForm, setShowForm] = useState(true)
  const [userProfile, setUserProfile] = useState({
    education: '',
    interests: '',
    goals: '',
    skills: '',
    language: 'en'
  })
  const messagesEndRef = useRef(null)
  const speechRecognitionRef = useRef(null)

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', flag: '🇮🇳' }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => () => speechRecognitionRef.current?.stop(), [])

  // ✅ CALL REAL BACKEND API — GEMINI
  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setShowForm(false)
    
    const profileMessage = `Education: ${userProfile.education}\nInterests: ${userProfile.interests}\nGoals: ${userProfile.goals}\nSkills: ${userProfile.skills}`
    setMessages(prev => [...prev, { type: 'user', content: profileMessage }])
    
    setIsLoading(true)
    try {
      const res = await axios.post('/api/career/analyze', {
        education: userProfile.education,
        interests: userProfile.interests,
        goals: userProfile.goals,
        skills: userProfile.skills,
        language: language === 'hi' ? 'Hindi' : language === 'te' ? 'Telugu' : 'English'
      })
      
      const aiData = res.data.data
      
      setMessages(prev => [...prev, {
        type: 'ai',
        content: `Based on your profile (${userProfile.education}, interested in ${userProfile.interests}), here are my personalized recommendations:`,
        data: aiData
      }])
    } catch (err) {
      console.error('Career analysis request failed:', err.name || 'Error')
      setMessages(prev => [...prev, {
        type: 'ai',
        content: 'Sorry, I could not connect to the AI service. Please check your internet connection and try again.',
        data: null
      }])
    }
    setIsLoading(false)
  }

  // ✅ CALL BACKEND FOR FOLLOW-UP CHAT
  const handleSendMessage = async () => {
    if (!input.trim()) return

    setMessages(prev => [...prev, { type: 'user', content: input }])
    setInput('')
    setIsLoading(true)

    try {
      // Send follow-up question to backend chat endpoint
      const res = await axios.post('/api/career/chat', {
        message: input,
        language: language === 'hi' ? 'Hindi' : language === 'te' ? 'Telugu' : 'English'
      })
      
      setMessages(prev => [...prev, {
        type: 'ai',
        content: res.data.response || 'I apologize, but I could not generate a response at this moment.',
        data: null
      }])
    } catch (err) {
      console.error('AI chat request failed:', err.name || 'Error')
      // Fallback: simple response if backend chat not available
      setMessages(prev => [...prev, {
        type: 'ai',
        content: `Regarding "${input}": I recommend exploring the career paths and roadmaps shown above. For specific guidance, please review the skill recommendations and consider booking a mentor session.`,
        data: null
      }])
    }
    setIsLoading(false)
  }

  const toggleRecording = () => {
    if (isRecording) {
      speechRecognitionRef.current?.stop()
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setMessages(prev => [...prev, {
        type: 'ai',
        content: 'Voice input is not supported in this browser. Please type your question instead.',
        data: null
      }])
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = language === 'hi' ? 'hi-IN' : language === 'te' ? 'te-IN' : 'en-IN'
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    recognition.onresult = (event) => {
      setInput(event.results[0][0].transcript)
    }
    recognition.onerror = (event) => {
      setIsRecording(false)
      if (event.error !== 'aborted' && event.error !== 'no-speech') {
        setMessages(prev => [...prev, {
          type: 'ai',
          content: 'Voice input could not be started. Check microphone permission or type your question instead.',
          data: null
        }])
      }
    }
    recognition.onend = () => setIsRecording(false)
    speechRecognitionRef.current = recognition

    try {
      recognition.start()
      setIsRecording(true)
    } catch (err) {
      console.error('Speech recognition error:', err)
      setIsRecording(false)
      setMessages(prev => [...prev, {
        type: 'ai',
        content: 'Voice input could not be started. Check microphone permission or type your question instead.',
        data: null
      }])
    }
  }

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = language === 'hi' ? 'hi-IN' : language === 'te' ? 'te-IN' : 'en-IN'
    window.speechSynthesis.speak(utterance)
  }

  const resetChat = () => {
    setMessages([{
      type: 'ai',
      content: 'Hi! I am your AI Career Copilot. Tell me about your education, interests, and goals, and I will help you discover the perfect career path.',
      data: null
    }])
    setShowForm(true)
    setUserProfile({ education: '', interests: '', goals: '', skills: '', language: 'en' })
  }

  return (
    <div className="min-h-screen bg-dark-950 pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AI Career Copilot</h1>
              <p className="text-dark-400 text-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-primary-400" />
                Powered by Gemini AI
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="input-field py-2 px-3 text-sm w-32"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
            <button
              onClick={resetChat}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              title="Reset chat"
            >
              <RotateCcw className="w-5 h-5 text-dark-300" />
            </button>
          </div>
        </motion.div>

        {/* Chat Container */}
        <div className="glass-card min-h-[600px] flex flex-col">
          {/* Messages */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[600px] scrollbar-hide">
            <AnimatePresence>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${msg.type === 'user' ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white' : 'glass'} rounded-2xl px-5 py-4`}>
                    {msg.type === 'ai' && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
                          <Sparkles className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-primary-400 text-xs font-medium">AI Copilot</span>
                        <button
                          onClick={() => speakText(msg.content)}
                          className="ml-auto p-1 rounded hover:bg-white/10 transition-colors"
                        >
                          <Volume2 className="w-3 h-3 text-dark-400" />
                        </button>
                      </div>
                    )}
                    <p className={`text-sm leading-relaxed ${msg.type === 'user' ? 'text-white' : 'text-dark-200'}`}>
                      {msg.content}
                    </p>

                    {msg.data && (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {msg.data.careers && <AIResponseCard type="careers" data={msg.data.careers} index={0} />}
                        {msg.data.roadmap && <AIResponseCard type="roadmap" data={msg.data.roadmap} index={1} />}
                        {msg.data.skills && <AIResponseCard type="skills" data={msg.data.skills} index={2} />}
                        {msg.data.internships && <AIResponseCard type="internships" data={msg.data.internships} index={3} />}
                        {msg.data.freelancing && <AIResponseCard type="freelancing" data={msg.data.freelancing} index={4} />}
                        {msg.data.aiOpportunities && <AIResponseCard type="aiOpportunities" data={msg.data.aiOpportunities} index={5} />}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="glass rounded-2xl px-5 py-4 flex items-center gap-3">
                  <Loader2 className="w-5 h-5 text-primary-400 animate-spin" />
                  <span className="text-dark-400 text-sm">AI is thinking...</span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Profile Form */}
          <AnimatePresence>
            {showForm && messages.length === 1 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-white/5 p-6"
              >
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary-400" />
                  Tell us about yourself
                </h3>
                <form onSubmit={handleProfileSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-dark-300 text-sm mb-1.5 block">Education Level</label>
                    <select
                      value={userProfile.education}
                      onChange={(e) => setUserProfile({...userProfile, education: e.target.value})}
                      className="input-field"
                      required
                    >
                      <option value="">Select...</option>
                      <option value="10th">10th Grade</option>
                      <option value="12th">12th Grade</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Engineering">Engineering</option>
                      <option value="MBA">MBA</option>
                      <option value="Graduate">Fresh Graduate</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-dark-300 text-sm mb-1.5 block">Interests</label>
                    <input
                      type="text"
                      value={userProfile.interests}
                      onChange={(e) => setUserProfile({...userProfile, interests: e.target.value})}
                      className="input-field"
                      placeholder="e.g., Technology, Design, Business"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-dark-300 text-sm mb-1.5 block">Career Goals</label>
                    <input
                      type="text"
                      value={userProfile.goals}
                      onChange={(e) => setUserProfile({...userProfile, goals: e.target.value})}
                      className="input-field"
                      placeholder="e.g., Work at Google, Start a company"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-dark-300 text-sm mb-1.5 block">Current Skills</label>
                    <input
                      type="text"
                      value={userProfile.skills}
                      onChange={(e) => setUserProfile({...userProfile, skills: e.target.value})}
                      className="input-field"
                      placeholder="e.g., Python, HTML, Communication"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button type="submit" className="w-full btn-primary py-3 flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Generate My Career Plan
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Input */}
          {!showForm && (
            <div className="border-t border-white/5 p-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleRecording}
                  className={`p-3 rounded-xl transition-all ${isRecording ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-white/5 text-dark-400 hover:bg-white/10'}`}
                  title={isRecording ? 'Stop recording' : 'Start voice input'}
                >
                  {isRecording ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about your career..."
                  className="flex-1 input-field py-3"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  className="p-3 rounded-xl bg-gradient-to-r from-primary-500 to-blue-500 text-white disabled:opacity-50 transition-all hover:shadow-lg hover:shadow-primary-500/20"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              {isRecording && (
                <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                  <Mic className="w-3 h-3 animate-pulse" />
                  Listening...
                </p>
              )}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {[
            { icon: BookOpen, label: 'Learning Path', action: 'Show me a learning path for React' },
            { icon: Briefcase, label: 'Internships', action: 'Find internships for me' },
            { icon: TrendingUp, label: 'Freelancing', action: 'How to start freelancing?' },
            { icon: Zap, label: 'AI Business', action: 'AI business ideas for students' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => setInput(item.action)}
              className="glass-card p-4 text-left hover:border-primary-500/30 transition-all group"
            >
              <item.icon className="w-5 h-5 text-primary-400 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-white text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AICopilotPage