"use client"

function Navbar({ activeTab, setActiveTab, onLogout }) {
  return (
    <header className="h-16 border-b border-gray-700/50 backdrop-blur-sm bg-gray-800/30 flex items-center justify-between px-4">
      <div className="md:hidden">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-500/60 flex items-center justify-center text-white font-bold">
          CA
        </div>
      </div>
      <h2 className="text-lg font-medium hidden md:block text-white">Welcome, Admin</h2>
      <div className="flex items-center gap-4">
        <div className="md:hidden">
          <div className="inline-flex h-10 items-center justify-center rounded-md bg-gray-800 p-1 text-gray-400">
            <button
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
                activeTab === "dashboard" ? "bg-gray-900 text-white shadow-sm" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>
            <button
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
                activeTab === "counselors" ? "bg-gray-900 text-white shadow-sm" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("counselors")}
            >
              Counselors
            </button>
          </div>
        </div>
        <button className="md:hidden rounded-full p-2 text-gray-400 hover:bg-gray-700/50" onClick={onLogout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
        </button>
      </div>
    </header>
  )
}

export default Navbar

