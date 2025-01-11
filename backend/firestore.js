import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For authentication
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Accessing environment variables using Vite's import.meta.env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase for the existing project
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Optional, if you're using analytics
const db = getFirestore(app); // Initialize Firestore

// Configuration for the new Firebase project
const newFirebaseConfig = {
  apiKey: "AIzaSyBA2vd-1Ao5NCatLUX08_m6RIjmbQ4invE",
  authDomain: "careercompass-87188.firebaseapp.com",
  projectId: "careercompass-87188",
  storageBucket: "careercompass-87188.firebasestorage.app",
  messagingSenderId: "1072297432320",
  appId: "1:1072297432320:web:601b7e3a29026a97174fe5",
  measurementId: "G-5D55Z3L5JZ"
};

// Initialize Firebase for the new project
const newApp = initializeApp(newFirebaseConfig, "newApp");
const newAnalytics = getAnalytics(newApp);
const newDb = getFirestore(newApp);
const auth = getAuth(newApp); // Initialize authentication for the new project

export { app, analytics, db, newApp, newAnalytics, newDb, auth };
