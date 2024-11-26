import React, { useState } from "react";
import { motion } from "framer-motion";
import "../Strategies/stratFront.css";
import strat1 from "../../assets/logo-avatars/strat1.png";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const Button = ({ children, className, ...props }) => (
  <button className={`explore-button ${className}`} {...props}>
    {children}
  </button>
);

const Strategies = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      icon: "⚡",
      text: "What You Love (Your Passion)",
      color: "text-purple-500",
    },
    {
      icon: "💯",
      text: "What You Are Good At (Your Vocation)",
      color: "text-blue-500",
    },
    {
      icon: "🌐",
      text: "What The World Needs (Your Mission)",
      color: "text-green-500",
    },
    {
      icon: "💵",
      text: "What You Can Be Paid For (Your Profession)",
      color: "text-pink-500",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="cool-dark-ui-page">
      <Navbar/>
      <div className="container">
        <motion.div
          className="background-blob background-blob-1"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="background-blob background-blob-2"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <header className="header">
          <div className="header-content">
            <motion.h1
              className="title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Strategies
            </motion.h1>
            <motion.p
              className="subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Stay Sharp, Aim Right: Proven Tactics for Academic Focus and
              Career Clarity
            </motion.p>
          </div>

          <motion.div
            className="image-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="image-background"></div>
            <img
              src={strat1}
              alt="Futuristic cityscape"
              className="main-image"
              width={100}
              height={50}
            />
          </motion.div>
        </header>

        <div className="content-grid">
          <motion.div
            className="content-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="content-title">
              Ikigai : The Japanese Secret to Happiness
            </h2>
            <p className="content-description">
              The Ikigai concept is a Japanese philosophy that emphasizes
              finding purpose and meaning in life. It combines four key
              elements: what you love, what you are good at, what the world
              needs, and what you can be paid for. The intersection of these
              elements is where you can find your "Ikigai," or your reason for
              being.
            </p>
            <div className="strat">
      <button onClick={toggleSection} className="explore-button-strat">
        Explore Ikigai
        <span className="explore-button-icon-strat">→</span>
      </button>
      
      {isOpen && (
        <motion.div
          className="ikigai-content-strat"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>What is Ikigai?</h2>
          <p>Ikigai is a Japanese concept that represents the intersection of four key areas of life:</p>
          <ul>
            <li><strong>What you love:</strong> Your passions and interests.</li>
            <li><strong>What you are good at:</strong> Your skills and expertise.</li>
            <li><strong>What the world needs:</strong> Opportunities to contribute to society.</li>
            <li><strong>What you can be paid for:</strong> Ways to earn a living.</li>
          </ul>

          <h3>How to Find Your Ikigai:</h3>
          <ol>
            <li><strong>Identify Your Passions:</strong> What activities make you feel happy and fulfilled?</li>
            <li><strong>Assess Your Skills:</strong> What are you naturally good at?</li>
            <li><strong>Understand Societal Needs:</strong> How can you contribute to solving real-world problems?</li>
            <li><strong>Explore Income Opportunities:</strong> What work can you do that will also provide financial stability?</li>
          </ol>

          <h3>Benefits of Living with Ikigai:</h3>
          <ul>
            <li><strong>Improved Motivation:</strong> When you work in alignment with your Ikigai, you’ll find more motivation in your daily life.</li>
            <li><strong>Fulfillment and Happiness:</strong> Living with purpose leads to greater life satisfaction.</li>
            <li><strong>Reduced Stress:</strong> Doing meaningful work helps reduce stress and boosts mental health.</li>
          </ul>
          
          <h3>Steps to Align Your Life with Ikigai:</h3>
          <ol>
            <li><strong>Self-Reflection:</strong> Take time to think about the four core elements of Ikigai.</li>
            <li><strong>Action Plan:</strong> Create a practical plan to align your passions, skills, and work.</li>
            <li><strong>Evaluate and Adjust:</strong> Regularly check in with yourself and make changes where necessary.</li>
          </ol>
        </motion.div>
      )}
    </div>
          </motion.div>
          <motion.div
            className="features-container"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="features-title">Breakdown of each component</h3>
            <ul className="features-list">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="feature-item"
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  whileHover={{ scale: 1.05 }}
                  style={{
                    backgroundColor:
                      hoveredFeature === index
                        ? "rgba(255, 255, 255, 0.1)"
                        : "transparent",
                  }}
                >
                  <span className={`feature-icon ${feature.color}`}>
                    {feature.icon}
                  </span>
                  <span className="feature-text">{feature.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Strategies;