import React, { useState, useEffect } from 'react'
import './movielist.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from '../../config/env'

export default function MovieList({ movies, setMovies }) {

    useEffect(() => {
        if (!localStorage.getItem('authUser')) {
            return navigate('/')
        }


        if (movies.length === 0) {
            getMovieList()
        }
    }, [])

    const getMovieList = async () => {
        const result = await axios.get(`${baseURL}/api/Movie`)
        setMovies(result.data)
    }

    const navigate = useNavigate()

    const viewDetail = (movie) => {
        // to movie detail page
        navigate('/moviedetail', { state: movie })
    }

    return (
        <div className="movie-container">
            <main id="movies">
                {
                    movies.length > 0 && movies.map(movie => (
                        <div className="movie" key={movie.movieID} onClick={() => viewDetail(movie)}>
                            <img src={movie.s3ImgPath} alt={movie.title} />
                            <div className="movie-info">
                                <h3>{movie.title}</h3>
                                <div>
                                    <span>{movie.genre}</span>
                                    <span className='orange'>{movie.avgRating === 0 ? 'No Rating yet' : movie.avgRating}</span>
                                </div>
                            </div>
                            <div className="overview">
                                <h3>Overview</h3>
                                {movie.overview}
                            </div>
                        </div>
                    ))
                }
            </main>
        </div>
    )
}
