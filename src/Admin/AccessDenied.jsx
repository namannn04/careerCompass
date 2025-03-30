"use client"

function AccessDenied({ onBackToLogin }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950 p-4">
      <div className="text-center max-w-md animate-fade-in-up">
        <div className="mb-6 flex justify-center">
          <div className="h-24 w-24 rounded-full bg-red-500/20 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-red-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-2 text-white">Access Denied</h1>
        <p className="text-xl text-gray-400 mb-8">403 Forbidden - You don't have permission to access this resource</p>

        <div className="space-y-4">
          <p className="text-gray-400">
            This area is restricted to authorized administrators only. If you believe you should have access, please
            contact the system administrator.
          </p>

          <button
            className="inline-flex mt-6 h-10 items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-500"
            onClick={onBackToLogin}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Return to Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default AccessDenied

