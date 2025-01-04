"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const stratFront = () => {
  const controls = useAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculateDistance = (x, y) => {
    const dx = x - mousePosition.x;
    const dy = y - mousePosition.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Animated particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-blue-500 rounded-full"
          animate={{
            x: [0, Math.random() * window.innerWidth],
            y: [0, Math.random() * window.innerHeight],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Main content */}
      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 text-white"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          Elevate Your Strategy
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-200 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Unlock your potential with cutting-edge tactics for success
        </motion.p>
        <motion.button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full text-base sm:text-lg transition duration-300 ease-in-out transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </motion.div>

      {/* Animated circles */}
      {Array.from({ length: 3 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full border-2 border-blue-500 opacity-20"
          style={{
            width: `${(index + 1) * 100}px`,
            height: `${(index + 1) * 100}px`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20 + index * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Interactive light effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 50%)`,
        }}
      />

      {/* Floating elements */}
      {["🚀", "💡", "📊", "🎯"].map((emoji, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl sm:text-3xl md:text-4xl"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: mousePosition.x + (Math.random() - 0.5) * 100,
            y: mousePosition.y + (Math.random() - 0.5) * 100,
            rotate: Math.random() * 360,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 10,
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default stratFront;
