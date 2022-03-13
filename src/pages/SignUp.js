import React, { useRef } from 'react'
import { Login } from '../components/Login'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { setDoc, doc } from 'firebase/firestore'
import db from '../utils/firebase'

export const SignUp = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    // console.log(useRef())
    // console.log(emailRef)
    // console.log(passwordRef)
    // const confirmPasswordRef = useRef()
    // console.log(emailRef.current.value)

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
            // window.location = "/dashboard"
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

