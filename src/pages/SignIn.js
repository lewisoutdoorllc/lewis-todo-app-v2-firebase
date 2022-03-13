import React, { useRef } from 'react'
import { Login } from '../components/Login'
import { auth } from '../utils/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'


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
            // window.location = "/dashboard"
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
            />
        </div>
    )
}

