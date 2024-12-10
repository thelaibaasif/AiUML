// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTH69MQtAhbB6D1PjRXi__iM5J_DqttcI",
  authDomain: "aiuml-e5dc9.firebaseapp.com",
  projectId: "aiuml-e5dc9",
  storageBucket: "aiuml-e5dc9.firebasestorage.app",
  messagingSenderId: "1019402397649",
  appId: "1:1019402397649:web:bd6c301d5a20ddf2e6e2f0",
  measurementId: "G-TN3FL5Q1S8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);