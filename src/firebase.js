import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   
    apiKey: "AIzaSyDpweq9N7KPr6mM8FrVRkOg-phdG0rQWvE",
    authDomain: "task-manager-3bb97.firebaseapp.com",
    projectId: "task-manager-3bb97",
    storageBucket: "task-manager-3bb97.firebasestorage.app",
    messagingSenderId: "922671309716",
    appId: "1:922671309716:web:14ebfe7fc8088f0caae581"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

