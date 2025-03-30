"use client";

import { useState } from "react";
import CounselorApprovals from "./CounselorApprovals";
import DashboardMetrics from "./DashboardMetrics";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import CareersDashboard from "./careersDashboard";

function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardMetrics />;
      case "counselors":
        return <CounselorApprovals />;
      case "CareersDashboard":
        return <CareersDashboard/>;
      default:
        return <DashboardMetrics />; // Fallback case
    }
  };

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
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
