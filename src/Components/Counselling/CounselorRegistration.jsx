"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Calendar,
  Award,
  Briefcase,
  FileText,
  User,
  Mail,
  Phone,
  Linkedin,
  DollarSign,
  LinkIcon,
  Image,
  Loader2,
} from "lucide-react"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import Textarea from "../ui/Textarea"
import { Label } from "../ui/Label"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { thirdDb } from "../../../backend/firestore"

export default function CounselorRegistration() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: "" })
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    profilePictureUrl: "",
    qualification: "",
    experience: "",
    specialization: "",
    certifications: "",
    idProofUrl: "",
    degreeUploadUrl: "",
    availabilitySlots: "",
    consultationFees: "",
    feeAmount: "",
    linkedinProfile: "",
    testimonials: "",
    bio: "",
  })

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => {
    setIsModalOpen(false)
    setSubmitStatus({ success: false, message: "" })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Add timestamp to the form data
      const dataToSubmit = {
        ...formData,
        createdAt: serverTimestamp(), // Using server timestamp for more accuracy
        updatedAt: serverTimestamp(),
      }

      // Add document to Firestore using thirdDb
      const docRef = await addDoc(collection(thirdDb, "counselorRegistrations"), dataToSubmit)

      // Log the saved data and document ID
      console.log("Document written with ID: ", docRef.id)
      console.log("Saved counselor data:", dataToSubmit)

      // Show success message
      setSubmitStatus({
        success: true,
        message: "Registration submitted successfully! We'll review your application and get back to you soon.",
      })

      // Clear form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        profilePictureUrl: "",
        qualification: "",
        experience: "",
        specialization: "",
        certifications: "",
        idProofUrl: "",
        degreeUploadUrl: "",
        availabilitySlots: "",
        consultationFees: "",
        feeAmount: "",
        linkedinProfile: "",
        testimonials: "",
        bio: "",
      })

      // Close modal after 3 seconds on success
      setTimeout(() => {
        closeModal()
      }, 3000)
    } catch (error) {
      console.error("Error adding document: ", error)
      setSubmitStatus({
        success: false,
        message: "An error occurred while submitting your registration. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl shadow-2xl">
          <div className="grid md:grid-cols-2">
            <div className="bg-gradient-to-br from-[#875BC9] to-[#6a46a3] p-10 text-white relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#9c6fe0] rounded-full opacity-10 -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#fcb326] rounded-full opacity-10 -ml-20 -mb-20"></div>

              <div className="relative z-10">
                <div className="inline-block rounded-full bg-[#fcb326]/20 px-4 py-1 text-sm font-medium text-[#fcb326] mb-4">
                  Join Our Team
                </div>
                <h2 className="mb-4 text-4xl font-bold md:text-5xl leading-tight">
                  Become a <span className="text-[#fcb326]">Counselor</span>
                </h2>
                <p className="mb-8 opacity-90 text-lg">
                  Share your expertise and guide students toward their dream careers. Make a real difference in their
                  academic journey.
                </p>
                <div className="mb-10 space-y-5">
                  {[
                    "Connect with students seeking guidance",
                    "Flexible working hours",
                    "Competitive compensation",
                    "Build your professional network",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <span className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#fcb326] text-[#875BC9] font-bold shadow-lg">
                        ✓
                      </span>
                      <span className="text-lg">{item}</span>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={openModal}
                  size="lg"
                  className="bg-[#fcb326] text-black font-semibold hover:bg-[#fcb326]/90 transition-all duration-300 transform hover:scale-105 hover:shadow-xl px-8 py-6 text-lg rounded-xl"
                >
                  Register as a Counselor
                </Button>
              </div>
            </div>
            <div className="bg-white p-0 relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                alt="Counselor illustration"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">Expert Guidance</h3>
                  <p className="opacity-90">Help shape the future of students with your knowledge and experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-black p-8 text-white shadow-2xl"
            >
              <div className="mb-8 flex items-center justify-between border-b border-gray-800 pb-4">
                <h3 className="text-3xl font-bold text-[#fcb326]">Counselor Registration</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeModal}
                  className="text-gray-300 hover:bg-gray-800 hover:text-white rounded-full"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {submitStatus.message && (
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    submitStatus.success ? "bg-green-900/50 text-green-300" : "bg-red-900/50 text-red-300"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information Section */}
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-[#875BC9]">Personal Information</h4>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-3">
                      <Label htmlFor="fullName" className="text-gray-300">
                        <User className="mr-2 inline-block h-4 w-4" />
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="border-gray-700 bg-gray-900 text-white"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-gray-300">
                        <Mail className="mr-2 inline-block h-4 w-4" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="border-gray-700 bg-gray-900 text-white"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-gray-300">
                        <Phone className="mr-2 inline-block h-4 w-4" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="border-gray-700 bg-gray-900 text-white"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="profilePictureUrl" className="text-gray-300">
                        <Image className="mr-2 inline-block h-4 w-4" />
                        Profile Picture URL
                      </Label>
                      <Input
                        id="profilePictureUrl"
                        name="profilePictureUrl"
                        type="url"
                        placeholder="https://example.com/your-image.jpg"
                        value={formData.profilePictureUrl}
                        onChange={handleInputChange}
                        className="border-gray-700 bg-gray-900 text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Information Section */}
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-[#875BC9]">Professional Information</h4>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-3">
                      <Label htmlFor="qualification" className="text-gray-300">
                        <Award className="mr-2 inline-block h-4 w-4" />
                        Qualification (Degrees, Certifications)
                      </Label>
                      <Input
                        id="qualification"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleInputChange}
                        required
                        className="border-gray-700 bg-gray-900 text-white"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="experience" className="text-gray-300">
                        <Briefcase className="mr-2 inline-block h-4 w-4" />
                        Years of Experience
                      </Label>
                      <Input
                        id="experience"
                        name="experience"
                        type="number"
                        value={formData.experience}
                        onChange={handleInputChange}
                        required
                        className="border-gray-700 bg-gray-900 text-white"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="specialization" className="text-gray-300">
                        Specialization
                      </Label>
                      <Input
                        id="specialization"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                        placeholder="Engineering, Medical, Government Jobs, etc."
                        required
                        className="border-gray-700 bg-gray-900 text-white"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="certifications" className="text-gray-300">
                        <FileText className="mr-2 inline-block h-4 w-4" />
                        Certifications (if any)
                      </Label>
                      <Input
                        id="certifications"
                        name="certifications"
                        value={formData.certifications}
                        onChange={handleInputChange}
                        className="border-gray-700 bg-gray-900 text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Documents Section */}
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-[#875BC9]">Documents</h4>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-3">
                      <Label htmlFor="idProofUrl" className="text-gray-300">
                        <LinkIcon className="mr-2 inline-block h-4 w-4" />
                        Government ID Proof URL
                      </Label>
                      <Input
                        id="idProofUrl"
                        name="idProofUrl"
                        type="url"
                        placeholder="https://example.com/your-id-proof.jpg"
                        value={formData.idProofUrl}
                        onChange={handleInputChange}
                        required
                        className="border-gray-700 bg-gray-900 text-white"
                      />
                      <p className="text-xs text-gray-400">Link to your Aadhaar, Passport, PAN Card, etc.</p>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="degreeUploadUrl" className="text-gray-300">
                        <LinkIcon className="mr-2 inline-block h-4 w-4" />
                        Degree/Certificate URL
                      </Label>
                      <Input
                        id="degreeUploadUrl"
                        name="degreeUploadUrl"
                        type="url"
                        placeholder="https://example.com/your-degree.pdf"
                        value={formData.degreeUploadUrl}
                        onChange={handleInputChange}
                        required
                        className="border-gray-700 bg-gray-900 text-white"
                      />
                    </div>

                    <div className="space-y-3 md:col-span-2">
                      <Label htmlFor="availabilitySlots" className="text-gray-300">
                        <Calendar className="mr-2 inline-block h-4 w-4" />
                        Availability Slots
                      </Label>
                      <Textarea
                        id="availabilitySlots"
                        name="availabilitySlots"
                        value={formData.availabilitySlots}
                        onChange={handleInputChange}
                        placeholder="E.g., Mon-Fri: 4PM-8PM, Sat: 10AM-2PM"
                        required
                        className="border-gray-700 bg-gray-900 text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information Section */}
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-[#875BC9]">Additional Information</h4>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-3">
                      <Label htmlFor="consultationFees" className="text-gray-300">
                        <DollarSign className="mr-2 inline-block h-4 w-4" />
                        Consultation Fees
                      </Label>
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          id="consultationFees"
                          name="consultationFees"
                          value={formData.consultationFees}
                          onChange={handleInputChange}
                          placeholder="Free/Paid"
                          className="border-gray-700 bg-gray-900 text-white"
                        />
                        <Input
                          id="feeAmount"
                          name="feeAmount"
                          type="number"
                          placeholder="Amount (if paid)"
                          value={formData.feeAmount}
                          onChange={handleInputChange}
                          className="border-gray-700 bg-gray-900 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="linkedinProfile" className="text-gray-300">
                        <Linkedin className="mr-2 inline-block h-4 w-4" />
                        LinkedIn Profile
                      </Label>
                      <Input
                        id="linkedinProfile"
                        name="linkedinProfile"
                        value={formData.linkedinProfile}
                        onChange={handleInputChange}
                        placeholder="https://linkedin.com/in/yourprofile"
                        className="border-gray-700 bg-gray-900 text-white"
                      />
                    </div>

                    <div className="space-y-3 md:col-span-2">
                      <Label htmlFor="testimonials" className="text-gray-300">
                        Previous Work/Testimonials
                      </Label>
                      <Textarea
                        id="testimonials"
                        name="testimonials"
                        value={formData.testimonials}
                        onChange={handleInputChange}
                        className="border-gray-700 bg-gray-900 text-white"
                      />
                    </div>

                    <div className="space-y-3 md:col-span-2">
                      <Label htmlFor="bio" className="text-gray-300">
                        Short Bio/Introduction
                      </Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        required
                        className="border-gray-700 bg-gray-900 text-white min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-800">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#fcb326] px-10 py-6 font-semibold text-black hover:bg-[#fcb326]/90 text-lg rounded-xl disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Send Request"
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

