function DashboardMetrics() {
    return (
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
  
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="rounded-lg overflow-hidden border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:bg-gray-800/80">
              <div className="bg-gradient-to-r from-purple-600/10 to-transparent pb-2 p-6">
                <div className="flex items-center text-lg font-semibold text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-5 w-5 text-purple-500"
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
                  Total Users
                </div>
              </div>
              <div className="p-6 pt-4">
                <div className="text-3xl font-bold text-white">2,543</div>
                <p className="text-gray-400 text-sm mt-1">+12% from last month</p>
              </div>
            </div>
          </div>
  
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="rounded-lg overflow-hidden border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:bg-gray-800/80">
              <div className="bg-gradient-to-r from-purple-600/10 to-transparent pb-2 p-6">
                <div className="flex items-center text-lg font-semibold text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-5 w-5 text-purple-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                  Career Options
                </div>
              </div>
              <div className="p-6 pt-4">
                <div className="text-3xl font-bold text-white">511</div>
                <p className="text-gray-400 text-sm mt-1">+5 new this week</p>
              </div>
            </div>
          </div>
  
          <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="rounded-lg overflow-hidden border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:bg-gray-800/80">
              <div className="bg-gradient-to-r from-purple-600/10 to-transparent pb-2 p-6">
                <div className="flex items-center text-lg font-semibold text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-5 w-5 text-purple-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                  Total Sales
                </div>
              </div>
              <div className="p-6 pt-4">
                <div className="text-3xl font-bold text-white">$34,890</div>
                <p className="text-gray-400 text-sm mt-1">+23% from last month</p>
              </div>
            </div>
          </div>
        </div>
  
        <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="rounded-lg border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
            </div>
            <div className="p-6 pt-0">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-purple-600/10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-purple-500"
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
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-white">New user registered</h4>
                      <p className="text-xs text-gray-400">User ID: #1234{item}</p>
                    </div>
                    <div className="text-xs text-gray-400">
                      {item} hour{item !== 1 ? "s" : ""} ago
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default DashboardMetrics
  
  