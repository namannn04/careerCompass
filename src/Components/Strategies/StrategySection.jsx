import React, { useState } from "react";
import { Transition } from "@headlessui/react";

const strategies = [
  {
    id: 1,
    title: "Ikigai Method",
    description:
      "Discover your life's purpose by balancing passion, profession, and mission.",
    details: {
      overview: `The Ikigai method helps you identify your sweet spot by exploring four areas:
      - What you love (your passion)
      - What you're good at (your talent)
      - What the world needs (your mission)
      - What you can be paid for (your profession)`,
      steps: [
        "List your skills and things you love doing.",
        "Identify global problems or needs you feel passionate about solving.",
        "Match these needs with your expertise.",
        "Explore job opportunities or entrepreneurial ventures.",
      ],
      benefits: [
        "Achieve work-life balance by pursuing meaningful work.",
        "Find greater motivation and satisfaction in your career.",
        "Create a sustainable income source aligned with your purpose.",
      ],
    },
  },
  {
    id: 2,
    title: "Pomodoro Technique",
    description: "Boost productivity by working in short, focused bursts.",
    details: {
      overview: `The Pomodoro Technique involves working in intervals called 'Pomodoros' with breaks in between.`,
      steps: [
        "Set a timer for 25 minutes and focus on one task.",
        "Take a 5-minute break after each interval.",
        "Repeat this cycle 4 times, then take a longer 15-30 minute break.",
      ],
      benefits: [
        "Improves focus and reduces distractions.",
        "Prevents burnout with regular breaks.",
        "Enhances productivity and time management skills.",
      ],
    },
  },
  {
    id: 3,
    title: "Eisenhower Matrix",
    description: "Prioritize tasks based on urgency and importance.",
    details: {
      overview: `This method divides tasks into four quadrants based on urgency and importance:
      - Do: Urgent and important tasks.
      - Schedule: Important but not urgent tasks.
      - Delegate: Urgent but not important tasks.
      - Eliminate: Tasks that are neither urgent nor important.`,
      steps: [
        "List all your tasks for the day.",
        "Categorize each task into one of the four quadrants.",
        "Focus on the 'Do' quadrant first.",
        "Regularly reassess priorities to stay on track.",
      ],
      benefits: [
        "Helps you focus on what truly matters.",
        "Reduces procrastination by clarifying priorities.",
        "Improves time management and decision-making.",
      ],
    },
  },
  {
    id: 4,
    title: "Flow State",
    description: "Achieve peak performance by working in a state of flow.",
    details: {
      overview: `Flow state is a mental state where you're fully immersed and highly focused on a task.`,
      steps: [
        "Choose a challenging but achievable task.",
        "Eliminate all distractions from your workspace.",
        "Set a clear goal and measure progress.",
        "Work for extended periods without interruptions.",
      ],
      benefits: [
        "Increases productivity and creativity.",
        "Improves the quality of work.",
        "Provides a sense of fulfillment and accomplishment.",
      ],
    },
  },
  {
    id: 5,
    title: "Brain Dump Method",
    description: "Clear your mind by writing down all your thoughts.",
    details: {
      overview: `This method involves offloading your thoughts onto paper to declutter your mind.`,
      steps: [
        "Set aside 10-15 minutes in a quiet space.",
        "Write down everything on your mind without filtering.",
        "Organize the thoughts into categories or action items.",
        "Review the list and prioritize tasks or ideas.",
      ],
      benefits: [
        "Reduces stress and mental overload.",
        "Improves focus and clarity of thought.",
        "Helps in organizing and prioritizing tasks.",
      ],
    },
  },
  {
    id: 6,
    title: "Time-Blocking",
    description: "Schedule your day by assigning tasks to specific time slots.",
    details: {
      overview: `Time-blocking involves dividing your day into chunks of time, each dedicated to a specific task or activity.`,
      steps: [
        "List all your tasks for the day.",
        "Allocate specific time slots for each task.",
        "Include buffer time for unexpected interruptions.",
        "Stick to your schedule and adjust as needed.",
      ],
      benefits: [
        "Improves time management and productivity.",
        "Ensures a balanced schedule with work and breaks.",
        "Reduces decision fatigue and procrastination.",
      ],
    },
  },
  {
    id: 7,
    title: "5-Hour Rule",
    description: "Dedicate 5 hours a week to learning and self-improvement.",
    details: {
      overview: `The 5-hour rule involves setting aside one hour each day for deliberate learning.`,
      steps: [
        "Choose a topic or skill to learn each week.",
        "Spend 1 hour daily reading, practicing, or reflecting.",
        "Track your progress and set specific learning goals.",
        "Apply your new knowledge to real-life scenarios.",
      ],
      benefits: [
        "Encourages continuous self-improvement.",
        "Keeps you competitive and innovative in your field.",
        "Enhances critical thinking and problem-solving skills.",
      ],
    },
  },
];

const StrategySection = () => {
  const [openId, setOpenId] = useState(null);

  const toggleDetails = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div id="strat" className="mt-20 text-gray-100 min-h-screen py-10 px-6">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-400">
          Explore Proven Strategies
        </h1>
        <p className="text-lg text-gray-400 mt-3">
          Elevate your focus, productivity, and career clarity with these expert techniques.
        </p>
      </header>

      {/* Strategy List */}
      <div className="space-y-8 flex justify-center items-center flex-col">
        {strategies.map((strategy) => (
          <div
            key={strategy.id}
            className="bg-gray-800 rounded-2xl w-11/12 lg:w-3/4 shadow-lg p-6 transition-transform transform hover:scale-105"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-blue-300">
                {strategy.title}
              </h2>
              <button
                onClick={() => toggleDetails(strategy.id)}
                className="bg-blue-500 text-gray-100 px-4 py-2 rounded-lg hover:bg-blue-400 transition focus:ring-2 focus:ring-blue-300"
              >
                {openId === strategy.id ? "Hide Details" : "Explore"}
              </button>
            </div>
            <p className="text-gray-400 mt-3">{strategy.description}</p>

            {/* Details Section */}
            <Transition
              show={openId === strategy.id}
              enter="transition-all duration-500 ease-out"
              enterFrom="opacity-0 max-h-0"
              enterTo="opacity-100 max-h-screen"
              leave="transition-all duration-500 ease-in"
              leaveFrom="opacity-100 max-h-screen"
              leaveTo="opacity-0 max-h-0"
            >
              <div className="mt-4 p-4 bg-gray-700 rounded-lg text-gray-300 overflow-hidden">
                <h3 className="text-lg font-bold mb-2">Overview</h3>
                <p className="mb-4">{strategy.details.overview}</p>
                <h3 className="text-lg font-bold mb-2">Steps</h3>
                <ul className="list-disc list-inside mb-4">
                  {strategy.details.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
                <h3 className="text-lg font-bold mb-2">Benefits</h3>
                <ul className="list-disc list-inside">
                  {strategy.details.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </Transition>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrategySection;