import React, { useRef } from 'react'
import { Login } from '../components/Login'


export const SignIn = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
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
            />
        </div>
    )
}

