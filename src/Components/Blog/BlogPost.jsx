
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getBlogForCareer } from "../../../backend/getBlog"

const BlogPost = ({ careerId }) => {
  const [blogData, setBlogData] = useState(null)
  const [activeIndex, setActiveIndex] = useState(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const fetchBlogData = async () => {
      const data = await getBlogForCareer(careerId)
      setBlogData(data)
    }
    fetchBlogData()
  }, [careerId])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!blogData) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen text-white bg-[#1c1c1c]">
      <motion.header
        className="w-full py-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto text-center mt-9">
          <h1 className="text-7xl md:text-6xl text-[#fcb326] font-bold mb-[7rem]">{blogData.title}</h1>
          <motion.div
            className="mb-[5rem] mt-9 p-8 bg-[#2a2a2a] rounded-lg shadow-lg border-2 border-[#fcb326]/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <blockquote className="text-4xl italic text-gray-300 mb-6 relative">
              <span className="absolute top-0 left-0 text-4xl text-[#fcb326]">"</span>
              <p className="ml-8">{blogData.quote}</p>
              <span className="absolute bottom-0 right-0 text-4xl text-[#fcb326]">"</span>
            </blockquote>
            <p className="text-right text-lg text-[#fcb326]">— {blogData.quoteAuth}</p>
          </motion.div>
          <p className="text-2xl text-gray-300">{blogData.data}</p>
        </div>
      </motion.header>

      <motion.div
        className="flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="w-1/4 h-px bg-[#fcb326]/30"></div>
        <p className="mx-4 text-xl text-[#fcb326]">By {blogData.author}</p>
        <div className="w-1/4 h-px bg-[#fcb326]/30"></div>
      </motion.div>

      <main className="w-full px-4 py-14">
        <div className="max-w-9xl mx-auto">
          <div className="space-y-8">
            {blogData.content.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#2a2a2a] rounded-xl p-6 border-2 border-[#fcb326]/20 hover:border-[#fcb326]/40 transition-colors"
              >
                <motion.button
                  className="w-full text-left focus:outline-none"
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className="text-[#fcb326] text-2xl font-bold">0{index + 1}</span>
                      <h3 className="text-3xl font-semibold text-white">{section.question}</h3>
                    </div>
                    <motion.div
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-8 h-8 rounded-full bg-[#fcb326]/10 flex items-center justify-center"
                    >
                      <span className="text-[#fcb326]">▼</span>
                    </motion.div>
                  </div>
                </motion.button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mt-6 pl-14">
                        <div className="h-px w-full bg-[#fcb326]/20 mb-6"></div>
                        <p className="text-xl text-gray-300 leading-relaxed">{section.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <motion.button
        className="fixed bottom-8 right-8 bg-[#fcb326] text-black p-4 rounded-full cursor-pointer shadow-lg hover:bg-[#fcb326]/90 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollY > 200 ? 1 : 0, y: scrollY > 200 ? 0 : 20 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </motion.button>
    </div>
  )
}

export default BlogPost

