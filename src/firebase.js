
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "munitask-994ce.firebaseapp.com",
    projectId: "munitask-994ce",
    storageBucket: "munitask-994ce.appspot.com",
    messagingSenderId: "389432040413",
    appId: "1:389432040413:web:42c694de45044dad5d3434",
    measurementId: "G-X48F0CEJ6Y"
  };
  const app = initializeApp(firebaseConfig);
  // export const db = getDatabase(app);
  export const db = getFirestore(app);