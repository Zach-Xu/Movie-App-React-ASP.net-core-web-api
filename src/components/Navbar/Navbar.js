import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <header>
            <form id="form">
                <input type="text" id="search" className="search" placeholder="Search" />
            </form>
            <ul>
                <li>
                    <Link to='/mymovies'>MyMovies</Link>
                </li>
                <li>Logout</li>
            </ul>
        </header>
    )
}
