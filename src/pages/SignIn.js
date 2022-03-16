import React, { useRef } from 'react'
import { Login } from '../components/Login'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, signInWithGooglePopup, createUserDocumentFromAuth } from '../utils/firebase'

const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user)
}

export const SignIn = () => {

    const emailRef = useRef()
    const passwordRef = useRef()

    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
                .then((response) => {
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
                title="Sign In"
                button="Sign In"
                href="/signup"
                link="Sign Up"
                headerStatements="Need an Account?"
                emailInput={emailRef}
                passwordInput={passwordRef}
                btnFunction={login}
                button2="Sign In With Google"
                btnFunctionGoogle={logGoogleUser}
            />
        </div>
    )
}

