// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase Config (Find it in Firebase Console -> Project Settings)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "NickPhotoPortfolio.firebaseapp.com",
  projectId: "nickphotoportfolio",
  storageBucket: "NickPhotoPortfolio.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(); // Google Provider
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, db, storage };

