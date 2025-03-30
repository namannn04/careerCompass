"use client"

import { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"

// Import your existing Firebase instance
// Assuming thirdDb is already initialized elsewhere and imported here
import { thirdDb } from "../../backend/firestore" // Update this path to where your Firebase is initialized

function CounselorApprovals() {
  const [counselors, setCounselors] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [selectedCounselor, setSelectedCounselor] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("bio")

  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        const counselorsCollection = collection(thirdDb, "counselorRegistrations")
        const counselorsSnapshot = await getDocs(counselorsCollection)
        const counselorsList = counselorsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          status: doc.data().status || "pending",
          // Map Firebase data to the format needed for the table
          name: doc.data().fullName,
          email: doc.data().email,
          expertise: doc.data().specialization,
          date: doc.data().createdAt?.toDate?.() || new Date(),
        }))
        setCounselors(counselorsList)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching counselors:", error)
        setLoading(false)
      }
    }

    fetchCounselors()
  }, [])

  const handleApprove = (id) => {
    setCounselors(
      counselors.map((counselor) => (counselor.id === id ? { ...counselor, status: "approved" } : counselor)),
    )
    // Here you would also update the status in Firebase
  }

  const handleReject = (id) => {
    setCounselors(
      counselors.map((counselor) => (counselor.id === id ? { ...counselor, status: "rejected" } : counselor)),
    )
    // Here you would also update the status in Firebase
  }

  const openCounselorModal = (counselor) => {
    setSelectedCounselor(counselor)
    setIsModalOpen(true)
    setActiveTab("bio")
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedCounselor(null)
  }

  const filteredCounselors = counselors.filter((counselor) => {
    const matchesSearch =
      counselor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      counselor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      counselor.expertise?.toLowerCase().includes(searchTerm.toLowerCase())

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

  // Handle click outside modal to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      const modal = document.getElementById("counselor-modal")
      if (isModalOpen && modal && !modal.contains(event.target)) {
        closeModal()
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isModalOpen])

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isModalOpen])

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
              {loading ? (
                <tr>
                  <td colSpan={6} className="h-24 text-center text-gray-400">
                    Loading counselors...
                  </td>
                </tr>
              ) : filteredCounselors.length === 0 ? (
                <tr>
                  <td colSpan={6} className="h-24 text-center text-gray-400">
                    No counselors found.
                  </td>
                </tr>
              ) : (
                filteredCounselors.map((counselor) => (
                  <tr
                    key={counselor.id}
                    className="border-b border-gray-700/50 hover:bg-gray-700/50 transition-colors animate-fade-in cursor-pointer"
                    style={{ animationDelay: `${Number.parseInt(counselor.id) * 0.05}s` }}
                    onClick={() => openCounselorModal(counselor)}
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
                    <td className="px-4 py-4 text-sm text-right" onClick={(e) => e.stopPropagation()}>
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Modal Implementation */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div
            id="counselor-modal"
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg bg-gray-900 border border-gray-700 text-white shadow-xl"
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900">
              <h2 className="text-xl font-bold text-white">Counselor Profile</h2>
              <button
                onClick={closeModal}
                className="rounded-full p-1 text-gray-400 hover:text-white hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {selectedCounselor && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left Column - Profile Image and Basic Info */}
                  <div className="space-y-4">
                    <div className="flex flex-col items-center">
                      <div className="h-32 w-32 rounded-full overflow-hidden border-2 border-purple-500">
                        {selectedCounselor.profilePictureUrl ? (
                          <img
                            src={selectedCounselor.profilePictureUrl || "/placeholder.svg"}
                            alt={selectedCounselor.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-purple-900 text-3xl font-bold text-white">
                            {selectedCounselor.name?.charAt(0) || "C"}
                          </div>
                        )}
                      </div>
                      <h2 className="mt-4 text-xl font-bold">{selectedCounselor.name}</h2>
                      <span className="mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-purple-600 text-white">
                        {selectedCounselor.expertise}
                      </span>
                    </div>

                    <div className="space-y-2 rounded-lg border border-gray-700 p-4">
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        <span className="text-sm text-gray-300">{selectedCounselor.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <span className="text-sm text-gray-300">{selectedCounselor.phone || "Not provided"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                        <a
                          href={selectedCounselor.linkedinProfile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-purple-400 hover:underline"
                        >
                          LinkedIn Profile
                        </a>
                      </div>
                    </div>

                    <div className="rounded-lg border border-gray-700 p-4">
                      <h3 className="mb-2 font-semibold">Consultation Details</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Fee:</span>
                          <span className="text-sm font-medium">
                            ${selectedCounselor.feeAmount || selectedCounselor.consultationFees || "Not set"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Experience:</span>
                          <span className="text-sm font-medium">
                            {selectedCounselor.experience || "Not specified"} years
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Tabs with Details */}
                  <div className="md:col-span-2">
                    {/* Custom Tabs */}
                    <div className="w-full">
                      <div className="flex border-b border-gray-700">
                        <button
                          className={`px-4 py-2 text-sm font-medium ${
                            activeTab === "bio"
                              ? "text-purple-400 border-b-2 border-purple-400"
                              : "text-gray-400 hover:text-white"
                          }`}
                          onClick={() => setActiveTab("bio")}
                        >
                          Bio
                        </button>
                        <button
                          className={`px-4 py-2 text-sm font-medium ${
                            activeTab === "qualifications"
                              ? "text-purple-400 border-b-2 border-purple-400"
                              : "text-gray-400 hover:text-white"
                          }`}
                          onClick={() => setActiveTab("qualifications")}
                        >
                          Qualifications
                        </button>
                        <button
                          className={`px-4 py-2 text-sm font-medium ${
                            activeTab === "documents"
                              ? "text-purple-400 border-b-2 border-purple-400"
                              : "text-gray-400 hover:text-white"
                          }`}
                          onClick={() => setActiveTab("documents")}
                        >
                          Documents
                        </button>
                        <button
                          className={`px-4 py-2 text-sm font-medium ${
                            activeTab === "availability"
                              ? "text-purple-400 border-b-2 border-purple-400"
                              : "text-gray-400 hover:text-white"
                          }`}
                          onClick={() => setActiveTab("availability")}
                        >
                          Availability
                        </button>
                      </div>

                      {/* Tab Content */}
                      <div className="mt-4">
                        {/* Bio Tab */}
                        {activeTab === "bio" && (
                          <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
                            <p className="text-gray-300 whitespace-pre-line">
                              {selectedCounselor.bio || "No bio information provided."}
                            </p>
                          </div>
                        )}

                        {/* Qualifications Tab */}
                        {activeTab === "qualifications" && (
                          <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 space-y-4">
                            <div>
                              <h3 className="text-sm font-medium text-gray-400">Qualification</h3>
                              <p className="text-white">{selectedCounselor.qualification || "Not specified"}</p>
                            </div>

                            <div>
                              <h3 className="text-sm font-medium text-gray-400">Specialization</h3>
                              <p className="text-white">{selectedCounselor.specialization || "Not specified"}</p>
                            </div>

                            <div>
                              <h3 className="text-sm font-medium text-gray-400">Certifications</h3>
                              <p className="text-white whitespace-pre-line">
                                {selectedCounselor.certifications || "None provided"}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Documents Tab */}
                        {activeTab === "documents" && (
                          <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 space-y-4">
                            <div>
                              <h3 className="text-sm font-medium text-gray-400 mb-2">ID Proof</h3>
                              {selectedCounselor.idProofUrl ? (
                                <div className="relative h-40 w-full overflow-hidden rounded-md border border-gray-700">
                                  <img
                                    src={selectedCounselor.idProofUrl || "/placeholder.svg"}
                                    alt="ID Proof"
                                    className="h-full w-full object-contain"
                                  />
                                </div>
                              ) : (
                                <p className="text-gray-500 italic">No ID proof uploaded</p>
                              )}
                            </div>

                            <div>
                              <h3 className="text-sm font-medium text-gray-400 mb-2">Degree Certificate</h3>
                              {selectedCounselor.degreeUploadUrl ? (
                                <div className="relative h-40 w-full overflow-hidden rounded-md border border-gray-700">
                                  <img
                                    src={selectedCounselor.degreeUploadUrl || "/placeholder.svg"}
                                    alt="Degree Certificate"
                                    className="h-full w-full object-contain"
                                  />
                                </div>
                              ) : (
                                <p className="text-gray-500 italic">No degree certificate uploaded</p>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Availability Tab */}
                        {activeTab === "availability" && (
                          <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
                            <p className="text-gray-400 mb-4">Counselor's availability slots</p>
                            {selectedCounselor.availabilitySlots ? (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {selectedCounselor.availabilitySlots.split(",").map((slot, index) => (
                                  <div key={index} className="rounded-md bg-gray-700 px-3 py-2 text-sm">
                                    {slot.trim()}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-500 italic">No availability slots specified</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {selectedCounselor.testimonials && (
                      <div className="mt-6">
                        <h3 className="mb-3 font-semibold">Testimonials</h3>
                        <div className="rounded-lg border border-gray-700 p-4">
                          <p className="text-gray-300 italic whitespace-pre-line">"{selectedCounselor.testimonials}"</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CounselorApprovals

