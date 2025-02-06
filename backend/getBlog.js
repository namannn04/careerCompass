import { initializeApp } from "firebase/app"
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"

// Your Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

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

