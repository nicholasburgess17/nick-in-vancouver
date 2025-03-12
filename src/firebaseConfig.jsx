// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

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
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };
