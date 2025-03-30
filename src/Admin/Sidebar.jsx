"use client"

function Sidebar({ activeTab, setActiveTab, onLogout }) {
  return (
    <div className="hidden md:flex w-64 flex-col bg-gray-800/50 backdrop-blur-sm border-r border-gray-700/50 p-4">
      <div className="flex items-center gap-2 mb-8">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-500/60 flex items-center justify-center text-white font-bold">
          CA
        </div>
        <h1 className="text-xl font-bold text-white">Career Admin</h1>
      </div>

      <nav className="space-y-2 flex-1">
        <button
          className={`w-full text-left px-3 py-2 rounded-md flex items-center text-sm font-medium ${
            activeTab === "dashboard" ? "bg-purple-600 text-white" : "text-gray-300 hover:bg-gray-700/50"
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`w-full text-left px-3 py-2 rounded-md flex items-center text-sm font-medium ${
            activeTab === "counselors" ? "bg-purple-600 text-white" : "text-gray-300 hover:bg-gray-700/50"
          }`}
          onClick={() => setActiveTab("counselors")}
        >
          Counselor Approvals
        </button>
        <button
          className={`w-full text-left px-3 py-2 rounded-md flex items-center text-sm font-medium ${
            activeTab === "CareersDashboard" ? "bg-purple-600 text-white" : "text-gray-300 hover:bg-gray-700/50"
          }`}
          onClick={() => setActiveTab("CareersDashboard")}
        >
          Careers
        </button>
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-700/50">
        <button
          className="w-full text-left px-3 py-2 rounded-md flex items-center text-sm font-medium text-gray-300 hover:bg-gray-700/50"
          onClick={onLogout}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar

