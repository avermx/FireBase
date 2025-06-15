
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD8s2E1l-jF7pQ1GZa9NEqGbV29ad1vAA4",
  authDomain: "anmollundlele.firebaseapp.com",
  projectId: "anmollundlele",
  storageBucket: "anmollundlele.firebasestorage.app",
  messagingSenderId: "664650622533",
  appId: "1:664650622533:web:209d908fcb40730408e52c"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app)
export default app;