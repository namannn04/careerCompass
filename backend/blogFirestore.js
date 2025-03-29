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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const blogData = [
  {
    "careerId": "political_consultant_012",
    "careerName": "Political Consultant",
    "title": "Shaping Political Narratives: The Strategic Role of Political Consultants",
    "quote": "Politics is not the art of the possible. It consists in choosing between the disastrous and the unpalatable.",
    "quoteAuth": "John Kenneth Galbraith",
    "author": "Alexander Wilson",
    "data": "Political Consultants provide strategic guidance to candidates, elected officials, political parties, and advocacy organizations to help them achieve their political objectives. They develop campaign strategies, craft messaging, conduct research, manage communications, coordinate field operations, and analyze data to inform decision-making. Their work spans electoral campaigns, legislative initiatives, issue advocacy, and crisis management in the political arena. Political Consultants combine knowledge of political systems, voter behavior, media dynamics, and campaign tactics with specialized skills in areas such as polling, advertising, fundraising, or digital strategy. They operate in a high-stakes environment where strategic decisions can determine electoral outcomes, policy successes, and political careers.",
    "content": [
      {
        "question": "What skills are necessary for this career?",
        "answer": "Successful Political Consultants possess strong strategic thinking abilities, exceptional communication skills, and deep understanding of political systems and voter psychology. Data analysis capabilities, media relations expertise, and project management skills are essential for campaign operations. Writing proficiency for speeches, press releases, and advertising copy is valuable. Knowledge of polling methodology, digital campaign tactics, and fundraising strategies provides important technical foundation. Adaptability, discretion, and the ability to work effectively under intense pressure and scrutiny are crucial personal attributes for success in this field."
      },
      {
        "question": "What are the growth opportunities and future trends in this industry?",
        "answer": "Career paths typically progress from campaign staff positions to specialized consultant roles to senior strategist positions. Many consultants develop expertise in specific areas such as media relations, digital strategy, or data analytics before broadening their services. Future trends include increased use of AI and predictive analytics in targeting voters, growing importance of digital organizing and social media strategy, and the rise of specialized consultants for navigating disinformation challenges. The internationalization of political consulting is creating opportunities to work on campaigns globally, while the growing polarization in many democracies is changing the nature of campaign strategy."
      },
      {
        "question": "What type of work environment should one expect?",
        "answer": "Political Consultants typically work in fast-paced, high-pressure environments with irregular hours that intensify during campaign seasons or legislative sessions. Work settings vary from campaign headquarters and government offices to consulting firms and home offices for independent consultants. The work involves a mix of strategic planning sessions, client meetings, field activities, and independent analysis. Travel is common, particularly for consultants working on national campaigns or with multiple clients. The political nature of the work creates an environment where results are public and scrutiny is intense."
      },
      {
        "question": "What are the challenges faced in this field?",
        "answer": "Challenges include managing the cyclical nature of campaign work, navigating ethical dilemmas around messaging and tactics, and maintaining work-life balance during intense campaign periods. Consultants must adapt to rapidly changing political landscapes and news cycles that can upend strategies overnight. They often face the challenge of working with difficult personalities and managing conflicting stakeholder expectations. The public nature of political work means failures are visible and can affect professional reputation. The partisan nature of politics can also limit future client opportunities based on past affiliations."
      },
      {
        "question": "How did I get started in this field?",
        "answer": "My journey began as a volunteer on local campaigns, which provided hands-on experience with voter contact and campaign operations. I pursued formal education in political science and communications, then secured a staff position on a congressional campaign. Working in various campaign roles—from field organizer to communications assistant—built my understanding of different aspects of political operations. I developed specialized expertise in digital strategy, which became my entry point to consulting. Building a network of political professionals through campaign work and political organizations was crucial for securing clients when I established my consulting practice."
      }
    ]
  }
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