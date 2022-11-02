import React, { useState } from 'react'
import './movielist.css'
import { useNavigate } from 'react-router-dom'

export default function MovieList() {

    const [movies, setMovies] = useState([
        {
            id: 1,
            imgPath: 'https://image.tmdb.org/t/p/w1280/aGBuiirBIQ7o64FmJxO53eYDuro.jpg',
            title: 'Jeepers Creepers: Reborn',
            genre: 'Fiction',
            averageRate: 8.4,
            overview: 'Forced to travel with her boyfriend to a horror festival, Laine begins to experience disturbing visions associated with the urban legend of The Creeper.As the festival arrives and the blood- soaked entertainment builds to a frenzy, she becomes the center of it while something unearthly has been summoned.'
        }
    ])

    const navigate = useNavigate()

    const viewDetail = (id) => {
        // to movie detail page
        navigate('/moviedetail')
    }

    return (
        <div className="movie-container">
            <main id="movies">
                {
                    movies.length > 0 && movies.map(movie => (
                        <div className="movie" key={movie.id} onClick={() => viewDetail(movie.id)}>
                            <img src={movie.imgPath} alt={movie.title} />
                            <div className="movie-info">
                                <h3>{movie.title}</h3>
                                <span className='orange'>{movie.averageRate}</span>
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
