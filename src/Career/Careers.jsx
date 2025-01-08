import React from "react";
import { motion } from "framer-motion";
import mainImage from "./main.png";
import careerData from "./careerData";
import { Link } from "react-router-dom";
import "./career.css";
import "./subCar.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer/Footer";
import { ArrowRight, Search, BookOpen, Users } from "lucide-react";

const Career = () => {
  const CareerCard = ({ id, category, image, careers }) => (
    <div className="relative w-full h-96 bg-white rounded-lg overflow-hidden group">
      <img src={image} alt={category} className="w-full h-full object-cover" />

      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-[#fcb326] text-2xl font-bold transition-opacity duration-300 group-hover:opacity-0">
        {category}
      </div>

      {/* Hover Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-0 bg-black bg-opacity-85 text-white flex flex-col justify-center items-center p-4 transition-all duration-300 group-hover:h-3/4 group-hover:opacity-100 opacity-0">
        <h2 className="text-2xl font-bold mb-3">{category}</h2>
        <div className="grid grid-cols-2 gap-2">
          {careers.slice(0, 3).map((career, index) => (
            <div
              key={index}
              className="bg-gray-800 bg-opacity-75 rounded-full px-3 py-1 text-lg text-[#fcb326]"
            >
              {career}
            </div>
          ))}
        </div>
        <Link to={`/category/${id}`}>
          <button className="bg-[#4ded62] text-xl px-3 h-10 w-32 mt-7 rounded-3xl text-black">
            Explore
          </button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navbar />
      {[...Array(50)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 bg-blue-400 rounded-full"
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
      {/* Animated background */}
      <div className="mt-20 absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            backgroundSize: ["100% 100%", "200% 200%"],
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M30 0l15 15H15L30 0zm0 60l15-15H15L30 60zm30-30L45 15v30L60 30zM0 30l15 15V15L0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 mt-20 pt-20 pb-32 md:pt-32 md:pb-40 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-36"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-8xl font-extrabold mb-6  text-[#fcb326]">
              Discover Your Dream Career
            </h1>
            <p className="text-xl md:text-2xl  max-w-3xl mx-auto mb-8">
              Explore endless possibilities and find the perfect path that
              aligns with your passions and skills.
            </p>
            <a href="#careers">
              <motion.div
                className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-blue-700 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Exploring
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.div>
            </a>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div
              className="md:w-1/2 mb-8 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <img
                src={mainImage}
                alt="Career exploration"
                className="max-w-[35rem] h-auto"
              />
            </motion.div>
            <motion.div
              className="md:w-1/2 md:pl-12"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-[#fcb326]">
                Your Journey Begins Here
              </h2>
              <p className="text-lg text-white mb-8">
                Our interactive career explorer helps you navigate the vast
                landscape of professional opportunities. Discover insights,
                requirements, and pathways for countless careers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <Search className="text-blue-600 h-8 w-8 mr-4" />
                  <div>
                    <h3 className="font-semibold text-[#fcb326]">
                      Explore Options
                    </h3>
                    <p className="text-white">
                      Browse through diverse career paths
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BookOpen className="text-blue-600 h-8 w-8 mr-4" />
                  <div>
                    <h3 className="font-semibold text-[#fcb326]">
                      Learn Skills
                    </h3>
                    <p className="text-white">
                      Discover required skills and education
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="text-blue-600 h-8 w-8 mr-4" />
                  <div>
                    <h3 className="font-semibold text-[#fcb326]">Roadmap</h3>
                    <p className="text-white">
                      Explore step by step path of your field
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      {[...Array(50)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 bg-blue-400 rounded-full"
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

      <motion.div
        className="byLine bg-blue-600 text-white p-4 text-center text-3xl font-semibold"
        id="careers"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
      >
        One Click to Success: Explore Your Ideal Career Now!
      </motion.div>

      <div className="careerCards container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {careerData.map((card) => (
          <div key={card.id} className="relative">
            <CareerCard
              id={card.id}
              image={card.image}
              category={card.category}
              careers={card.careers}
            />
          </div>
        ))}
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
        className="absolute top-[6.5rem] right-0 w-60 h-60 bg-gradient-to-bl from-indigo-500 to-purple-500 rounded-full filter blur-3xl opacity-50"
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

      <Footer />
    </div>
  );
};

export default Career;
