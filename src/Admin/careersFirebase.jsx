// firebase.js
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Collection reference
const careersCollection = collection(db, 'careers');

// Get all careers
export async function getCareers() {
  const careersQuery = query(careersCollection, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(careersQuery);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    datePosted: formatDate(doc.data().createdAt?.toDate())
  }));
}

// Add a new career
export async function addCareer(careerData) {
  return await addDoc(careersCollection, {
    ...careerData,
    createdAt: serverTimestamp()
  });
}

// Update a career
export async function updateCareer(id, careerData) {
  const careerRef = doc(db, 'careers', id);
  return await updateDoc(careerRef, {
    ...careerData,
    updatedAt: serverTimestamp()
  });
}

// Delete a career
export async function deleteCareer(id) {
  const careerRef = doc(db, 'careers', id);
  return await deleteDoc(careerRef);
}

// Format date helper
function formatDate(date) {
  if (!date) return 'Just now';
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

export { db };