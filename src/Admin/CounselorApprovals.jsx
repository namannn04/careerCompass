"use client"

import { useState } from "react"

// Sample data
const initialCounselors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    expertise: "Career Development",
    date: "2023-05-15",
    status: "pending",
  },
  {
    id: 2,
    name: "Michael Chen, PhD",
    email: "michael.chen@example.com",
    expertise: "Educational Psychology",
    date: "2023-05-14",
    status: "pending",
  },
  {
    id: 3,
    name: "Dr. James Wilson",
    email: "james.wilson@example.com",
    expertise: "Vocational Guidance",
    date: "2023-05-13",
    status: "pending",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    expertise: "Career Counseling",
    date: "2023-05-12",
    status: "pending",
  },
  {
    id: 5,
    name: "Dr. Robert Kim",
    email: "robert.kim@example.com",
    expertise: "Professional Development",
    date: "2023-05-11",
    status: "pending",
  },
]

function CounselorApprovals() {
  const [counselors, setCounselors] = useState(initialCounselors)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  const handleApprove = (id) => {
    setCounselors(
      counselors.map((counselor) => (counselor.id === id ? { ...counselor, status: "approved" } : counselor)),
    )
  }

  const handleReject = (id) => {
    setCounselors(
      counselors.map((counselor) => (counselor.id === id ? { ...counselor, status: "rejected" } : counselor)),
    )
  }

  const filteredCounselors = counselors.filter((counselor) => {
    const matchesSearch =
      counselor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      counselor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      counselor.expertise.toLowerCase().includes(searchTerm.toLowerCase())

    if (filter === "all") return matchesSearch
    return matchesSearch && counselor.status === filter
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Counselor Approvals</h1>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="search"
              placeholder="Search counselors..."
              className="w-full h-10 rounded-md border border-gray-700 bg-gray-800 px-3 py-2 pl-8 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <button
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
            </button>
            {showFilterDropdown && (
              <div className="absolute right-0 z-10 mt-2 w-40 rounded-md border border-gray-700 bg-gray-800 shadow-lg">
                <div className="py-1">
                  <button
                    className="block w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-700"
                    onClick={() => {
                      setFilter("all")
                      setShowFilterDropdown(false)
                    }}
                  >
                    All
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-700"
                    onClick={() => {
                      setFilter("pending")
                      setShowFilterDropdown(false)
                    }}
                  >
                    Pending
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-700"
                    onClick={() => {
                      setFilter("approved")
                      setShowFilterDropdown(false)
                    }}
                  >
                    Approved
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-700"
                    onClick={() => {
                      setFilter("rejected")
                      setShowFilterDropdown(false)
                    }}
                  >
                    Rejected
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Email</th>
                <th className="hidden md:table-cell px-4 py-3 text-left text-sm font-medium text-gray-400">
                  Expertise
                </th>
                <th className="hidden md:table-cell px-4 py-3 text-left text-sm font-medium text-gray-400">
                  Date Applied
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Status</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCounselors.map((counselor) => (
                <tr
                  key={counselor.id}
                  className="border-b border-gray-700/50 hover:bg-gray-700/50 transition-colors animate-fade-in"
                  style={{ animationDelay: `${counselor.id * 0.05}s` }}
                >
                  <td className="px-4 py-4 text-sm font-medium text-white">{counselor.name}</td>
                  <td className="px-4 py-4 text-sm text-white">{counselor.email}</td>
                  <td className="hidden md:table-cell px-4 py-4 text-sm text-white">{counselor.expertise}</td>
                  <td className="hidden md:table-cell px-4 py-4 text-sm text-white">{formatDate(counselor.date)}</td>
                  <td className="px-4 py-4 text-sm">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        counselor.status === "approved"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : counselor.status === "rejected"
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                      }`}
                    >
                      {counselor.status.charAt(0).toUpperCase() + counselor.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-right">
                    <div className="flex justify-end gap-2">
                      {counselor.status === "pending" && (
                        <>
                          <button
                            className="rounded-md p-1 text-green-400 hover:text-green-300 hover:bg-green-500/10"
                            onClick={() => handleApprove(counselor.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span className="sr-only">Approve</span>
                          </button>
                          <button
                            className="rounded-md p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            onClick={() => handleReject(counselor.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                            <span className="sr-only">Reject</span>
                          </button>
                        </>
                      )}
                      {counselor.status !== "pending" && (
                        <button
                          className="rounded-md px-2 py-1 text-xs text-gray-400 hover:bg-gray-700"
                          onClick={() =>
                            setCounselors(
                              counselors.map((c) => (c.id === counselor.id ? { ...c, status: "pending" } : c)),
                            )
                          }
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCounselors.length === 0 && (
                <tr>
                  <td colSpan={6} className="h-24 text-center text-gray-400">
                    No counselors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CounselorApprovals

