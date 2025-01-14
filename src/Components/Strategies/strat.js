export const strategies = [
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
  {
    id: 8,
    title: "Mindfulness Meditation",
    description: "Improve focus and reduce stress through mindfulness.",
    details: {
      overview: `Mindfulness meditation helps you stay present and develop better focus by observing your thoughts without judgment.`,
      steps: [
        "Find a quiet place and sit comfortably.",
        "Close your eyes and focus on your breath.",
        "When your mind wanders, gently bring it back to your breath.",
        "Practice daily for 5-10 minutes, gradually increasing the duration.",
      ],
      benefits: [
        "Enhances concentration and mental clarity.",
        "Reduces anxiety and stress levels.",
        "Promotes emotional well-being and resilience.",
      ],
    },
  },
  {
    id: 9,
    title: "SMART Goals Framework",
    description: "Set achievable goals with the SMART criteria.",
    details: {
      overview: `The SMART framework ensures your goals are clear and attainable by focusing on five aspects:
        - Specific: Define the goal clearly.
        - Measurable: Include criteria to track progress.
        - Achievable: Set realistic and attainable objectives.
        - Relevant: Align the goal with your long-term plans.
        - Time-bound: Specify a deadline for achieving the goal.`,
      steps: [
        "Identify a specific goal you want to achieve.",
        "Break it down into measurable milestones.",
        "Assess the feasibility of the goal within your resources.",
        "Ensure the goal aligns with your values and priorities.",
        "Set a deadline and create an action plan.",
      ],
      benefits: [
        "Provides a clear direction and purpose.",
        "Increases motivation by breaking goals into manageable steps.",
        "Improves time management and accountability.",
      ],
    },
  },
  {
    id: 10,
    title: "Digital Detox",
    description: "Enhance productivity by limiting screen time.",
    details: {
      overview: `A digital detox involves consciously reducing screen time to minimize distractions and improve focus.`,
      steps: [
        "Set specific times for checking emails and social media.",
        "Use apps or tools to track and limit screen time.",
        "Create phone-free zones, like the bedroom or dining area.",
        "Engage in offline activities, such as reading or outdoor sports.",
      ],
      benefits: [
        "Reduces mental fatigue and screen-related stress.",
        "Enhances productivity by eliminating distractions.",
        "Improves sleep quality and overall well-being.",
      ],
    },
  },
  {
    id: 11,
    title: "Pareto Principle (80/20 Rule)",
    description: "Focus on the 20% of tasks that yield 80% of results.",
    details: {
      overview: `The Pareto Principle helps prioritize tasks by identifying the most impactful activities.`,
      steps: [
        "List all tasks and responsibilities.",
        "Identify the tasks that contribute the most value or results.",
        "Focus your energy on these high-impact tasks.",
        "Delegate or minimize low-priority tasks.",
      ],
      benefits: [
        "Maximizes efficiency and output.",
        "Helps focus on what's truly important.",
        "Reduces wasted time and effort on trivial tasks.",
      ],
    },
  },
  {
    id: 12,
    title: "Eat That Frog",
    description: "Start your day by tackling the hardest task first.",
    details: {
      overview: `This technique emphasizes prioritizing the most challenging or important task early in the day when your energy and willpower are at their peak.`,
      steps: [
        "Identify your 'frog'—the hardest or most important task.",
        "Complete this task first thing in the morning.",
        "Move on to less demanding tasks after finishing the 'frog.'",
        "Repeat daily for consistent productivity.",
      ],
      benefits: [
        "Reduces procrastination and boosts motivation.",
        "Sets a positive tone for the rest of the day.",
        "Helps accomplish key priorities efficiently.",
      ],
    },
  },
  {
    id: 13,
    title: "Active Recall Technique",
    description: "Enhance learning by testing yourself actively.",
    details: {
      overview: `Active recall involves retrieving information from memory without relying on notes, strengthening long-term retention.`,
      steps: [
        "Study a topic briefly and close your notes.",
        "Write down or say out loud everything you remember.",
        "Compare your recollection with the source material.",
        "Focus on areas where you struggle and repeat the process.",
      ],
      benefits: [
        "Improves memory retention and understanding.",
        "Identifies weak points in your knowledge.",
        "Makes study sessions more effective and engaging.",
      ],
    },
  },
  {
    id: 14,
    title: "Feynman Technique",
    description: "Master any topic by teaching it to someone else.",
    details: {
      overview: `The Feynman Technique involves simplifying complex concepts into plain language to improve understanding.`,
      steps: [
        "Choose a topic you want to learn.",
        "Write an explanation as if teaching a beginner.",
        "Identify gaps in your understanding and review the material.",
        "Refine your explanation until it's simple and clear.",
      ],
      benefits: [
        "Deepens understanding of difficult topics.",
        "Reveals areas that need further study.",
        "Encourages critical thinking and clarity.",
      ],
    },
  },
  {
    id: 15,
    title: "Visualization Technique",
    description: "Achieve goals by mentally rehearsing success.",
    details: {
      overview: `Visualization involves imagining yourself successfully achieving your goals, which boosts confidence and focus.`,
      steps: [
        "Set a specific goal you want to achieve.",
        "Close your eyes and visualize the steps to achieve it in vivid detail.",
        "Imagine overcoming challenges and reaching the desired outcome.",
        "Practice daily to reinforce your mental image.",
      ],
      benefits: [
        "Increases motivation and confidence.",
        "Strengthens focus and determination.",
        "Improves performance by reducing anxiety and self-doubt.",
      ],
    },
  },
  {
    id: 16,
    title: "Kaizen Technique (Japan)",
    description:
      "Achieve continuous improvement through small, consistent steps.",
    details: {
      overview: `Kaizen, meaning 'change for better' in Japanese, focuses on making gradual and consistent improvements in life or work.`,
      steps: [
        "Set a small, achievable goal or improvement area.",
        "Break it into smaller, manageable tasks.",
        "Implement these changes daily and track progress.",
        "Reflect and adapt to make the process more efficient.",
      ],
      benefits: [
        "Encourages sustainable growth and development.",
        "Prevents burnout by focusing on incremental changes.",
        "Builds discipline and long-term success habits.",
      ],
    },
  },
  {
    id: 17,
    title: "Danish Hygge Practice (Denmark)",
    description: "Find joy and balance through comfort and well-being.",
    details: {
      overview: `Hygge is a Danish concept of creating a cozy, comfortable environment to enhance mental clarity and focus.`,
      steps: [
        "Create a calm and clutter-free workspace.",
        "Incorporate comforting elements like soft lighting or soothing music.",
        "Take regular breaks to enjoy small pleasures like tea or a walk.",
        "Foster a positive and supportive work or study environment.",
      ],
      benefits: [
        "Reduces stress and improves mental well-being.",
        "Enhances focus by promoting a relaxed state of mind.",
        "Encourages a healthy work-life balance.",
      ],
    },
  },
  {
    id: 18,
    title: "Bullet Journaling",
    description: "Organize tasks and goals in a creative, personalized way.",
    details: {
      overview: `Bullet journaling combines planning, note-taking, and journaling into a customizable system for personal organization.`,
      steps: [
        "Set up a notebook with sections for tasks, events, and notes.",
        "Use bullets, symbols, and colors to organize information.",
        "Regularly update and review your journal.",
        "Incorporate habit tracking or goal-setting as needed.",
      ],
      benefits: [
        "Improves focus and accountability.",
        "Encourages mindfulness and self-reflection.",
        "Fosters creativity and self-expression.",
      ],
    },
  },
  {
    id: 19,
    title: "Mind Mapping",
    description: "Visualize ideas and concepts to improve understanding.",
    details: {
      overview: `Mind mapping involves creating a visual diagram to organize thoughts, brainstorm ideas, and clarify concepts.`,
      steps: [
        "Write a central idea or goal in the center of a page.",
        "Draw branches for related topics or sub-goals.",
        "Expand each branch with supporting details or tasks.",
        "Use colors and symbols to enhance clarity and retention.",
      ],
      benefits: [
        "Enhances creativity and problem-solving skills.",
        "Simplifies complex ideas and improves memory retention.",
        "Encourages a holistic view of tasks or concepts.",
      ],
    },
  },
];
