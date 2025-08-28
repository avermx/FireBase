import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDcmotQULK8byl4nQSV2AXtlDhWOI_VhuE",
  authDomain: "todo-6d23d.firebaseapp.com",
  projectId: "todo-6d23d",
  storageBucket: "todo-6d23d.firebasestorage.app",
  messagingSenderId: "76855814933",
  appId: "1:76855814933:web:cde56e3fc02638cb4e171c",
  measurementId: "G-2TC0SY9M37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;