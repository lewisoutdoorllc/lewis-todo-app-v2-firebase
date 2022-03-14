// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDvsQl7iu_k5S-FOmQ8qHgn7307WpmVx40",
    authDomain: "lewis-todo-app.firebaseapp.com",
    projectId: "lewis-todo-app",
    storageBucket: "lewis-todo-app.appspot.com",
    messagingSenderId: "1086997740677",
    appId: "1:1086997740677:web:5eb0097504301b70ff7dec",
    measurementId: "G-Y15F3VZ5GS"
};

// Intialize the Firebase app
const app = initializeApp(firebaseConfig);
const db = getFirestore();
// GOOGLE AUTHENTICATION 
const provider = new GoogleAuthProvider();
// THIS FORCES A USER TO SELECT AN ACCOUNT
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth(app);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export default db;



