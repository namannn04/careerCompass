import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BlogPost = ({ title, author, data, content, quote, quoteAuth, head }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-white">
      
      <motion.header 
        className="w-full  py-16 "
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto text-center mt-9">
          <h1 className="text-7xl md:text-6xl text-[#fcb326] font-bold mb-[7rem]">{title}</h1>
          <motion.div 
            className="mb-[5rem] mt-9 p-8 bg-gray-800 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <blockquote className="text-4xl italic text-gray-300 mb-6 relative">
              <span className="absolute top-0 left-0 text-4xl text-gray-300">"</span>
              <p className="ml-8">{quote}</p>
              <span className="absolute bottom-0 right-0 text-4xl text-gray-300">"</span>
            </blockquote>
            <p className="text-right text-lg text-gray-300">— {quoteAuth}</p>
          </motion.div>
          <p className="text-2xl ">{data}</p>
        </div>
      </motion.header>
      <motion.div
            className=" flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="w-1/4 h-px bg-gray-600"></div>
            <p className="mx-4 text-xl text-gray-400">By {author}</p>
            <div className="w-1/4 h-px bg-gray-600"></div>
          </motion.div>
      <main className="w-full px-4 py-14">
        <div className="max-w-9xl mx-auto">
          <motion.div
            className="mb-[7rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
          </motion.div>

          <div className="space-y-8 bg-gray-900 px-12 py-12 rounded-3xl">
            {content.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border-b-[4px] border-gray-800 pb-9"
              >
                <motion.button
                  className="w-full text-left focus:outline-none"
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-3xl font-semibold">{section.question}</h3>
                    <motion.span
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-gray-400"
                    >
                      ▼
                    </motion.span>
                  </div>
                </motion.button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mt-4">
                        <p className="text-2xl text-gray-300 mt-9 mb-3 leading-relaxed">{section.answer}</p>
                        {section.imageUrl && (
                          <motion.img
                            src={section.imageUrl}
                            alt=""
                            className="w-full h-auto object-cover rounded-lg shadow-lg"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                          />
                        )}
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
        className="fixed bottom-8 right-8 bg-white text-black p-4 rounded-full cursor-pointer shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollY > 200 ? 1 : 0, y: scrollY > 200 ? 0 : 20 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </motion.button>
    </div>
  );
};

export default BlogPost;