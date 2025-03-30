"use client"

import { useState } from "react"
import { PlusCircle, Trash2, Edit2, Search, X, Plus, Database } from "lucide-react"

const defaultQuestion = {
  question: "",
  answer: "",
}

const emptyCareer = {
  careerId: "",
  careerName: "",
  author: "",
  content: [{ ...defaultQuestion }],
  data: "",
  quote: "",
  quoteAuth: "",
}

function CareersDashboard({ addCareer, updateCareer, deleteCareer, getCareer, loading = false }) {
  const [mode, setMode] = useState("idle")
  const [formData, setFormData] = useState({ ...emptyCareer })
  const [careerIdToFetch, setCareerIdToFetch] = useState("")
  const [currentCareer, setCurrentCareer] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ text: "", type: "" })

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle content (questions and answers) changes
  const handleContentChange = (index, field, value) => {
    const updatedContent = [...formData.content]
    updatedContent[index] = {
      ...updatedContent[index],
      [field]: value,
    }

    setFormData({
      ...formData,
      content: updatedContent,
    })
  }

  // Add a new question/answer pair
  const addQuestion = () => {
    setFormData({
      ...formData,
      content: [...formData.content, { ...defaultQuestion }],
    })
  }

  // Remove a question/answer pair
  const removeQuestion = (index) => {
    const updatedContent = formData.content.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      content: updatedContent,
    })
  }

  // Reset form
  const resetForm = () => {
    setFormData({ ...emptyCareer })
    setCurrentCareer(null)
    setCareerIdToFetch("")
    setMessage({ text: "", type: "" })
  }

  // Fetch career by ID
  const fetchCareer = async () => {
    if (!careerIdToFetch.trim()) {
      setMessage({ text: "Please enter a Career ID", type: "error" })
      return
    }

    setIsLoading(true)
    try {
      const career = await getCareer(careerIdToFetch)
      if (career) {
        setCurrentCareer(career)
        if (mode === "edit") {
          setFormData(career)
        }
        setMessage({ text: "Career found", type: "success" })
      } else {
        setCurrentCareer(null)
        setMessage({ text: "Career not found", type: "error" })
      }
    } catch (error) {
      console.error("Error fetching career:", error)
      setMessage({ text: "Error fetching career", type: "error" })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle form submission for add/edit
  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    try {
      if (mode === "edit" && currentCareer?.id) {
        // Update existing career
        await updateCareer(currentCareer.id, formData)
        setMessage({ text: "Career updated successfully", type: "success" })
      } else if (mode === "add") {
        // Add new career - generate a careerId if not provided
        if (!formData.careerId) {
          const generatedId =
            formData.careerName
              .toLowerCase()
              .replace(/\s+/g, "_")
              .replace(/[^a-z0-9_]/g, "") +
            "_" +
            Math.floor(Math.random() * 1000)
              .toString()
              .padStart(3, "0")

          await addCareer({
            ...formData,
            careerId: generatedId,
          })
        } else {
          await addCareer(formData)
        }
        setMessage({ text: "Career added successfully", type: "success" })
      }

      resetForm()
      setMode("idle")
    } catch (error) {
      console.error("Error saving career:", error)
      setMessage({ text: "Failed to save career", type: "error" })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle delete
  const handleDelete = async () => {
    if (!currentCareer?.id) {
      setMessage({ text: "No career selected to delete", type: "error" })
      return
    }

    if (!window.confirm(`Are you sure you want to delete the career: ${currentCareer.careerName}?`)) {
      return
    }

    setIsLoading(true)
    try {
      await deleteCareer(currentCareer.id)
      setMessage({ text: "Career deleted successfully", type: "success" })
      resetForm()
      setMode("idle")
    } catch (error) {
      console.error("Error deleting career:", error)
      setMessage({ text: "Failed to delete career", type: "error" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Careers Management</h1>
        <div className="flex gap-3">
          <button
            onClick={() => {
              resetForm()
              setMode(mode === "add" ? "idle" : "add")
            }}
            className={`flex items-center gap-2 px-4 py-2 ${mode === "add" ? "bg-gray-700" : "bg-purple-600"} text-white rounded-lg hover:bg-purple-700 transition-colors`}
          >
            {mode === "add" ? <X className="h-5 w-5" /> : <PlusCircle className="h-5 w-5" />}
            {mode === "add" ? "Cancel" : "Add Career"}
          </button>
          <button
            onClick={() => {
              resetForm()
              setMode(mode === "edit" ? "idle" : "edit")
            }}
            className={`flex items-center gap-2 px-4 py-2 ${mode === "edit" ? "bg-gray-700" : "bg-purple-600"} text-white rounded-lg hover:bg-purple-700 transition-colors`}
          >
            {mode === "edit" ? <X className="h-5 w-5" /> : <Edit2 className="h-5 w-5" />}
            {mode === "edit" ? "Cancel" : "Edit Career"}
          </button>
          <button
            onClick={() => {
              resetForm()
              setMode(mode === "delete" ? "idle" : "delete")
            }}
            className={`flex items-center gap-2 px-4 py-2 ${mode === "delete" ? "bg-gray-700" : "bg-purple-600"} text-white rounded-lg hover:bg-purple-700 transition-colors`}
          >
            {mode === "delete" ? <X className="h-5 w-5" /> : <Trash2 className="h-5 w-5" />}
            {mode === "delete" ? "Cancel" : "Delete Career"}
          </button>
        </div>
      </div>

      {/* Message display */}
      {message.text && (
        <div
          className={`rounded-lg border p-4 ${
            message.type === "success"
              ? "border-green-500/30 bg-green-500/10 text-green-400"
              : "border-red-500/30 bg-red-500/10 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Career ID Search (for Edit and Delete) */}
      {(mode === "edit" || mode === "delete") && (
        <div className="rounded-lg border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            {mode === "edit" ? "Edit Existing Career" : "Delete Existing Career"}
          </h2>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter Career ID to fetch..."
                value={careerIdToFetch}
                onChange={(e) => setCareerIdToFetch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              onClick={fetchCareer}
              disabled={isLoading}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Loading...
                </span>
              ) : (
                "Fetch Career"
              )}
            </button>
          </div>

          {currentCareer && (
            <div className="mt-4 p-4 rounded-lg border border-gray-700/50 bg-gray-700/20">
              <h3 className="font-medium text-white">{currentCareer.careerName}</h3>
              <p className="text-sm text-gray-300 mt-1">ID: {currentCareer.careerId}</p>
              <p className="text-sm text-gray-400 mt-2 line-clamp-2">{currentCareer.data}</p>

              {mode === "delete" && (
                <button
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Deleting..." : "Confirm Delete"}
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Career Form */}
      {(mode === "add" || (mode === "edit" && currentCareer)) && (
        <div className="rounded-lg border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            {mode === "edit" ? `Edit Career: ${currentCareer?.careerName}` : "Add New Career"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="careerName" className="block text-sm font-medium text-gray-300 mb-1">
                  Career Name
                </label>
                <input
                  type="text"
                  id="careerName"
                  name="careerName"
                  value={formData.careerName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g. Cloud Engineer"
                />
              </div>
              <div>
                <label htmlFor="careerId" className="block text-sm font-medium text-gray-300 mb-1">
                  Career ID
                </label>
                <input
                  type="text"
                  id="careerId"
                  name="careerId"
                  value={formData.careerId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g. cloud_engineer_001"
                  disabled={mode === "edit"}
                />
                {mode === "add" && <p className="text-xs text-gray-400 mt-1">Leave blank to auto-generate</p>}
              </div>
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div>
                <label htmlFor="quoteAuth" className="block text-sm font-medium text-gray-300 mb-1">
                  Quote Author
                </label>
                <input
                  type="text"
                  id="quoteAuth"
                  name="quoteAuth"
                  value={formData.quoteAuth}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g. Werner Vogels"
                />
              </div>
            </div>

            <div>
              <label htmlFor="data" className="block text-sm font-medium text-gray-300 mb-1">
                Career Description
              </label>
              <textarea
                id="data"
                name="data"
                value={formData.data}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Describe the career role and responsibilities..."
              />
            </div>

            <div>
              <label htmlFor="quote" className="block text-sm font-medium text-gray-300 mb-1">
                Quote
              </label>
              <textarea
                id="quote"
                name="quote"
                value={formData.quote}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="An inspiring quote about this career..."
              />
            </div>

            {/* Q&A Content Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">Questions & Answers</label>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" /> Add Question
                </button>
              </div>

              <div className="space-y-4">
                {formData.content.map((item, index) => (
                  <div key={index} className="border border-gray-700 rounded-md p-4 bg-gray-800/30">
                    <div className="flex justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-300">Question {index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeQuestion(index)}
                        className="text-gray-400 hover:text-red-500"
                        disabled={formData.content.length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <input
                          type="text"
                          value={item.question}
                          onChange={(e) => handleContentChange(index, "question", e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Enter question"
                          required
                        />
                      </div>
                      <div>
                        <textarea
                          value={item.answer}
                          onChange={(e) => handleContentChange(index, "answer", e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Enter answer"
                          rows={4}
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  resetForm()
                  setMode("idle")
                }}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    {mode === "edit" ? "Updating..." : "Adding..."}
                  </span>
                ) : mode === "edit" ? (
                  "Update Career"
                ) : (
                  "Add Career"
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Firebase Integration Guide */}
      {mode === "idle" && (
        <div className="rounded-lg border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Database className="h-6 w-6 text-purple-500" />
            <h2 className="text-xl font-semibold text-white">Keep your data updated</h2>
          </div>

          <p className="text-gray-300 mb-4">
            This careers management dashboard is ready to connect with Firebase. Select an action above to get started.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-gray-700/50 bg-gray-700/20 hover:bg-gray-700/40 transition-colors">
              <h3 className="font-medium text-white flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-purple-500" />
                Add Career
              </h3>
              <p className="text-sm text-gray-400 mt-2">
                Create new career entries with detailed information and Q&A content.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-gray-700/50 bg-gray-700/20 hover:bg-gray-700/40 transition-colors">
              <h3 className="font-medium text-white flex items-center gap-2">
                <Edit2 className="h-5 w-5 text-purple-500" />
                Edit Career
              </h3>
              <p className="text-sm text-gray-400 mt-2">
                Update existing career information by searching for a specific Career ID.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-gray-700/50 bg-gray-700/20 hover:bg-gray-700/40 transition-colors">
              <h3 className="font-medium text-white flex items-center gap-2">
                <Trash2 className="h-5 w-5 text-purple-500" />
                Delete Career
              </h3>
              <p className="text-sm text-gray-400 mt-2">
                Remove career entries that are no longer needed from the database.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CareersDashboard

