// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVXoF1qRtvMF5p6GCmomVcJDmFmR5cZKE",
  authDomain: "flicks-gpt-6d005.firebaseapp.com",
  projectId: "flicks-gpt-6d005",
  storageBucket: "flicks-gpt-6d005.firebasestorage.app",
  messagingSenderId: "107934811752",
  appId: "1:107934811752:web:d42dd286b680a602ed5ddd",
  measurementId: "G-FGCKNPCHHR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
