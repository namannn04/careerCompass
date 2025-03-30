"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore"

// Import your existing Firebase instance
import { thirdDb } from "../../backend/firestore" // Update this path to where your Firebase is initialized

function ApprovedCounselors() {
  const [counselors, setCounselors] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterExpertise, setFilterExpertise] = useState("all")
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedCounselor, setSelectedCounselor] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("bio")

  useEffect(() => {
    fetchApprovedCounselors()
  }, [])

  const fetchApprovedCounselors = async () => {
    try {
      const counselorsCollection = collection(thirdDb, "counselorRegistrations")
      const approvedCounselorsQuery = query(counselorsCollection, where("status", "==", "approved"))
      const counselorsSnapshot = await getDocs(approvedCounselorsQuery)

      const counselorsList = counselorsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        // Map Firebase data to the format needed for the cards
        name: doc.data().fullName,
        email: doc.data().email,
        expertise: doc.data().specialization,
        date: doc.data().createdAt?.toDate?.() || new Date(),
      }))

      setCounselors(counselorsList)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching approved counselors:", error)
      setLoading(false)
    }
  }

  const handleRemoveCounselor = async (id) => {
    try {
      // Update the status in Firebase to "pending"
      const counselorRef = doc(thirdDb, "counselorRegistrations", id)
      await updateDoc(counselorRef, {
        status: "pending",
      })

      // Remove the counselor from the displayed list
      setCounselors(counselors.filter((counselor) => counselor.id !== id))

      // Close modal if open
      if (isModalOpen && selectedCounselor?.id === id) {
        closeModal()
      }

      // Show success message (optional)
      alert("Counselor removed successfully!")
    } catch (error) {
      console.error("Error removing counselor:", error)
      alert("Failed to remove counselor. Please try again.")
    }
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

  // Get unique expertise areas for filtering
  const expertiseAreas = ["all", ...new Set(counselors.map((counselor) => counselor.expertise).filter(Boolean))]

  const filteredCounselors = counselors.filter((counselor) => {
    const matchesSearch =
      counselor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      counselor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      counselor.expertise?.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterExpertise === "all") return matchesSearch
    return matchesSearch && counselor.expertise === filterExpertise
  })

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
        <h1 className="text-2xl font-bold text-white">Approved Counselors</h1>

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
                className="h-4 w-4 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              <span>Expertise</span>
            </button>
            {showFilterDropdown && (
              <div className="absolute right-0 z-10 mt-2 w-48 rounded-md border border-gray-700 bg-gray-800 shadow-lg">
                <div className="py-1">
                  {expertiseAreas.map((expertise) => (
                    <button
                      key={expertise}
                      className="block w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-700"
                      onClick={() => {
                        setFilterExpertise(expertise)
                        setShowFilterDropdown(false)
                      }}
                    >
                      {expertise === "all" ? "All Expertise Areas" : expertise}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center text-gray-400">
            <svg
              className="animate-spin h-8 w-8 mx-auto mb-4 text-purple-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p>Loading counselors...</p>
          </div>
        </div>
      ) : filteredCounselors.length === 0 ? (
        <div className="flex justify-center items-center h-64 rounded-lg border border-gray-700 bg-gray-800/50">
          <div className="text-center text-gray-400 p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto mb-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="text-lg font-medium">No counselors found</p>
            <p className="mt-1">Try adjusting your search or filter criteria</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCounselors.map((counselor, index) => (
            <div
              key={counselor.id}
              className="rounded-lg border border-gray-700 bg-gray-800/50 backdrop-blur-sm overflow-hidden hover:border-purple-500/50 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <div
                    className="h-16 w-16 rounded-full overflow-hidden border-2 border-purple-500 flex-shrink-0 cursor-pointer"
                    onClick={() => openCounselorModal(counselor)}
                  >
                    {counselor.profilePictureUrl ? (
                      <img
                        src={counselor.profilePictureUrl || "/placeholder.svg"}
                        alt={counselor.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-purple-900 text-xl font-bold text-white">
                        {counselor.name?.charAt(0) || "C"}
                      </div>
                    )}
                  </div>
                  <div className="cursor-pointer" onClick={() => openCounselorModal(counselor)}>
                    <h2 className="text-lg font-semibold text-white">{counselor.name}</h2>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-purple-500/20 text-purple-400 border border-purple-500/30">
                      {counselor.expertise || "General Counseling"}
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-2 cursor-pointer" onClick={() => openCounselorModal(counselor)}>
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
                    <span className="text-sm text-gray-300">{counselor.email}</span>
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
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span className="text-sm text-gray-300">{counselor.qualification || "Not specified"}</span>
                  </div>

                  {counselor.experience && (
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
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span className="text-sm text-gray-300">{counselor.experience} years experience</span>
                    </div>
                  )}
                </div>

                <div
                  className="mt-4 pt-4 border-t border-gray-700 cursor-pointer"
                  onClick={() => openCounselorModal(counselor)}
                >
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {counselor.bio || "No bio information provided."}
                  </p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="text-purple-400 font-medium">
                    ${counselor.feeAmount || counselor.consultationFees || "N/A"}
                    <span className="text-gray-500 text-xs">/session</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 text-sm rounded-md bg-purple-600 hover:bg-purple-500 text-white transition-colors"
                      onClick={() => openCounselorModal(counselor)}
                    >
                      View
                    </button>
                    <button
                      className="px-3 py-1 text-sm rounded-md bg-red-600/30 hover:bg-red-500/50 text-red-300 border border-red-500/30 transition-colors"
                      onClick={() => handleRemoveCounselor(counselor.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Custom Modal Implementation - Same as in the original component */}
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

                    <button
                      className="w-full py-2 rounded-md bg-red-600/30 hover:bg-red-500/50 text-red-300 border border-red-500/30 transition-colors"
                      onClick={() => handleRemoveCounselor(selectedCounselor.id)}
                    >
                      Remove Counselor
                    </button>
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

export default ApprovedCounselors

