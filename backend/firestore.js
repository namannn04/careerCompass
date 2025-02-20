import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { getAnalytics } from "firebase/analytics"
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore"

// Accessing environment variables using Vite's import.meta.env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

// Firebase for the existing project
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getFirestore(app)

// Configuration for the Authentication Firebase project
const newFirebaseConfig = {
  apiKey: "AIzaSyBA2vd-1Ao5NCatLUX08_m6RIjmbQ4invE",
  authDomain: "careercompass-87188.firebaseapp.com",
  projectId: "careercompass-87188",
  storageBucket: "careercompass-87188.firebasestorage.app",
  messagingSenderId: "1072297432320",
  appId: "1:1072297432320:web:601b7e3a29026a97174fe5",
  measurementId: "G-5D55Z3L5JZ",
}

// Initialize Firebase for the new project
const newApp = initializeApp(newFirebaseConfig, "newApp")
const newAnalytics = getAnalytics(newApp)
const newDb = getFirestore(newApp)
const auth = getAuth(newApp)

// Function to add blogs to Firestore
export async function addBlogsToFirestore(blogData) {
  const blogsCollection = collection(db, "blogs")

  for (const blog of blogData) {
    try {
      await addDoc(blogsCollection, blog)
      console.log(`Added blog for career: ${blog.careerId}`)
    } catch (error) {
      console.error(`Error adding blog for career ${blog.careerId}:`, error)
    }
  }
}

// Function to get blog for a specific career
export async function getBlogForCareer(careerId) {
  const blogsCollection = collection(db, "blogs")
  const q = query(blogsCollection, where("careerId", "==", careerId))

  try {
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      const blogDoc = querySnapshot.docs[0]
      return { id: blogDoc.id, ...blogDoc.data() }
    } else {
      console.log(`No blog found for career: ${careerId}`)
      return null
    }
  } catch (error) {
    console.error("Error fetching blog:", error)
    return null
  }
}

export { app, analytics, db, newApp, newAnalytics, newDb, auth, onAuthStateChanged, signOut }

