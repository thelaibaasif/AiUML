// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEUPxhd7gJcgcuJpUBldc5TBJ3IUU_niE",
  authDomain: "aiuml-c6b88.firebaseapp.com",
  projectId: "aiuml-c6b88",
  storageBucket: "aiuml-c6b88.firebasestorage.app",
  messagingSenderId: "683232317067",
  appId: "1:683232317067:web:7e6d8b4fadbb39d4f4ce8e",
  measurementId: "G-LF441GZ52N",
  databaseURL: "https://aiuml-c6b88-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const realTimeDb = getDatabase(app);