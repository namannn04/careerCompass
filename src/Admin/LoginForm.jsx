"use client"

import { useState } from "react"

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Hardcoded admin accounts for demo
  const adminAccounts = [
    { email: "sanidhya14321@gmail.com", password: "cc12345678" },
    { email: "namandadhich15592@gmail.com", password: "cc1234567" },
    {email: "khushipawar987@gmail.com", password: "cc123"},
    { email: "admin3@example.com", password: "password3" },
    { email: "admin4@example.com", password: "password4" },
  ]

  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simple validation
    if (!email || !password) {
      setError("Please enter both email and password")
      setIsLoading(false)
      return
    }

    // Check if user is an admin
    const isAdmin = adminAccounts.some((admin) => admin.email === email && admin.password === password)

    setTimeout(() => {
      if (isAdmin) {
        onLogin()
      } else {
        setError("Access denied. Invalid credentials.")
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950 p-4">
      <div className="animate-fade-in-up">
        <div className="w-full max-w-md rounded-lg border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm shadow-xl">
          <div className="space-y-1 p-6">
            <div className="flex justify-center mb-2">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-500/60 flex items-center justify-center text-white font-bold text-xl">
                CA
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center text-white">Admin Login</h1>
            <p className="text-center text-gray-400">Enter your credentials to access the admin dashboard</p>
          </div>
          <div className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white">
                  Email
                </label>
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    className="w-full h-10 rounded-md border border-gray-700 bg-gray-800 px-3 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-white">
                  Password
                </label>
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full h-10 rounded-md border border-gray-700 bg-gray-800 px-3 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              {error && (
                <div className="text-sm text-red-500 p-2 bg-red-500/10 border border-red-500/20 rounded animate-fade-in">
                  {error}
                </div>
              )}
            </form>
          </div>
          <div className="p-6 border-t border-gray-700">
            <button
              className="w-full h-10 rounded-md bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-medium transition-colors"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm

