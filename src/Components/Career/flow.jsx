'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Book, Code, Lightbulb, Target, Award } from 'lucide-react'
import { db } from '../../../backend/firestore'
import { collection, query, where, getDocs } from 'firebase/firestore'

const Flowchart = ({ careerName }) => {
  const [careerInfo, setCareerInfo] = useState(null)

  useEffect(() => {
    const fetchCareerPath = async () => {
      try {
        const careersRef = collection(db, 'careers')
        const q = query(careersRef, where('careerName', '==', careerName))
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
          const careerData = querySnapshot.docs[0].data()
          if (careerData.careerPath) {
            setCareerInfo(careerData.careerPath)
          } else {
            throw new Error('Career path not found for this career')
          }
        } else {
          throw new Error('Career not found')
        }
      } catch (error) {
        console.error('Error fetching career path:', error)
      }
    }

    fetchCareerPath()
  }, [careerName])

  if (!careerInfo) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  const getIcon = (index) => {
    const icons = [Briefcase, Book, Code, Lightbulb, Target, Award]
    return icons[index % icons.length]
  }

  return (
    <section className="mt-20 px-4 md:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-5xl font-bold text-amber-400 mb-4">Career Roadmap</h2>
        <p className="text-gray-400 text-xl">Your path to success in {careerName}</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-12"
      >
        {careerInfo.map((step, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="relative bg-gray-800/50 backdrop-blur-sm border border-amber-400/20 rounded-xl p-6 shadow-lg"
          >
            {/* Step Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-gray-900 font-bold text-2xl shadow-lg">
                {index + 1}
              </div>
              <h3 className="text-3xl font-semibold text-amber-400">{step.level}</h3>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {step.options.map((option, optionIndex) => {
                const IconComponent = getIcon(optionIndex)
                return (
                  <motion.div
                    key={optionIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: optionIndex * 0.05 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-amber-600/10 rounded-lg blur group-hover:blur-md transition-all" />
                    <div className="relative bg-gray-800/90 backdrop-blur border border-amber-400/20 rounded-lg p-5 hover:border-amber-400/40 transition-all duration-300 h-full flex items-start gap-4">
                      <IconComponent className="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" />
                      <p className="text-gray-100 font-medium text-lg md:text-xl lg:text-xl">{option}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Connector Line */}
            {index < careerInfo.length - 1 && (
              <div className="absolute left-8 -bottom-12 w-[2px] h-12 bg-gradient-to-b from-amber-400/50 to-transparent" />
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default Flowchart

