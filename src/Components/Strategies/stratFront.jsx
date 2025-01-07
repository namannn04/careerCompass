import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";

const stratFront = () => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  const handleHover = () => {
    setIsHovered(!isHovered);
    controls.start(isHovered ? "initial" : "hover");
  };

  const buttonVariants = {
    initial: { scale: 1, boxShadow: "0px 0px 8px rgb(109, 40, 217)" },
    hover: { scale: 1.05, boxShadow: "0px 0px 20px rgb(109, 40, 217)" },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            backgroundSize: ["100% 100%", "200% 200%"],
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 bg-white rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
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
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl -mt-16 md:mt-0 font-extrabold mb-6 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Elevate Your Strategy
        </motion.h1>
        <motion.p
          className="text-xl sm:text-2xl md:text-3xl mb-8 text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          Unlock your potential with cutting-edge tactics for success
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        >
          <a href="#strat">
            <motion.button
              className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300"
              variants={buttonVariants}
              initial="initial"
              animate={controls}
              onHoverStart={handleHover}
              onHoverEnd={handleHover}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </a>
        </motion.div>
      </div>

      {/* Animated shapes */}
      <motion.div
        className="absolute bottom-3 left-3 w-40 h-40 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full filter blur-3xl opacity-50"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute top-[6.5rem] right-0 w-60 h-60 bg-gradient-to-bl from-[#fcb326] to-[#fcb326] rounded-full filter blur-3xl opacity-50"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-24 sm:h-32 md:h-40 lg:h-48"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="rgba(255, 255, 255, 0.05)"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default stratFront;
