import React from 'react'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {

    const navigate = useNavigate()

    const logout = () => {
        navigate('/')
    }

    return (
        <header className='header-navbar'>
            <form id="form">
                <input type="text" id="search" className="search" placeholder="Search" />
            </form>
            <ul>
                <li>
                    <Link to='/movielist'>Movies</Link>
                </li>
                <li>
                    <Link to='/mymovies'>My Uploads</Link>
                </li>
                <li onClick={logout}>Logout</li>
            </ul>
        </header>
    )
}
