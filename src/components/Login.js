import React from 'react'
import '../styles/Login.css'



export const Login = ({ title, button, href, link, headerStatements, emailInput, passwordInput, btnFunction }) => {
    console.log(emailInput)
    return (
        <div className="login">
            <div className="login-container">
                <h1 className="login-heading">{title}</h1>
                <input ref = {emailInput} type="email" className="login-email" placeholder="Email"></input>
                <input ref={passwordInput} type="password" className="login-password" placeholder="Password"></input>
                <button onClick={btnFunction} className="login-button">{button}</button>
                <div className="links">
                    <p>{headerStatements}</p>
                    <a href={href}>{link}</a>
                </div>
            </div>
        </div>
    )
}
