const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore") ;
require("dotenv").config({ path: "../.env" })


const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
    measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
  }
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const blogData = [
  {
    careerId: "software_engineering_001",
    careerName: "Software Engineer",
    title: "Navigating the Software Engineering Journey",
    quote: "Code is like humor. When you have to explain it, it’s bad.",
    quoteAuth: "Cory House",
    author: "John Doe",
    data: "Software engineering demands both technical prowess and soft skills. Proficiency in programming languages such as Python, Java, or Kotlin is crucial, along with knowledge of modern technologies like cloud computing. However, skills like critical thinking, problem-solving, and effective communication are equally important. Collaboration with diverse teams and continuous learning are key, as the tech industry evolves rapidly. Growth opportunities in software engineering are abundant. Emerging technologies like AI and machine learning create exciting prospects for those willing to upskill. Future trends include DevOps, microservices, and cybersecurity, which will drive demand for skilled engineers. Embracing user experience is also becoming increasingly significant. The work environment in software engineering is dynamic and collaborative. Contrary to the stereotype of isolation, engineers often work closely with product managers, designers, and other team members. Effective communication and teamwork are essential, making the work both challenging and rewarding. For newcomers, embrace the journey with curiosity and openness. Leverage any existing skills from other fields and seek mentorship. Remember, growth takes time, and it’s okay not to know everything from the start.",
    content: [
      {
        question: "What skills are necessary for this career?",
        answer:
          "Technical skills like programming in Python, Java, or Kotlin, cloud computing, and containerization are essential. Soft skills such as problem-solving and communication are equally important. Collaboration and a continuous learning mindset are crucial due to the industry's rapid evolution.",
      },
      {
        question:
          "What are the growth opportunities and future trends in this industry?",
        answer:
          "The software engineering field is vast and continuously evolving, offering numerous growth opportunities. With the rapid advancement of technologies like cloud computing, artificial intelligence, and machine learning, there’s always something new to learn. Future trends suggest an increasing focus on DevOps practices, microservices architecture, and cybersecurity. Additionally, there’s growing importance placed on understanding user experience.",
      },
      {
        question: "What type of work environment should one expect?",
        answer:
          "In software engineering, you can expect a collaborative and dynamic work environment. Contrary to the misconception that engineers work in isolation, the role often requires close interaction with cross-functional teams, including product managers, designers, and other engineers. Communication is key, and you’ll often need to explain your ideas and understand the perspectives of others.",
      },
      {
        question: "Advice I would give to someone starting this career?",
        answer:
          "If you’re considering a career in software engineering, especially from a non-traditional background, my advice is to embrace your unique journey. Don’t be afraid to ask questions, seek mentorship, and continuously learn. Software engineering isn’t just about coding—it also involves problem-solving, creativity, and communication. Leverage your existing skills, be curious, and let your passion drive you forward.",
      },
      {
        question: "What are the challenges that I faced in this field?",
        answer:
          "Transitioning into software engineering from a different field was daunting. One of the biggest challenges was overcoming self-doubt and the fear of lacking the right qualifications. Initially, understanding production codebases, working alongside senior developers, and learning best practices felt overwhelming. Balancing study time, work, and adapting to a steep learning curve was another challenge. However, with persistence, asking questions, and mentorship, I gradually gained confidence and proficiency.",
      },
      {
        question: "How did I get started in this field?",
        answer:
          "I began my journey into software engineering in an unconventional way. My background was in life sciences, and I initially pursued a career in psychology. However, my passion for technology, which started at a young age when I taught myself to code to create fan websites, eventually led me back to tech. After years of feeling unfulfilled in my chosen career path, I decided to pivot and explore opportunities in the tech industry. I started by taking on a technical support role, which gave me invaluable exposure to the software industry and ultimately led me to pursue a formal education in computer science. This experience, combined with self-study and determination, helped me transition into a software engineering role.",
      },
    ],
  },
];

async function addBlogsToFirestore() {
  const blogsCollection = collection(db, "blogs");

  for (const blog of blogData) {
    try {
      await addDoc(blogsCollection, blog);
      console.log(`Added blog for career: ${blog.careerId}`);
    } catch (error) {
      console.error(`Error adding blog for career ${blog.careerId}:`, error);
    }
  }
}

addBlogsToFirestore();
