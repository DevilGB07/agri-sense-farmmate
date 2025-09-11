// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0O20IuZxjR9kk1BuWiXv5woElGVUwIEA",
  authDomain: "agri-sense-47e90.firebaseapp.com",
  projectId: "agri-sense-47e90",
  storageBucket: "agri-sense-47e90.firebasestorage.app",
  messagingSenderId: "113882069989",
  appId: "1:113882069989:web:1b0a9a2e4326cb0890cd0c",
  measurementId: "G-ZHVW3D87L0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
