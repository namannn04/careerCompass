import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Star,
  Heart,
  Lightbulb,
} from "lucide-react";
import logoo from "../../assets/logo-avatars/logo.png";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Card = ({ children, className }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariants}
      className={`p-6 rounded-3xl shadow-lg ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default function About() {
  return (
    <div id="about" className="relative max-w-screen-xl mx-auto my-40 min-h-screen px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="grid md:grid-cols-4 grid-cols-1 gap-6"
      >
        <Card className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-black/70 to-purple-800/70 text-gold">
          <div className="space-y-4 text-center">
            <h2 className="text-4xl font-extrabold mt-16 text-gold">Discover Every Career Path</h2>
            <p className="text-purple-300 text-2xl pt-14">
              At our core, we believe every career path, {" "}
              <span className="font-semibold text-gold">whether renowned or unconventional</span>,
              holds its own unique value. Our mission is to open up a world of
              opportunities that go beyond the conventional, empowering you to
              explore diverse career options. We aim to help you discover paths
              that resonate with your passions, guiding you toward a future
              aligned with your goals and aspirations.
            </p>
          </div>
          <Sparkles className="absolute bottom-[400px] left-[530px] h-32 w-32 text-purple-500 opacity-50 transform translate-y-1/4 translate-x-1/4" />
        </Card>

        <Card className="bg-black/70 hover:bg-gray-900/70 text-gold">
          <h3 className="text-2xl font-semibold mb-2 flex justify-between">
            Blogs <Star className="h-12 w-12 text-purple-500" />
          </h3>
          <p>
            Explore our blog section for insights from professionals in various careers.
            Learn about their experiences and the challenges they faced.
          </p>
        </Card>

        <Card className="bg-purple-700/70 text-white hover:bg-purple-800/70">
          <h3 className="text-2xl font-bold mb-2 text-gold">Community Chatbox</h3>
          <p className="pt-5">
            A space for everyone to connect, ask questions, and share insights. 
            Collaborate, clear doubts, and grow together in a supportive environment.
          </p>
        </Card>

        <Card className="bg-gold text-black hover:bg-yellow-500/80">
          <img className="bg-cover bg-center w-auto" src={logoo} alt="Logo" />
        </Card>

        <Card className="bg-gray-900/70 md:row-span-2 text-gold">
          <h3 className="text-4xl font-bold mb-2 flex justify-between">
            Strategies <Heart className="h-16 w-16 text-purple-500 mb-4" />
          </h3>
          <p className="mb-4 text-gray-300 text-lg">
          Our strategies are designed to help you enhance focus, optimize your
            study habits, and choose a more efficient career path. By
            implementing proven techniques like time management, prioritization,
            and mindful goal-setting, you can sharpen your concentration and
            make well-informed decisions that align with your strengths and
            aspirations.
          </p>
          <p className="text-purple-400 font-semibold">- careerCompass</p>
        </Card>

        <Card className="bg-black/70 hover:bg-gray-800/70 text-gold">
          <h3 className="text-lg font-semibold mb-2">
            AI Coach &nbsp;
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full">New</span>
          </h3>
          <p className="mb-2">
            A customized AI assistant that listens to your prompts and offers personalized guidance
            to help you with career choices and studies.
          </p>
        </Card>

        <Card className="md:col-span-2 bg-gradient-to-br from-purple-900/70 to-black/70 text-gold hover:opacity-90">
          <h3 className="text-2xl font-semibold mb-2 flex justify-between pr-5">
            <Lightbulb className="h-12 w-12 mb-4 text-purple-500" />
            Counselling
          </h3>
          <p className="text-purple-400">
            We provide counseling to help you with your career and studies. Our expert counselors
            assist in making informed decisions and offer valuable guidance tailored to your goals.
          </p>
        </Card>
      </motion.div>
    </div>
  );
}