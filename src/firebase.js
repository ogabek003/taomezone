// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// 🔥 Sizning Firebase loyihangiz ma’lumotlari:
const firebaseConfig = {
  apiKey: "AIzaSyAOwWEuRs6S3VcS1lTOdTXBU4HpZgqOFb0",
  authDomain: "taomzone.firebaseapp.com",
  projectId: "taomzone",
  storageBucket: "taomzone.appspot.com",
  messagingSenderId: "21847199595",
  appId: "1:21847199595:web:be110eabdb070663a7062e",
  measurementId: "G-HY19XJ60Y8",
};

// 🔧 Firebase ilovasini ishga tushirish
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
