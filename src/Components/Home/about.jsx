import React, { useEffect, useState, useRef } from "react";
import {
  ArrowRight,
  Sparkles,
  Star,
  Heart,
  Trophy,
  Lightbulb,
} from "lucide-react";
import logoo from "../../assets/logo-avatars/logo.png";
import "./about.css";

const Card = ({ children, className }) => {
  return (
    <div className={`p-6 rounded-3xl shadow-lg card ${className}`}>
      {children}
    </div>
  );
};

const Button = ({ children, className, onClick }) => {
  return (
    <button
      className={`py-2 px-4 rounded font-semibold transition-colors ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, className }) => {
  return (
    <span
      className={`inline-block px-3 py-1 text-xs rounded-full ${className}`}
    >
      {children}
    </span>
  );
};

export default function About() {
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationPlayed) {
          setAnimationPlayed(true); // Animation play hogi pehli baar.
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <div
      ref={sectionRef}
      id="about"
      className={`relative max-w-screen-xl mx-auto px-4 my-40 min-h-screen ${
        animationPlayed || window.innerWidth <= 768
          ? "animate-gather-once"
          : "hidden-before-animation"
      }`}
    >

      <div className="grid">
        <Card className="col-span-2 row-span-2 bg-gradient-to-br from-purple-700 to-pink-600 text-white">
          <div className="space-y-4 text-center">
            <h2 className="text-4xl font-extrabold mt-16">
              Discover Every Career Path
            </h2>
            <p className="text-yellow-300 text-2xl pt-14">
              At our core, we believe every career path,{" "}
              <span className="font-semibold text-white">
                whether renowned or unconventional
              </span>
              , holds its own unique value. Our mission is to open up a world of
              opportunities that go beyond the conventional, empowering you to
              explore diverse career options. We aim to help you discover paths
              that resonate with your passions, guiding you toward a future
              aligned with your goals and aspirations.
            </p>
          </div>
          <Sparkles className="absolute bottom-0 right-0 h-32 w-32 text-pink-300 opacity-50 transform translate-y-1/4 translate-x-1/4" />
        </Card>

        <Card className="bg-yellow-100 hover:bg-yellow-200 text-yellow-900">
          <h3 className="text-2xl font-semibold mb-2 flex justify-between">
            Blogs <Star className="h-12 w-12" />
          </h3>
          <p>
            Explore our blog section for insights from professionals in various
            careers. Learn about their experiences and the challenges they
            faced.
          </p>
        </Card>

        <Card className="bg-blue-400 text-white">
          <h3 className="text-2xl font-bold mb-2 text-[#000000]">
            Community Chatbox
          </h3>
          <p className="text-[#ffffff] pt-5">
            A space for everyone to connect, ask questions, and share insights.
            Collaborate, clear doubts, and grow together in a supportive
            environment.
          </p>
        </Card>

        <Card className="bg-green-500 text-white hover:bg-green-600">
          <img className="bg-cover bg-center w-auto" src={logoo} />
        </Card>

        <Card className="bg-indigo-100 row-span-2 text-indigo-700">
          <h3 className="text-3xl font-bold mb-2 text-blue-800 flex justify-between">
            Community Chatbox <Heart className="h-16 w-16 text-indigo-500 mb-4" />
          </h3>
          <p className="mb-4 text-gray-600 text-lg">
            Our strategies are designed to help you enhance focus, optimize your
            study habits, and choose a more efficient career path. By
            implementing proven techniques like time management, prioritization,
            and mindful goal-setting, you can sharpen your concentration and
            make well-informed decisions that align with your strengths and
            aspirations.
          </p>
          <p className="text-indigo-500 font-semibold">- careerCompass</p>
        </Card>

        <Card className="bg-green-100 hover:bg-green-200 text-green-700">
          <h3 className="text-lg font-semibold mb-2">
            AI Coach &nbsp;{" "}
            <Badge className="bg-green-500 text-white hover:bg-green-600">
              New
            </Badge>
          </h3>
          <p className="mb-2">
            A customized AI assistant that listens to your prompts and offers
            personalized guidance to help you with career choices and studies.
          </p>
        </Card>

        <Card className="col-span-2 bg-cyan-200 hover:bg-cyan-300 text-green-800">
          
          <h3 className="text-2xl font-semibold mb-2 text-green-800 flex justify-between pr-5">
          <Lightbulb className="h-12 w-12 mb-4" />
            Counselling
          </h3>
          <p className="text-[#d936de]">
            We provide counseling to help you with your career and studies. If
            needed, our expert counselors will assist you in making informed
            decisions and offer valuable guidance tailored to your goals.
          </p>
        </Card>
      </div>
    </div>
  );
}