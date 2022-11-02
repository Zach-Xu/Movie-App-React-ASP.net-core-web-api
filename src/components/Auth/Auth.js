import React, { useEffect, useState } from 'react'
import './auth.css'

export default function Auth() {

    const [signupInfo, setSignupInfo] = useState({
        email: '',
        password: ''
    })

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        const btn_to_signup = document.querySelector('.btn-to-signup')
        const btn_to_login = document.querySelector('.btn-to-login')
        const form_container = document.querySelector('.form')
        const forms = document.querySelectorAll('form')

        // switch to sign up
        btn_to_signup.addEventListener('click', () => {
            forms[0].classList.add('hide')
            forms[1].classList.remove('hide')
            form_container.style.transform = 'rotateY(180deg)'
        })

        // switch to log in 
        btn_to_login.addEventListener('click', () => {
            forms[1].classList.add('hide')
            forms[0].classList.remove('hide')
            form_container.style.transform = 'none'
        })
    }, [])

    const login = e => {
        e.preventDefault()
    }

    const signup = e => {
        e.preventDefault()
    }

    const onLoginInfoChange = e => {
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value
        })
    }

    const onSignupInfoChange = e => {
        setSignupInfo({
            ...signupInfo,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="auth-container">
            <div className="container">
                <div className="to-login">
                    <h1>Welcome back!</h1>
                    <p>Enter your credentials to log in</p>
                    <button className="btn btn-to-login">Log in</button>
                </div>
                <div className="form">
                    <form className="form-login" onSubmit={login}>
                        <h1>Log in</h1>
                        <input type="text" placeholder="Email" name="email" value={loginInfo.email} onChange={onLoginInfoChange} />
                        <input type="password" placeholder="Password" name="password" value={loginInfo.password} onChange={onLoginInfoChange} />
                        <button type="submit">Login</button>
                    </form>

                    <form className="form-signup hide" onSubmit={signup}>
                        <h1>Sign up</h1>
                        <input type="text" placeholder="Email" name="email" value={signupInfo.email} onChange={onSignupInfoChange} />
                        <input type="password" placeholder="Password" name="password" value={signupInfo.password} onChange={onSignupInfoChange} />
                        <button type="submit">Sign up</button>

                    </form>
                </div>
                <div className="to-signup">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal information to sign up</p>
                    <button className="btn btn-to-signup">Sign up</button>
                </div>
            </div>
        </div>
    )
}
