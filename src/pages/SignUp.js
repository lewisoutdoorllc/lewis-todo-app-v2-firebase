import React, { useRef } from 'react'
import { Login } from '../components/Login'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {
    auth,
    signInWithGooglePopup,
    createUserDocumentFromAuth,
} from '../utils/firebase'
import { setDoc, doc } from 'firebase/firestore'
import db from '../utils/firebase'

export const SignUp = () => {
    // LOGIN WITH GOOGLE USING POPUP
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
        window.location = "/dashboard"
    }
    const emailRef = useRef()
    const passwordRef = useRef()
    const register = async () => {
        try {
            // CREATES A USER
            await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
                .then(async (response) => {
                    // CREATES A NEW USER AND DOCUMENT
                    await setDoc(doc(db, 'users', `${response.user.uid}`), {
                        email: emailRef.current.value,
                        password: passwordRef.current.value,
                        uid: response.user.uid,
                        task: [
                            {
                                text: '',
                                status: false
                            }
                        ],
                    })
                    if (response) {
                        window.location = "/dashboard"
                    }
                })
        }
        catch (error) {
            alert(error.message)
        }
    }

    return (
        <div>
            <Login
                title="Sign Up"
                button="Sign Up"
                href="/"
                link="Sign In"
                headerStatements="Already have an account?"
                emailInput={emailRef}
                passwordInput={passwordRef}
                btnFunction={register}
                button2="Sign Up With Google"
                btnFunctionGoogle={logGoogleUser}
            />
        </div>
    )
}

