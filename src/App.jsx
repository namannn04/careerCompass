"use client"

import { useState } from "react"
import "./Admin/admin-dashboard.css"
import LoginForm from "./Admin/LoginForm"
import AdminDashboard from "./Admin/AdminDashboard"
import AccessDenied from "./Admin/AccessDenied"


function App() {
  const [authState, setAuthState] = useState("login") // 'login', 'authenticated', 'denied'

  const handleLogin = () => {
    setAuthState("authenticated")
  }

  const handleLogout = () => {
    setAuthState("login")
  }

  const handleAccessDenied = () => {
    setAuthState("denied")
  }

  const handleBackToLogin = () => {
    setAuthState("login")
  }

  return (
    <div className="App">
      {authState === "login" && <LoginForm onLogin={handleLogin} />}

      {authState === "authenticated" && <AdminDashboard onLogout={handleLogout} />}

      {authState === "denied" && <AccessDenied onBackToLogin={handleBackToLogin} />}
    </div>
  )
}

export default App

