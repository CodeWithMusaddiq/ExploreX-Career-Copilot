import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashboard from './pages/Dashboard'
import AICopilotPage from './pages/AICopilotPage'
import ComparisonPage from './pages/ComparisonPage'
import MentorsPage from './pages/MentorsPage'
import ProfilePage from './pages/ProfilePage'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return <div className="min-h-screen bg-dark-950 flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" /></div>
  return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
  const { isAuthenticated } = useAuth()
  return (
    <div className="min-h-screen bg-dark-950 text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/copilot" element={<PrivateRoute><AICopilotPage /></PrivateRoute>} />
        <Route path="/compare" element={<PrivateRoute><ComparisonPage /></PrivateRoute>} />
        <Route path="/mentors" element={<PrivateRoute><MentorsPage /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      </Routes>
      {!isAuthenticated && <Footer />}
    </div>
  )
}

export default App
