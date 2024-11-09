import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// UltraPremiumLoader Component
const Loader = ({ loading }) => {
  if (!loading) return null

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative w-64 h-64">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00ffff" />
                  <stop offset="100%" stopColor="#ff00ff" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                filter="url(#glow)"
                initial={{ pathLength: 0, rotate: 0 }}
                animate={{ pathLength: 1, rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.path
                d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z"
                fill="url(#gradient)"
                filter="url(#glow)"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
              />
            </svg>
          </div>
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <motion.h1
              className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              CareerCompass
            </motion.h1>
            <motion.p
              className="mt-4 text-xl text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              Illuminating Your Professional Path
            </motion.p>
          </motion.div>
          <motion.div
            className="absolute bottom-10 left-0 right-0 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-pink-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Navbar Component
const Navbar = ({ setCurrentPage }) => {
  return (
    <nav className="bg-gray-900 p-4">
      <ul className="flex space-x-4">
        <li>
          <button onClick={() => setCurrentPage('home')} className="text-white hover:text-cyan-400 transition-colors">Home</button>
        </li>
        <li>
          <button onClick={() => setCurrentPage('about')} className="text-white hover:text-cyan-400 transition-colors">About</button>
        </li>
        <li>
          <button onClick={() => setCurrentPage('contact')} className="text-white hover:text-cyan-400 transition-colors">Contact</button>
        </li>
      </ul>
    </nav>
  )
}

// Home Component
const Home = () => {
  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to CareerCompass</h1>
      <p className="text-xl">Navigate your professional journey with confidence.</p>
    </div>
  )
}

// About Component
const About = () => {
  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-4xl font-bold mb-4">About CareerCompass</h1>
      <p className="text-xl">Empowering professionals to find their true north in their careers.</p>
    </div>
  )
}

// Contact Component
const Contact = () => {
  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-xl">Get in touch with the CareerCompass team for personalized guidance.</p>
    </div>
  )
}

// Main App Component
const App = () => {
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => setLoading(false), 3500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [currentPage])

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />
      case 'about':
        return <About />
      case 'contact':
        return <Contact />
      default:
        return <Home />
    }
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <UltraPremiumLoader loading={loading} />
      <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar setCurrentPage={setCurrentPage} />
        {renderPage()}
      </div>
    </div>
  )
}

export default Loader