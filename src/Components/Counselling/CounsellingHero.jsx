"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  CheckCircle,
  ChevronRight,
  Compass,
  Mail,
  Phone,
  Star,
  Target,
  Lightbulb,
  TrendingUp,
  Award,
  Briefcase,
  ArrowRight,
  Play,
} from "lucide-react";
import { Button } from "../../Components/ui/Button";
import Navbar from "../Navbar";

export default function CounsellingHero() {
  const [activeReason, setActiveReason] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate through reasons
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReason((prev) =>
        prev === counsellingReasons.length ? 1 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const counsellingReasons = [
    {
      id: 1,
      title: "Discover Your Strengths",
      description:
        "Identify your natural talents and abilities to find careers that align with your strengths.",
      icon: <Target className="h-8 w-8" />,
      color: "#fcb326",
      secondaryColor: "#875BC9",
      lightColor: "bg-amber-50",
      textColor: "text-[#fcb326]",
      borderColor: "border-amber-200",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 2,
      title: "Explore Career Options",
      description:
        "Learn about diverse career paths and opportunities that match your interests and skills.",
      icon: <Compass className="h-8 w-8" />,
      color: "#875BC9",
      secondaryColor: "#fcb326",
      lightColor: "bg-purple-50",
      textColor: "text-[#875BC9]",
      borderColor: "border-purple-200",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 3,
      title: "Gain Industry Insights",
      description:
        "Get valuable information about job markets, industry trends, and future growth areas.",
      icon: <Lightbulb className="h-8 w-8" />,
      color: "#fcb326",
      secondaryColor: "#875BC9",
      lightColor: "bg-amber-50",
      textColor: "text-[#fcb326]",
      borderColor: "border-amber-200",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 4,
      title: "Create an Action Plan",
      description:
        "Develop a strategic roadmap with clear steps to achieve your career goals.",
      icon: <TrendingUp className="h-8 w-8" />,
      color: "#875BC9",
      secondaryColor: "#fcb326",
      lightColor: "bg-purple-50",
      textColor: "text-[#875BC9]",
      borderColor: "border-purple-200",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 5,
      title: "Build Professional Skills",
      description:
        "Enhance your resume, interview techniques, and networking abilities.",
      icon: <Award className="h-8 w-8" />,
      color: "#fcb326",
      secondaryColor: "#875BC9",
      lightColor: "bg-amber-50",
      textColor: "text-[#fcb326]",
      borderColor: "border-amber-200",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 6,
      title: "Navigate Career Transitions",
      description:
        "Get expert guidance when changing careers or advancing to new roles.",
      icon: <Briefcase className="h-8 w-8" />,
      color: "#875BC9",
      secondaryColor: "#fcb326",
      lightColor: "bg-purple-50",
      textColor: "text-[#875BC9]",
      borderColor: "border-purple-200",
      image: "/placeholder.svg?height=400&width=600",
    },
  ];

  const activeReasonData = counsellingReasons[activeReason - 1];

  return (
    <>
      <Navbar />
      <div className="relative">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-[#fcb326] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-[#875BC9] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#fcb326] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative z-10">
          <section className="w-full py-20 md:py-28">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="grid gap-12 lg:grid-cols-2 items-center">
                <motion.div
                  className="flex flex-col justify-center space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#fcb326] to-[#fcb326]/80">
                      Personalized Career
                    </span>
                    <br />
                    <span className="text-white">
                      Counselling for Your Future
                    </span>
                  </h1>

                  <p className="text-lg md:text-xl text-slate-300 max-w-xl">
                    Guiding you to informed choices and bright futures with
                    professional career counselling that provides confidence and
                    clarity.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <Button className="relative overflow-hidden group bg-gradient-to-r from-[#fcb326] to-[#fcb326]/90 hover:from-[#fcb326]/90 hover:to-[#fcb326] text-white px-8 py-6 rounded-xl text-lg font-medium">
                        <span className="relative z-10 flex items-center gap-2">
                          Book a Session
                          <motion.div
                            animate={{ x: isHovered ? 5 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowRight className="ml-1" />
                          </motion.div>
                        </span>
                      </Button>
                    </motion.div>

                    <Button
                      variant="outline"
                      className="border-[#875BC9]/30 text-[#875BC9] hover:bg-[#875BC9]/10 px-8 py-6 rounded-xl text-lg font-medium"
                    >
                      Learn More <ChevronRight className="ml-1" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 mt-8">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full border-2 border-slate-900 overflow-hidden"
                        >
                          <img
                            src={`/placeholder.svg?height=40&width=40&text=${i}`}
                            alt={`Student ${i}`}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-slate-400 text-sm">
                      <span className="text-[#fcb326] font-medium">500+</span>{" "}
                      students guided this year
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="relative"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
                    <img
                      src="/placeholder.svg?height=600&width=800&text=Career+Counselling"
                      width={800}
                      height={600}
                      alt="Career counselling session"
                      className="w-full h-auto object-cover"
                      priority
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end">
                      <div className="p-6 text-white">
                        <div className="flex items-center gap-2 mb-2">
                          <Star
                            className="w-5 h-5 text-[#fcb326]"
                            fill="currentColor"
                          />
                          <Star
                            className="w-5 h-5 text-[#fcb326]"
                            fill="currentColor"
                          />
                          <Star
                            className="w-5 h-5 text-[#fcb326]"
                            fill="currentColor"
                          />
                          <Star
                            className="w-5 h-5 text-[#fcb326]"
                            fill="currentColor"
                          />
                          <Star
                            className="w-5 h-5 text-[#fcb326]"
                            fill="currentColor"
                          />
                        </div>
                        <p className="text-sm opacity-90">
                          "The counselling session completely changed my
                          perspective on my career path. I now have a clear
                          direction."
                        </p>
                        <p className="text-xs mt-2 opacity-70">
                          — Priya S., Engineering Student
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Video play button */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center cursor-pointer border border-white/20 group">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-[#fcb326] to-[#875BC9] flex items-center justify-center shadow-lg group-hover:from-[#875BC9] group-hover:to-[#fcb326] transition-all duration-300">
                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Decorative elements */}
                  <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full border border-[#fcb326]/20 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full border border-[#fcb326]/40"></div>
                  </div>
                  <div className="absolute -bottom-8 right-20 w-16 h-16 rounded-full border border-[#875BC9]/20 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border border-[#875BC9]/40"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Why Career Counselling Section */}
          <section className="w-full py-20 md:py-28">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800 border border-slate-700 w-fit mb-4"
                >
                  <span className="text-[#fcb326] text-sm font-medium">
                    Why Choose Us
                  </span>
                </motion.div>

                <motion.h2
                  className="text-3xl pb-5 font-bold tracking-tight sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#fcb326] to-[#875BC9]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Why Career Counselling Matters
                </motion.h2>

                <motion.p
                  className="max-w-[700px] text-slate-400 md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Making informed career decisions can transform your future.
                  Here's how we help.
                </motion.p>
              </div>

              <div className="grid lg:grid-cols-12 gap-8">
                {/* Interactive Sidebar */}
                <div className="lg:col-span-4">
                  <div className="space-y-3">
                    {counsellingReasons.map((reason) => (
                      <motion.div
                        key={reason.id}
                        className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                          activeReason === reason.id
                            ? `${reason.lightColor} ${reason.borderColor}`
                            : "bg-slate-800/50 border-slate-700 hover:bg-slate-800"
                        }`}
                        onClick={() => setActiveReason(reason.id)}
                        whileHover={{ x: activeReason === reason.id ? 0 : 5 }}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.05 * reason.id }}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-2.5 rounded-lg ${
                              activeReason === reason.id
                                ? `bg-gradient-to-br from-[${reason.color}] to-[${reason.secondaryColor}] text-white`
                                : "bg-slate-700 text-slate-300"
                            }`}
                            style={{
                              background:
                                activeReason === reason.id
                                  ? `linear-gradient(to bottom right, ${reason.color}, ${reason.secondaryColor})`
                                  : "",
                            }}
                          >
                            {reason.icon}
                          </div>
                          <div className="flex-1">
                            <h3
                              className={`text-base font-semibold mb-1 ${
                                activeReason === reason.id
                                  ? reason.textColor
                                  : "text-white"
                              }`}
                            >
                              {reason.title}
                            </h3>
                            <p
                              className={`text-sm line-clamp-1 ${
                                activeReason === reason.id
                                  ? "text-slate-700"
                                  : "text-slate-400"
                              }`}
                            >
                              {reason.description}
                            </p>
                          </div>
                          {activeReason === reason.id && (
                            <div className={`${reason.textColor}`}>
                              <ChevronRight className="h-5 w-5" />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Added feature: Quick contact */}
                  <motion.div
                    className="mt-6 p-4 rounded-xl border border-slate-700 bg-slate-800/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <h3 className="text-white font-semibold mb-3">
                      Need immediate assistance?
                    </h3>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-[#fcb326]/10 text-[#fcb326]">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-300">
                          Call us directly
                        </p>
                        <p className="text-white font-medium">
                          +91 98765 43210
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#875BC9]/10 text-[#875BC9]">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-300">Email us at</p>
                        <p className="text-white font-medium">
                          counselling@careercompass.com
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Interactive Content Display */}
                <div className="lg:col-span-8 relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeReason}
                      className={`${activeReasonData.lightColor} p-8 rounded-2xl h-full flex flex-col justify-center shadow-xl border ${activeReasonData.borderColor}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="md:w-1/2">
                          <div
                            className="p-4 rounded-full text-white inline-block mb-4 shadow-lg"
                            style={{
                              background: `linear-gradient(to bottom right, ${activeReasonData.color}, ${activeReasonData.secondaryColor})`,
                            }}
                          >
                            {activeReasonData.icon}
                          </div>
                          <h3
                            className={`text-2xl font-bold mb-4 ${activeReasonData.textColor}`}
                          >
                            {activeReasonData.title}
                          </h3>
                          <p className="text-slate-700 text-lg mb-6">
                            {activeReasonData.description}
                          </p>
                          <ul className="space-y-3">
                            {[1, 2, 3].map((item) => (
                              <motion.li
                                key={item}
                                className="flex items-start gap-2"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: 0.1 * item,
                                  duration: 0.3,
                                }}
                              >
                                <CheckCircle
                                  className={`h-5 w-5 ${activeReasonData.textColor} mt-0.5 flex-shrink-0`}
                                />
                                <span className="text-slate-700">
                                  {item === 1 &&
                                    "Personalized guidance tailored to your unique situation"}
                                  {item === 2 &&
                                    "Expert advice from experienced career professionals"}
                                  {item === 3 &&
                                    "Practical tools and resources to support your journey"}
                                </span>
                              </motion.li>
                            ))}
                          </ul>

                          <motion.div
                            className="mt-8"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.3 }}
                          >
                            <Button
                              className="text-white hover:opacity-90"
                              style={{
                                background: `linear-gradient(to right, ${activeReasonData.color}, ${activeReasonData.secondaryColor})`,
                              }}
                            >
                              Learn More <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </motion.div>
                        </div>
                        <div className="md:w-1/2">
                          <motion.div
                            className="rounded-xl overflow-hidden shadow-lg border-4 border-white relative"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                          >
                            <img
                              src={activeReasonData.image || "/placeholder.svg"}
                              width={600}
                              height={400}
                              alt={activeReasonData.title}
                              className="w-full h-auto object-cover"
                            />

                            {/* Decorative elements */}
                            <div
                              className="absolute -bottom-3 -right-3 w-20 h-20 rounded-full opacity-20 blur-md"
                              style={{
                                background: `linear-gradient(to bottom right, ${activeReasonData.color}, ${activeReasonData.secondaryColor})`,
                              }}
                            ></div>
                            <div
                              className="absolute -top-3 -left-3 w-16 h-16 rounded-full opacity-20 blur-md"
                              style={{
                                background: `linear-gradient(to bottom right, ${activeReasonData.color}, ${activeReasonData.secondaryColor})`,
                              }}
                            ></div>
                          </motion.div>

                          {/* Added feature: Stats */}
                          <motion.div
                            className="mt-4 flex gap-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.3 }}
                          >
                            <div className="flex-1 bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20">
                              <p className="text-sm text-slate-400">
                                Success Rate
                              </p>
                              <p className="text-xl font-bold text-white">
                                95%
                              </p>
                            </div>
                            <div className="flex-1 bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20">
                              <p className="text-sm text-slate-400">Students</p>
                              <p className="text-xl font-bold text-white">
                                10,000+
                              </p>
                            </div>
                            <div className="flex-1 bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20">
                              <p className="text-sm text-slate-400">Experts</p>
                              <p className="text-xl font-bold text-white">
                                50+
                              </p>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Progress indicator */}
                  <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-2">
                    {counsellingReasons.map((reason) => (
                      <button
                        key={reason.id}
                        onClick={() => setActiveReason(reason.id)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          activeReason === reason.id
                            ? `w-8`
                            : "bg-slate-600 hover:bg-slate-500"
                        }`}
                        style={{
                          background:
                            activeReason === reason.id
                              ? `linear-gradient(to right, ${reason.color}, ${reason.secondaryColor})`
                              : "",
                        }}
                        aria-label={`View ${reason.title}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Add custom animation styles */}
        <style jsx global>{`
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          .animate-blob {
            animation: blob 15s infinite alternate;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </div>
    </>
  );
}
