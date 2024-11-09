import React from "react";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Star,
  Rocket,
  Heart,
  Trophy,
  Lightbulb,
} from "lucide-react";
import "./about.css"; // Import the updated CSS file

const Card = ({ children, className }) => {
  return <div className={`card ${className}`}>{children}</div>;
};

const Button = ({ children, className, onClick }) => {
  return (
    <button className={`py-2 px-4 rounded ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

const Badge = ({ children, className }) => {
  return (
    <span
      className={`inline-block px-2 py-1 rounded-full text-white ${className}`}
    >
      {children}
    </span>
  );
};

export default function About() {
  return (
    <div className="container">
      <div className="grid">
        {/* Box 1: Large feature box */}
        <Card className="col-span-2 row-span-2 gradient p-6 flex flex-col justify-between overflow-hidden group">
          <div className="relative z-10 space-y-4 text-center">
            <h2 className="text-3xl font-extrabold mb-3">
              Discover Every Career Path
            </h2>
            <p className="text-lg leading-relaxed text-yellow-300">
              At our core, we believe every career path,{" "}
              <span className="font-semibold text-white">
                whether renowned or unconventional
              </span>
              , holds its own unique value. Our mission is to unveil a world of
              opportunities that go beyond the conventional, empowering you to
              explore all options and envision a future that truly resonates
              with your aspirations.
            </p>
            <p className="text-lg leading-relaxed text-yellow-300">
              With a{" "}
              <span className="font-semibold text-white">
                comprehensive roadmap
              </span>{" "}
              tailored for each career, we are dedicated to guiding you in
              making informed choices that align seamlessly with your goals and
              passions.
            </p>
            <Button className="mt-4 text-white hover:bg-white hover:text-purple-500 transition-colors">
              Explore Careers <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <Sparkles className="absolute bottom-0 right-0 h-32 w-32 text-pink-300 opacity-50 transform translate-y-1/4 translate-x-1/4" />
        </Card>

        {/* Box 2: Quick action */}
        <Card className="secondary p-6 flex flex-col items-center justify-center text-center group">
          {/* <Zap className="h-12 w-12 mb-4 text-yellow-900" /> */}
          <h3 className="text-3xl font-semibold mb-2 text-yellow-900">Blogs</h3>
          <p className="text-yellow-800 mb-4">
            Explore our blog section for insights from professionals in various
            careers. Learn about their experiences and the challenges they
            faced.
          </p>
        </Card>

        {/* Box 3: Statistic */}
        <Card className="blue p-6 flex flex-col items-center justify-center text-center">
          <Star className="h-12 w-12 mb-4" />
          <h3 className="text-3xl font-bold mb-2">100%</h3>
          <p className="text-blue-100">Satisfaction rate</p>
        </Card>

        {/* Box 4 & 5 merged: Latest Update and Call-to-action */}
        <Card className="col-span-1 md:col-span-2 green p-6 flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-semibold mb-2 text-green-800">
            Latest Update
          </h3>
          <p className="text-green-700 mb-4">
            Check out our newest features and improvements
          </p>
          <Badge className="bg-green-500 text-white hover:bg-green-600">
            New
          </Badge>
          <h3 className="text-lg font-semibold mb-2">Get Started</h3>
          <Button className="bg-white text-red-500 hover:bg-red-100">
            Launch Now
          </Button>
        </Card>

        {/* Box 6: User testimonial */}
        <Card className="indigo p-6 flex flex-col justify-between">
          <div>
            <Heart className="h-8 w-8 text-indigo-500 mb-4" />
            <p className="text-indigo-700 mb-4">
              "This product changed my life! Absolutely amazing."
            </p>
          </div>
          <p className="text-indigo-500 font-semibold">- Happy User</p>
        </Card>

        {/* Box 7: Achievement or award */}
        <Card className="orange p-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">Award Winner</h3>
            <p className="text-sm">Best in class</p>
          </div>
          <Trophy className="h-12 w-12" />
        </Card>

        {/* Box 8: Idea or innovation */}
        <Card className="cyan p-6 flex flex-col items-center justify-center text-center group">
          <Lightbulb className="h-12 w-12 mb-4 text-cyan-900" />
          <h3 className="text-lg font-semibold mb-2">Innovative Ideas</h3>
          <p className="text-cyan-800">Explore the future of technology</p>
        </Card>
      </div>
    </div>
  );
}