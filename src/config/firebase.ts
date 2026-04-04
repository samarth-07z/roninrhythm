import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtgUvJKyd_3dAkmmOj1ViEO-6qx2oaJng",
  authDomain: "ronin-rhythm.firebaseapp.com",
  databaseURL: "https://ronin-rhythm-default-rtdb.firebaseio.com",
  projectId: "ronin-rhythm",
  storageBucket: "ronin-rhythm.firebasestorage.app",
  messagingSenderId: "134825099555",
  appId: "1:134825099555:web:3199070abbca87b6aa8c96",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Realtime Database
export const db = getDatabase(app);

export default app;
