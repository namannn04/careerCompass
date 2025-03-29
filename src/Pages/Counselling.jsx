import { Card } from "../Components/ui/Card";
import { Button } from "../Components/ui/Button";
import counsel from "../assets/careers/counsel.png";
import { useState } from "react";

import {
  BookOpen,
  Calendar,
  CheckCircle,
  ChevronRight,
  Compass,
  GraduationCap,
  Mail,
  MessageSquare,
  Phone,
  Star,
  User,
  Target,
  Lightbulb,
  TrendingUp,
  Award,
  Briefcase,
} from "lucide-react";
import Navbar from "../Components/Navbar";
import { motion } from "framer-motion";
import Footer from "../Components/Footer/Footer";

const Counselling = () => {
  const [activeReason, setActiveReason] = useState(1);

  const counsellingReasons = [
    {
      id: 1,
      title: "Discover Your Strengths",
      description:
        "Identify your natural talents and abilities to find careers that align with your strengths.",
      icon: <Target className="h-8 w-8" />,
      color: "bg-blue-500",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 2,
      title: "Explore Career Options",
      description:
        "Learn about diverse career paths and opportunities that match your interests and skills.",
      icon: <Compass className="h-8 w-8" />,
      color: "bg-purple-500",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 3,
      title: "Gain Industry Insights",
      description:
        "Get valuable information about job markets, industry trends, and future growth areas.",
      icon: <Lightbulb className="h-8 w-8" />,
      color: "bg-green-500",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 4,
      title: "Create an Action Plan",
      description:
        "Develop a strategic roadmap with clear steps to achieve your career goals.",
      icon: <TrendingUp className="h-8 w-8" />,
      color: "bg-yellow-500",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 5,
      title: "Build Professional Skills",
      description:
        "Enhance your resume, interview techniques, and networking abilities.",
      icon: <Award className="h-8 w-8" />,
      color: "bg-red-500",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 6,
      title: "Navigate Career Transitions",
      description:
        "Get expert guidance when changing careers or advancing to new roles.",
      icon: <Briefcase className="h-8 w-8" />,
      color: "bg-indigo-500",
      image: "/placeholder.svg?height=400&width=600",
    },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container px-[3rem] md:px-[4rem] py-[5rem]">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="flex flex-col justify-center space-y-3">
              <h1 className="text-5xl font-bold mb-8 sm:text-6xl md:text-6xl text-[#fcb326]">
                Personalized Career Counselling for a Brighter Future
              </h1>
              <p className="text-2xl text-white max-w-[600px]">
                careerCompass – Guiding You to Informed Choices and Bright
                Futures!
                <br />
                <br />
                Professional career counselling to help you navigate your
                journey with confidence and clarity.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end relative">
              <div className="relative w-full max-w-full">
                <div className=" p-3 rounded-xl shadow-2xl relative z-0 w-full">
                  <img
                    src={counsel}
                    width={2000}
                    height={1000}
                    alt="Confused student thinking about career choices"
                    className="rounded-lg w-full"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Career Counselling Section */}
      <section className="w-full py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 "></div>
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <motion.h2
              className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-[#fcb326]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Why Career Counselling Matters
            </motion.h2>
            <motion.p
              className="max-w-[700px] text-white md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Making informed career decisions can transform your future. Here's
              how we help.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Interactive Sidebar */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {counsellingReasons.map((reason) => (
                  <motion.div
                    key={reason.id}
                    className={`p-5 rounded-xl cursor-pointer transition-all duration-300 ${
                      activeReason === reason.id
                        ? `bg-gray-300 text-white`
                        : "bg-slate-50 hover:bg-slate-100"
                    }`}
                    onClick={() => setActiveReason(reason.id)}
                    whileHover={{ x: activeReason === reason.id ? 0 : 5 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * reason.id }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-lg ${
                          activeReason === reason.id ? reason.color : "bg-white"
                        } text-white`}
                      >
                        {reason.icon}
                      </div>
                      <div className="flex-1">
                        <h3
                          className={"text-xl font-bold mb-1 text-[#fcb326]"}
                        >
                          {reason.title}
                        </h3>
                        <p className="text-slate-600 line-clamp-2">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Interactive Content Display */}
            <div className="lg:col-span-3 relative">
              <motion.div
                className="bg-slate-50 p-8 rounded-2xl h-full flex flex-col justify-center shadow-xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  backgroundColor:
                    activeReason % 2 === 0 ? "#f8fafc" : "#f1f5f9",
                }}
                transition={{ duration: 0.4 }}
                key={activeReason}
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/2">
                    <div
                      className={`p-4 rounded-full ${
                        counsellingReasons[activeReason - 1].color
                      } text-white inline-block mb-4`}
                    >
                      {counsellingReasons[activeReason - 1].icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-slate-900">
                      {counsellingReasons[activeReason - 1].title}
                    </h3>
                    <p className="text-slate-600 text-lg mb-6">
                      {counsellingReasons[activeReason - 1].description}
                    </p>
                    <ul className="space-y-3">
                      {[1, 2, 3].map((item) => (
                        <motion.li
                          key={item}
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 * item, duration: 0.3 }}
                        >
                          <CheckCircle
                            className={`h-5 w-5 text-${
                              counsellingReasons[activeReason - 1].color.split(
                                "-"
                              )[1]
                            }-500 mt-0.5 flex-shrink-0`}
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
                  </div>
                  <div className="md:w-1/2">
                    <motion.div
                      className="rounded-xl overflow-hidden shadow-lg border-4 border-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <img
                        src={
                          counsellingReasons[activeReason - 1].image ||
                          "/placeholder.svg"
                        }
                        width={600}
                        height={400}
                        alt={counsellingReasons[activeReason - 1].title}
                        className="w-full h-auto object-cover"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-blue-100 rounded-full opacity-70"></div>
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-purple-100 rounded-full opacity-70"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl transform -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-purple-200 rounded-full opacity-20 blur-3xl transform -translate-y-1/2"></div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <motion.h2
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl  text-[#fcb326]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Choose Your Path
            </motion.h2>
            <motion.p
              className="max-w-[700px] text-white md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Whether you're seeking guidance or want to help others, we have a
              place for you.
            </motion.p>
          </div>

          <div className="grid gap-10 md:grid-cols-2 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 h-full group">
                <div className="h-3 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                <div className="p-8">
                  <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <User className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-900 text-center">
                    I'm a Student
                  </h3>
                  <p className="text-slate-600 mb-8 text-center">
                    Looking for guidance to make informed career decisions?
                    Register as a student to connect with experienced
                    counsellors.
                  </p>
                  <div className="bg-slate-50 p-6 rounded-xl mb-8">
                    <ul className="space-y-4">
                      <motion.li
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                      >
                        <div className="bg-blue-100 p-1.5 rounded-full mt-0.5">
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <span className="font-medium text-slate-900">
                            Personalized career guidance
                          </span>
                          <p className="text-sm text-slate-600 mt-1">
                            Tailored advice based on your skills and interests
                          </p>
                        </div>
                      </motion.li>
                      <motion.li
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                      >
                        <div className="bg-blue-100 p-1.5 rounded-full mt-0.5">
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <span className="font-medium text-slate-900">
                            Skill assessment and development
                          </span>
                          <p className="text-sm text-slate-600 mt-1">
                            Identify strengths and areas for growth
                          </p>
                        </div>
                      </motion.li>
                      <motion.li
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                      >
                        <div className="bg-blue-100 p-1.5 rounded-full mt-0.5">
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <span className="font-medium text-slate-900">
                            Educational pathway planning
                          </span>
                          <p className="text-sm text-slate-600 mt-1">
                            Map out your academic journey to success
                          </p>
                        </div>
                      </motion.li>
                    </ul>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 group-hover:shadow-lg transition-all duration-300">
                    Register as Student
                  </Button>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 h-full group">
                <div className="h-3 bg-gradient-to-r from-purple-400 to-purple-600"></div>
                <div className="p-8">
                  <div className="h-20 w-20 rounded-full bg-purple-100 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="h-10 w-10 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-900 text-center">
                    I'm a Counsellor
                  </h3>
                  <p className="text-slate-600 mb-8 text-center">
                    Want to make a difference in students' lives? Join our
                    platform as a counsellor and share your expertise.
                  </p>
                  <div className="bg-slate-50 p-6 rounded-xl mb-8">
                    <ul className="space-y-4">
                      <motion.li
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                      >
                        <div className="bg-purple-100 p-1.5 rounded-full mt-0.5">
                          <CheckCircle className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <span className="font-medium text-slate-900">
                            Connect with students
                          </span>
                          <p className="text-sm text-slate-600 mt-1">
                            Help those seeking professional guidance
                          </p>
                        </div>
                      </motion.li>
                      <motion.li
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                      >
                        <div className="bg-purple-100 p-1.5 rounded-full mt-0.5">
                          <CheckCircle className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <span className="font-medium text-slate-900">
                            Flexible scheduling
                          </span>
                          <p className="text-sm text-slate-600 mt-1">
                            Work on your own terms and availability
                          </p>
                        </div>
                      </motion.li>
                      <motion.li
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                      >
                        <div className="bg-purple-100 p-1.5 rounded-full mt-0.5">
                          <CheckCircle className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <span className="font-medium text-slate-900">
                            Professional development
                          </span>
                          <p className="text-sm text-slate-600 mt-1">
                            Access resources and grow your expertise
                          </p>
                        </div>
                      </motion.li>
                    </ul>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl py-6 group-hover:shadow-lg transition-all duration-300">
                    Register as Counsellor
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Counsellors List Section */}
      <section className="w-full py-16 md:py-24 ">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#fcb326]">
              Meet Our Counsellors
            </h2>
            <p className="max-w-[700px] text-white md:text-xl">
              Our experienced counsellors are ready to guide you on your career
              journey.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Counsellor 1 */}
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="aspect-square relative">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="Dr. Sarah Johnson"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900">
                  Dr. Sarah Johnson
                </h3>
                <p className="text-blue-600 font-medium mb-2">
                  Career Development Specialist
                </p>
                <p className="text-slate-600 mb-4">
                  15+ years of experience in guiding students through STEM
                  career paths.
                </p>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                  <span className="ml-2 text-sm text-slate-600">
                    5.0 (120 reviews)
                  </span>
                </div>
              </div>
            </Card>

            {/* Counsellor 2 */}
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="aspect-square relative">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="Prof. Michael Chen"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900">
                  Prof. Michael Chen
                </h3>
                <p className="text-blue-600 font-medium mb-2">
                  Business & Entrepreneurship Advisor
                </p>
                <p className="text-slate-600 mb-4">
                  Former startup founder with expertise in business education
                  and mentorship.
                </p>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                  <span className="ml-2 text-sm text-slate-600">
                    4.9 (98 reviews)
                  </span>
                </div>
              </div>
            </Card>

            {/* Counsellor 3 */}
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="aspect-square relative">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="Dr. Priya Patel"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900">
                  Dr. Priya Patel
                </h3>
                <p className="text-blue-600 font-medium mb-2">
                  Creative Arts & Media Specialist
                </p>
                <p className="text-slate-600 mb-4">
                  Helps students navigate careers in design, media, and the
                  creative industries.
                </p>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < 4
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-yellow-200 fill-yellow-200"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-slate-600">
                    4.8 (87 reviews)
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Counselling;
