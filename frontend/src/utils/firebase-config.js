// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwn_Un20SqmtIqPyKmfAhfQbAGXjaymQU",
  authDomain: "flixxit-main-8c1a0.firebaseapp.com",
  projectId: "flixxit-main-8c1a0",
  storageBucket: "flixxit-main-8c1a0.appspot.com",
  messagingSenderId: "1081859999404",
  appId: "1:1081859999404:web:0785fc525b6a5bf896c109",
  measurementId: "G-1F0FHXVPNG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const db = getFirestore(app);


