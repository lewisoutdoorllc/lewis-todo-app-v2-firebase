import React, { useRef } from 'react'
import { Login } from '../components/Login'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../utils/firebase'

export const SignUp = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    // const confirmPasswordRef = useRef()

    const register = async () => {
        try {
            await createUserWithEmailAndPassword( auth, emailRef.current.value, passwordRef.current.value )
                window.location = "/dashboard"
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
            />
        </div>
    )
}

