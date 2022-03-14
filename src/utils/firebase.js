// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    // createUserWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDvsQl7iu_k5S-FOmQ8qHgn7307WpmVx40",
    authDomain: "lewis-todo-app.firebaseapp.com",
    projectId: "lewis-todo-app",
    storageBucket: "lewis-todo-app.appspot.com",
    messagingSenderId: "1086997740677",
    appId: "1:1086997740677:web:5eb0097504301b70ff7dec",
    measurementId: "G-Y15F3VZ5GS"
};

//  ====== Intialize the Firebase app =====
//  =======================================
const app = initializeApp(firebaseConfig);
const db = getFirestore();

// GOOGLE AUTHENTICATION  ===========================================================
// GoogleAuthProvider is a class that is why we use new to create an instance of it
//===================================================================================
const googleProvider = new GoogleAuthProvider();
//  ===== THIS FORCES A USER TO SELECT AN ACCOUNT ======
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoggleRedirect = () => signInWithRedirect(auth, googleProvider);

export const createUserDocumentFromAuth = async (userAuth) => {
    if (!userAuth) return;
    //  ===== CREATES A NEW USER AND DOCUMENT IN USERS COLLECTION =======
    const userDocRef = doc(db, 'users', `${userAuth.uid}`);
    console.log(userDocRef);
    //  ===== GET DOCUMENT SNAPSHOT FROM USERS COLLECTION ========
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
        window.location = "/dashboard"
    }
    console.log(userAuth);
    // console.log(userSnapshot.exists());
    //  ===== IF USER DATA DOES NOT EXIST, CREATE A NEW USER AND DOCUMENT =======
    if (!userSnapshot.exists()) {
        const { email, displayName, uid } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                email,
                displayName,
                createdAt,
                uid,
            })
        }
        catch (error) {
            console.log('Error Creating User', error.message);
            // alert(error.message)
        }
        //  ===== IF USER DATA DOES EXIST, RETURN USER DATA ===============
        return userDocRef;
    }
}

// USER EMAIL AND PASSWORD AUTHENTICATION  =====================================
//==============================================================================
// export const createAuthUserWithEmailAndPassword = async (email, password) => {
//     if(!email || !password) return;

//     return await createUserWithEmailAndPassword(auth, email, password);
// }

//  ===== DEFAULT EXPORTS FOR FIREBASE =====
//  ========================================
export const auth = getAuth(app);
export default db;




