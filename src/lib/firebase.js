// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ... (imports)

// Your web app's Firebase configuration
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
let app;
let analytics;
let auth;
let db;

try {
    app = initializeApp(firebaseConfig);
    // Initialize Auth and Firestore first as they are critical
    auth = getAuth(app);
    db = getFirestore(app);

    // Disable offline persistence to avoid connection issues
    // This ensures writes go directly to server
    if (db) {
        console.log("Firebase Firestore initialized successfully");
    }
} catch (error) {
    console.error("Firebase critical initialization error:", error);
}

// Initialize Analytics separately as it might fail in some environments or be blocked
try {
    if (app && typeof window !== 'undefined') {
        analytics = getAnalytics(app);
    }
} catch (error) {
    console.warn("Firebase Analytics failed to initialize:", error);
}

export { auth, db };
