import { Link } from 'react-router-dom'
import { Compass, Github, Twitter, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-dark-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-blue-500 flex items-center justify-center">
                <Compass className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                <span className="text-white">Explore</span>
                <span className="gradient-text">X</span>
              </span>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed">
              AI-powered career copilot helping students discover, plan, and build their dream careers.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary-500/20 hover:text-primary-400 transition-all"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary-500/20 hover:text-primary-400 transition-all"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary-500/20 hover:text-primary-400 transition-all"><Github className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary-500/20 hover:text-primary-400 transition-all"><Mail className="w-4 h-4" /></a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {['AI Career Copilot', 'Career Comparison', 'Mentor Booking', 'Skill Roadmaps', 'Internships'].map((item) => (
                <li key={item}><a href="#" className="text-dark-400 text-sm hover:text-primary-400 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {['Blog', 'Career Guides', 'Success Stories', 'Free Courses', 'Community'].map((item) => (
                <li key={item}><a href="#" className="text-dark-400 text-sm hover:text-primary-400 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {['About Us', 'Careers', 'Privacy Policy', 'Terms of Service', 'Contact'].map((item) => (
                <li key={item}><a href="#" className="text-dark-400 text-sm hover:text-primary-400 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-dark-500 text-sm">2024 ExploreX. All rights reserved. Built for hackathon demo.</p>
          <p className="text-dark-500 text-sm">Made with love for students everywhere</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
