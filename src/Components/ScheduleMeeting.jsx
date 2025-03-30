"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, query, where, doc, updateDoc, addDoc, Timestamp } from "firebase/firestore"
import { Calendar } from "react-calendar"
import { thirdDb } from "../../backend/firestore"

// You'll need to add the react-calendar CSS in your project
// Either import it in your global CSS or add it here
// import 'react-calendar/dist/Calendar.css'

function ScheduleMeeting() {
  const [counselors, setCounselors] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterExpertise, setFilterExpertise] = useState("all")
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedCounselor, setSelectedCounselor] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("bio")

  // Calendar and scheduling states
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState(null)
  const [availableTimeSlots, setAvailableTimeSlots] = useState([])
  const [schedulingStatus, setSchedulingStatus] = useState("idle") // idle, loading, success, error
  const [userEmail, setUserEmail] = useState("")
  const [userPhone, setUserPhone] = useState("")
  const [scheduledMeetings, setScheduledMeetings] = useState([])
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

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

  const openCounselorModal = async (counselor) => {
    setSelectedCounselor(counselor)
    setIsModalOpen(true)
    setActiveTab("bio")
    setSelectedDate(new Date())
    setSelectedTime(null)
    setSchedulingStatus("idle")

    // Fetch existing meetings for this counselor
    await fetchCounselorMeetings(counselor.id)

    // Generate available time slots for the selected date
    generateTimeSlots(new Date(), counselor.id)
  }

  const fetchCounselorMeetings = async (counselorId) => {
    try {
      const meetingsCollection = collection(thirdDb, "scheduledMeetings")
      const counselorMeetingsQuery = query(meetingsCollection, where("counselorId", "==", counselorId))
      const meetingsSnapshot = await getDocs(counselorMeetingsQuery)

      const meetings = meetingsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate(),
      }))

      setScheduledMeetings(meetings)
    } catch (error) {
      console.error("Error fetching counselor meetings:", error)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedCounselor(null)
    setSelectedDate(new Date())
    setSelectedTime(null)
    setSchedulingStatus("idle")
    setIsBookingModalOpen(false)
  }

  // Generate time slots in 15-minute increments from 9 AM to 6 PM
  const generateTimeSlots = (date, counselorId) => {
    const slots = []
    const selectedDateStr = date.toDateString()

    // Start at 9 AM
    const startHour = 9
    // End at 6 PM
    const endHour = 18

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`

        // Check if this slot is already booked
        const isBooked = scheduledMeetings.some((meeting) => {
          const meetingDate = new Date(meeting.date)
          return (
            meetingDate.toDateString() === selectedDateStr &&
            meetingDate.getHours() === hour &&
            meetingDate.getMinutes() === minute
          )
        })

        slots.push({
          time: timeString,
          isBooked,
        })
      }
    }

    setAvailableTimeSlots(slots)
  }

  const handleDateChange = (date) => {
    setSelectedDate(date)
    setSelectedTime(null)

    if (selectedCounselor) {
      generateTimeSlots(date, selectedCounselor.id)
    }
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
    setIsBookingModalOpen(true)
  }

  const handleScheduleMeeting = async () => {
    if (!selectedCounselor || !selectedDate || !selectedTime || !userEmail) {
      alert("Please fill in all required fields")
      return
    }

    setSchedulingStatus("loading")

    try {
      // Create a date object for the selected date and time
      const [hours, minutes] = selectedTime.split(":").map(Number)
      const meetingDate = new Date(selectedDate)
      meetingDate.setHours(hours, minutes, 0, 0)

      // Generate a Google Meet link (in a real app, you would use the Google Calendar API)
      const meetingId = Math.random().toString(36).substring(2, 12)
      const meetLink = `https://meet.google.com/${meetingId}`

      // Store the meeting in Firebase
      const meetingsCollection = collection(thirdDb, "scheduledMeetings")
      await addDoc(meetingsCollection, {
        counselorId: selectedCounselor.id,
        counselorName: selectedCounselor.name,
        counselorEmail: selectedCounselor.email,
        userEmail: userEmail,
        userPhone: userPhone || null,
        date: Timestamp.fromDate(meetingDate),
        meetLink: meetLink,
        status: "scheduled",
        createdAt: Timestamp.now(),
      })

      // Update the available time slots
      await fetchCounselorMeetings(selectedCounselor.id)
      generateTimeSlots(selectedDate, selectedCounselor.id)

      setSchedulingStatus("success")

      // Close the booking modal after a delay
      setTimeout(() => {
        setIsBookingModalOpen(false)
        setActiveTab("meetings")
      }, 2000)
    } catch (error) {
      console.error("Error scheduling meeting:", error)
      setSchedulingStatus("error")
    }
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

  // Format date for display
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
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
        <h1 className="text-2xl font-bold text-white">Schedule a Meeting with a Counselor</h1>

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
              className="rounded-lg border border-gray-700 bg-gray-800/50 backdrop-blur-sm overflow-hidden hover:border-purple-500/50 transition-all duration-300 animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => openCounselorModal(counselor)}
            >
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-purple-500 flex-shrink-0">
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
                  <div>
                    <h2 className="text-lg font-semibold text-white">{counselor.name}</h2>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-purple-500/20 text-purple-400 border border-purple-500/30">
                      {counselor.expertise || "General Counseling"}
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
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

                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {counselor.bio || "No bio information provided."}
                  </p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="text-purple-400 font-medium">
                    ${counselor.feeAmount || counselor.consultationFees || "N/A"}
                    <span className="text-gray-500 text-xs">/session</span>
                  </div>
                  <button className="px-3 py-1 text-sm rounded-md bg-purple-600 hover:bg-purple-500 text-white transition-colors">
                    Schedule Meeting
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Counselor Modal with Calendar */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div
            id="counselor-modal"
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-lg bg-gray-900 border border-gray-700 text-white shadow-xl"
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900">
              <h2 className="text-xl font-bold text-white">Schedule a Meeting with {selectedCounselor.name}</h2>
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
                <div>
                  {/* Tabs */}
                  <div className="flex border-b border-gray-700 mb-6">
                    <button
                      className={`px-4 py-2 text-sm font-medium ${
                        activeTab === "bio"
                          ? "text-purple-400 border-b-2 border-purple-400"
                          : "text-gray-400 hover:text-white"
                      }`}
                      onClick={() => setActiveTab("bio")}
                    >
                      Counselor Info
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium ${
                        activeTab === "schedule"
                          ? "text-purple-400 border-b-2 border-purple-400"
                          : "text-gray-400 hover:text-white"
                      }`}
                      onClick={() => setActiveTab("schedule")}
                    >
                      Schedule Meeting
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium ${
                        activeTab === "meetings"
                          ? "text-purple-400 border-b-2 border-purple-400"
                          : "text-gray-400 hover:text-white"
                      }`}
                      onClick={() => setActiveTab("meetings")}
                    >
                      Your Meetings
                    </button>
                  </div>

                  {/* Counselor Info Tab */}
                  {activeTab === "bio" && (
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
                          className="w-full py-2 rounded-md bg-purple-600 hover:bg-purple-500 text-white transition-colors"
                          onClick={() => setActiveTab("schedule")}
                        >
                          Schedule a Meeting
                        </button>
                      </div>

                      {/* Right Column - Bio */}
                      <div className="md:col-span-2">
                        <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 mb-6">
                          <h3 className="text-lg font-medium mb-2">About {selectedCounselor.name}</h3>
                          <p className="text-gray-300 whitespace-pre-line">
                            {selectedCounselor.bio || "No bio information provided."}
                          </p>
                        </div>

                        <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
                          <h3 className="text-lg font-medium mb-2">Qualifications</h3>
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-400">Qualification</h4>
                              <p className="text-white">{selectedCounselor.qualification || "Not specified"}</p>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium text-gray-400">Specialization</h4>
                              <p className="text-white">{selectedCounselor.specialization || "Not specified"}</p>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium text-gray-400">Certifications</h4>
                              <p className="text-white whitespace-pre-line">
                                {selectedCounselor.certifications || "None provided"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Schedule Meeting Tab */}
                  {activeTab === "schedule" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Calendar Column */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Select a Date</h3>
                        <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
                          {/* Custom styling for the calendar to match dark theme */}
                          <div className="calendar-container dark">
                            <Calendar
                              onChange={handleDateChange}
                              value={selectedDate}
                              minDate={new Date()}
                              className="bg-gray-800 text-white border-gray-700 rounded-lg"
                              tileClassName="text-white hover:bg-purple-500/20"
                              prevLabel={<span className="text-gray-400">←</span>}
                              nextLabel={<span className="text-gray-400">→</span>}
                            />
                          </div>
                        </div>
                        <div className="text-center text-gray-400">
                          <p>Selected date: {formatDate(selectedDate)}</p>
                        </div>
                      </div>

                      {/* Time Slots Column */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Select a Time</h3>
                        <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 max-h-[400px] overflow-y-auto">
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {availableTimeSlots.map((slot, index) => (
                              <button
                                key={index}
                                className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                                  slot.isBooked
                                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                                    : selectedTime === slot.time
                                      ? "bg-purple-600 text-white"
                                      : "bg-gray-700 text-white hover:bg-purple-500/20"
                                }`}
                                onClick={() => !slot.isBooked && handleTimeSelect(slot.time)}
                                disabled={slot.isBooked}
                              >
                                {slot.time}
                                {slot.isBooked && <span className="block text-xs text-gray-500">Booked</span>}
                              </button>
                            ))}
                          </div>
                        </div>

                        {selectedTime && (
                          <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
                            <h4 className="text-md font-medium mb-2">Meeting Details</h4>
                            <p className="text-gray-300 mb-4">
                              You're scheduling a meeting with{" "}
                              <span className="text-purple-400">{selectedCounselor.name}</span> on{" "}
                              <span className="text-purple-400">{formatDate(selectedDate)}</span> at{" "}
                              <span className="text-purple-400">{selectedTime}</span>.
                            </p>
                            <button
                              className="w-full py-2 rounded-md bg-purple-600 hover:bg-purple-500 text-white transition-colors"
                              onClick={() => setIsBookingModalOpen(true)}
                            >
                              Confirm & Book Meeting
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Your Meetings Tab */}
                  {activeTab === "meetings" && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Your Scheduled Meetings</h3>

                      {scheduledMeetings.length === 0 ? (
                        <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 text-center">
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
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-lg font-medium text-gray-400">No meetings scheduled</p>
                          <p className="mt-1 text-gray-500">Schedule a meeting to see it here</p>
                          <button
                            className="mt-4 px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-500 text-white transition-colors"
                            onClick={() => setActiveTab("schedule")}
                          >
                            Schedule a Meeting
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {scheduledMeetings.map((meeting) => (
                            <div key={meeting.id} className="rounded-lg border border-gray-700 bg-gray-800 p-4">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                  <h4 className="text-md font-medium">Meeting with {meeting.counselorName}</h4>
                                  <p className="text-gray-400">
                                    {new Intl.DateTimeFormat("en-US", {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                      hour: "numeric",
                                      minute: "numeric",
                                      hour12: true,
                                    }).format(meeting.date)}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <a
                                    href={meeting.meetLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1 rounded-md bg-green-600/30 text-green-300 border border-green-500/30 hover:bg-green-500/50 transition-colors text-sm"
                                  >
                                    Join Meeting
                                  </a>
                                  <button
                                    className="px-3 py-1 rounded-md bg-red-600/30 text-red-300 border border-red-500/30 hover:bg-red-500/50 transition-colors text-sm"
                                    onClick={async () => {
                                      try {
                                        // Update the meeting status to cancelled
                                        const meetingRef = doc(thirdDb, "scheduledMeetings", meeting.id)
                                        await updateDoc(meetingRef, {
                                          status: "cancelled",
                                        })

                                        // Remove from the list
                                        setScheduledMeetings(scheduledMeetings.filter((m) => m.id !== meeting.id))

                                        // Regenerate time slots
                                        generateTimeSlots(selectedDate, selectedCounselor.id)
                                      } catch (error) {
                                        console.error("Error cancelling meeting:", error)
                                        alert("Failed to cancel meeting. Please try again.")
                                      }
                                    }}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Booking Confirmation Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70">
          <div className="relative w-full max-w-md rounded-lg bg-gray-900 border border-gray-700 text-white shadow-xl p-6">
            <h3 className="text-lg font-medium mb-4">Complete Your Booking</h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="userEmail" className="block text-sm font-medium text-gray-400 mb-1">
                  Your Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="userEmail"
                  className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="userPhone" className="block text-sm font-medium text-gray-400 mb-1">
                  Your Phone Number (optional)
                </label>
                <input
                  type="tel"
                  id="userPhone"
                  className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your phone number"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                />
              </div>

              <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-3">
                <h4 className="text-sm font-medium text-gray-300">Meeting Details</h4>
                <p className="text-sm text-gray-400 mt-1">Counselor: {selectedCounselor.name}</p>
                <p className="text-sm text-gray-400">Date: {formatDate(selectedDate)}</p>
                <p className="text-sm text-gray-400">Time: {selectedTime}</p>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  className="flex-1 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                  onClick={() => setIsBookingModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className={`flex-1 py-2 rounded-md text-white transition-colors ${
                    schedulingStatus === "loading"
                      ? "bg-purple-700 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-500"
                  }`}
                  onClick={handleScheduleMeeting}
                  disabled={schedulingStatus === "loading"}
                >
                  {schedulingStatus === "loading" ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Booking...
                    </span>
                  ) : schedulingStatus === "success" ? (
                    <span className="flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      Booked!
                    </span>
                  ) : (
                    "Book Meeting"
                  )}
                </button>
              </div>

              {schedulingStatus === "error" && (
                <p className="text-red-400 text-sm text-center mt-2">
                  There was an error scheduling your meeting. Please try again.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for Calendar */}
      <style jsx>{`
        /* Custom styles for react-calendar in dark mode */
        .calendar-container.dark .react-calendar {
          width: 100%;
          background-color: #1f2937;
          color: white;
          border-radius: 0.5rem;
          border: 1px solid #374151;
          font-family: inherit;
        }
        
        .calendar-container.dark .react-calendar__navigation button {
          color: white;
          min-width: 44px;
          background: none;
          font-size: 16px;
          margin-top: 8px;
        }
        
        .calendar-container.dark .react-calendar__navigation button:enabled:hover,
        .calendar-container.dark .react-calendar__navigation button:enabled:focus {
          background-color: rgba(139, 92, 246, 0.2);
          border-radius: 0.375rem;
        }
        
        .calendar-container.dark .react-calendar__navigation button[disabled] {
          background-color: #111827;
          color: #6b7280;
        }
        
        .calendar-container.dark .react-calendar__month-view__weekdays {
          text-align: center;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 0.75rem;
          color: #9ca3af;
          padding: 0.5rem 0;
        }
        
        .calendar-container.dark .react-calendar__month-view__weekdays__weekday {
          padding: 0.5rem;
        }
        
        .calendar-container.dark .react-calendar__month-view__weekdays__weekday abbr {
          text-decoration: none;
        }
        
        .calendar-container.dark .react-calendar__tile {
          max-width: 100%;
          padding: 10px 6.6667px;
          background: none;
          text-align: center;
          line-height: 16px;
          color: white;
          border-radius: 0.375rem;
        }
        
        .calendar-container.dark .react-calendar__tile:enabled:hover,
        .calendar-container.dark .react-calendar__tile:enabled:focus {
          background-color: rgba(139, 92, 246, 0.2);
        }
        
        .calendar-container.dark .react-calendar__tile--now {
          background-color: rgba(139, 92, 246, 0.3);
        }
        
        .calendar-container.dark .react-calendar__tile--now:enabled:hover,
        .calendar-container.dark .react-calendar__tile--now:enabled:focus {
          background-color: rgba(139, 92, 246, 0.4);
        }
        
        .calendar-container.dark .react-calendar__tile--active {
          background-color: #8b5cf6;
          color: white;
        }
        
        .calendar-container.dark .react-calendar__tile--active:enabled:hover,
        .calendar-container.dark .react-calendar__tile--active:enabled:focus {
          background-color: #7c3aed;
        }
        
        .calendar-container.dark .react-calendar__tile--disabled {
          background-color: #111827;
          color: #6b7280;
        }
      `}</style>
    </div>
  )
}

export default ScheduleMeeting

