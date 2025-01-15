'use client'

import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { motion } from "framer-motion"
import { Lightbulb, Book, GraduationCap } from 'lucide-react'
import blogData from "../Blog/blogData"
import BlogPost from "../Blog/BlogPost"
import Flowchart from "./flow"
import Navbar from "../Navbar"
import Footer from "../Footer/Footer"
import { db } from '../../../backend/firestore'
import { collection, query, where, getDocs } from 'firebase/firestore'

import 'swiper/css'
import 'swiper/css/autoplay'

export default function CareerDetail() {
  const { careerName } = useParams()
  const [career, setCareer] = useState(null)
  const [showBlog, setShowBlog] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCareerData = async () => {
      try {
        const careersRef = collection(db, 'careers')
        const q = query(careersRef, where('careerName', '==', careerName))
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
          setCareer(querySnapshot.docs[0].data())
        } else {
          setError(`Career "${careerName}" not found. Please check the URL and try again.`)
        }
      } catch (error) {
        setError('An error occurred while fetching the career data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchCareerData()
  }, [careerName])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="bg-red-500/10 p-6 rounded-lg border border-red-500/20">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-gray-100">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-7xl font-bold text-center mt-9 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-600"
        >
          {careerName}
        </motion.h1>

        <Flowchart careerName={careerName} />

        {/* Resources Section */}
        <section className="mt-20">
          <h2 className="text-5xl font-semibold mb-8 flex items-center gap-3">
            <Book className="w-8 h-8 text-amber-400" />
            Learning Resources
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Online Resources */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur"
            >
              <h3 className="text-2xl font-medium mb-4 text-amber-400">Online Resources</h3>
              <div className="space-y-3">
                {career.resources?.online?.map((resource, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer"
                  >
                    {resource}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Offline Resources */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur"
            >
              <h3 className="text-2xl font-medium mb-4 text-amber-400">Offline Resources</h3>
              <div className="space-y-3">
                {career.resources?.offline?.map((resource, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer"
                  >
                    {resource}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mt-20">
          <h2 className="text-5xl font-semibold mb-8 flex items-center gap-3">
            <GraduationCap className="w-10 h-10 text-amber-400" />
            Required Skills
          </h2>

          {career.skillsRequired && career.skillsRequired.length > 0 ? (
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={3}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              grabCursor={true}
              className="py-4"
            >
              {career.skillsRequired.map((skill, index) => (
                <SwiperSlide key={index}>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800 p-6 rounded-xl border border-amber-400/20 backdrop-blur hover:border-amber-400/40 transition-colors"
                  >
                    <div className="text-lg font-medium text-center">{skill}</div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="text-center text-gray-400">No skills data available.</div>
          )}
        </section>

        {/* Blog Section */}
        <section className="mt-20 text-center">
          <button
            onClick={() => setShowBlog(!showBlog)}
            className="px-8 py-3 bg-[#875BC9] rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            {showBlog ? "Hide Blog" : "Read the Blog"}
          </button>

          {showBlog && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <BlogPost
                title={blogData.title}
                author={blogData.author}
                career={careerName}
                data={blogData.data}
                content={blogData.content}
                quote={blogData.quote}
                quoteAuth={blogData.quoteAuth}
              />
            </motion.div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}

