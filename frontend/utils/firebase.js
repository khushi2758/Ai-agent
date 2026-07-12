// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "agai-38139.firebaseapp.com",
  projectId: "agai-38139",
  storageBucket: "agai-38139.firebasestorage.app",
  messagingSenderId: "279035651306",
  appId: "1:279035651306:web:7a3875f7682f9e8a79e393",
  measurementId: "G-0VH5X9J0M5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
