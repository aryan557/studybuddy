import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "studdybuddy-9df08.firebaseapp.com",
  projectId: "studdybuddy-9df08",
  storageBucket: "studdybuddy-9df08.firebasestorage.app",
  messagingSenderId: "539579764076",
  appId: "1:539579764076:web:5c327953b1f05eaee17749",
  measurementId: "G-FEP8KE4K6Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };