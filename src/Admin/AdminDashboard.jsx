"use client"

import { useState } from "react"
import CounselorApprovals from "./CounselorApprovals"
import DashboardMetrics from "./DashboardMetrics"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 flex">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {activeTab === "dashboard" ? <DashboardMetrics /> : <CounselorApprovals />}
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard

