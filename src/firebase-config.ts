// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRaxp7P_hMJcIrn_vhR8Qvifzpw5RHsyA",
  authDomain: "docs-clone-e4dca.firebaseapp.com",
  projectId: "docs-clone-e4dca",
  storageBucket: "docs-clone-e4dca.firebasestorage.app",
  messagingSenderId: "1029042518747",
  appId: "1:1029042518747:web:d63944a86cc74f0701eafe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)