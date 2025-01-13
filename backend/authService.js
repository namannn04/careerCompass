import { auth } from './firestore';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged 
} from 'firebase/auth';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Helper function to map Firebase error codes to user-friendly messages
function mapFirebaseError(errorCode) {
  const errorMap = {
    'auth/email-already-in-use': 'This email is already registered.',
    'auth/invalid-email': 'Invalid email address.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/weak-password': 'Password should be at least 6 characters long.',
  };
  return errorMap[errorCode] || 'An unknown error occurred.';
}

// Sign-Up Function
export async function signUp(email, password, name) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user details in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      name,
      email,
      createdAt: new Date(),
    });

    console.log('User signed up and details saved in Firestore:', user.uid);
    return user;
  } catch (error) {
    console.error('Error signing up:', error.message);
    throw new Error(mapFirebaseError(error.code));
  }
}

// Sign-In Function
export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in:', userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in:', error.message);
    throw new Error(mapFirebaseError(error.code));
  }
}

// Auth State Listener
export function authStateListener(callback) {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User is signed in:', user);
      callback(user);
    } else {
      console.log('User is signed out');
      callback(null);
    }
  });
  return unsubscribe;
}

// Sign-Out Function
export async function signOut() {
  try {
    await firebaseSignOut(auth);
    console.log('User signed out successfully.');
  } catch (error) {
    console.error('Error during sign out:', error.message);
    throw new Error('Failed to sign out.');
  }
}

// Get User Profile Function
export async function getUserProfile() {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No user is signed in.');
    }

    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error('No user data found.');
    }
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    throw error;
  }
}

// Update User Profile Function
export async function updateUserProfile(updates) {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No user is signed in.');
    }

    const docRef = doc(db, 'users', user.uid);
    const storage = getStorage();

    if (updates.profileImage instanceof File) {
      const storageRef = ref(storage, `profileImages/${user.uid}`);
      await uploadBytes(storageRef, updates.profileImage);
      const imageUrl = await getDownloadURL(storageRef);
      updates.profileImage = imageUrl;
    }

    await setDoc(docRef, updates, { merge: true });
    console.log('User profile updated successfully:', updates);
  } catch (error) {
    console.error('Error updating user profile:', error.message);
    throw error;
  }
}
