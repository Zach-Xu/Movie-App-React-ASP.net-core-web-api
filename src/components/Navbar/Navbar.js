import React, { useContext, useState } from 'react'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import { baseURL } from '../../config/env';

export default function Navbar({ setMovies }) {

    const [auth, setAuth] = useContext(AuthContext)

    const navigate = useNavigate()

    const logout = () => {
        setAuth(null)
        localStorage.removeItem('authUser')
        navigate('/')
    }

    const [keyword, setKeyword] = useState('')
    const [searchType, setSearchType] = useState('rating')

    const searchMovies = async (e) => {
        e.preventDefault()
        try {
            if (keyword.trim() === '') {
                const result = await axios.get(`${baseURL}/api/Movie`)
                setMovies(result.data)
                navigate('/movielist')
                return
            }
            switch (searchType) {
                case 'rating':
                    if (isNaN(keyword)) {
                        toast.error('Not a valid rating', {
                            position: toast.POSITION.TOP_CENTER
                        })
                    } else {
                        const result = await axios.get(`${baseURL}/api/Movie/ratingabove?rating=${keyword}`)
                        setMovies(result.data)
                        navigate('/movielist')
                    }
                    break
                case 'genre':
                    const result = await axios.get(`${baseURL}/api/Movie/genre?genre=${keyword}`)
                    setMovies(result.data)
                    navigate('/movielist')
                    break
                default:
                    return
            }
        } catch (error) {
            setMovies([])
            toast.error('Fail to search movies', {
                position: toast.POSITION.TOP_CENTER
            })
        }
    }

    return (
        <>
            <header className='header-navbar'>
                <form id="form" onSubmit={searchMovies}>
                    <input type="text" id="search" className="search" placeholder="Search"
                        value={keyword} onChange={e => setKeyword(e.target.value)} />
                    <select name="" value={searchType} onChange={e => setSearchType(e.target.value)}>
                        <option value="rating">By Rating</option>
                        <option value="genre">By Genre</option>
                    </select>
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
            <ToastContainer />
        </>
    )
}
