import axios from 'axios'
import React, { useEffect, useState, useContext, Fragment } from 'react'
import { AuthContext } from '../../App'
import './auth.css'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

export default function Auth() {

    const [auth, setAuth] = useContext(AuthContext)

    const [signupInfo, setSignupInfo] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
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

    const navigate = useNavigate()

    const login = async (e) => {
        e.preventDefault()
        try {
            const result = await axios.post('http://localhost:5240/api/Auth/login', {
                ...loginInfo
            })
            // login succeeded
            if (result.status == 200) {
                setAuth(result.data)
                localStorage.setItem('authUser', JSON.stringify(result.data))
                navigate('/movielist')
            }
        } catch (error) {
            // login fail
            setAuth(null)
            toast.error('Wrong Credentials !', {
                position: toast.POSITION.TOP_CENTER
            })
        }
    }

    const signup = async (e) => {
        e.preventDefault()
        try {
            const result = await axios.post('http://localhost:5240/api/Auth/signup', {
                ...signupInfo
            })
            console.log(result);
            // sign up succeeded
            if (result.status == 201) {
                setAuth(result.data)
                navigate('/movielist')
            }
        } catch (error) {
            setAuth(null)
            toast.error('Email alreay exists !', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
        }
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
                        <input type="email" placeholder="Email" name="email" value={loginInfo.email} onChange={onLoginInfoChange} required />
                        <input type="password" placeholder="Password" name="password" value={loginInfo.password} onChange={onLoginInfoChange} required />
                        <button type="submit">Login</button>
                    </form>

                    <form className="form-signup hide" onSubmit={signup}>
                        <h1>Sign up</h1>
                        <input type="text" placeholder="First Name" name="firstName" value={signupInfo.firstName} onChange={onSignupInfoChange} required />
                        <input type="text" placeholder="Last Name" name="lastName" value={signupInfo.lastName} onChange={onSignupInfoChange} required />
                        <input type="email" placeholder="Email" name="email" value={signupInfo.email} onChange={onSignupInfoChange} required />
                        <input type="password" placeholder="Password" name="password" value={signupInfo.password} onChange={onSignupInfoChange} required />
                        <button type="submit">Sign up</button>

                    </form>
                </div>
                <div className="to-signup">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal information to sign up</p>
                    <button className="btn btn-to-signup">Sign up</button>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
        </div>

    )
}
