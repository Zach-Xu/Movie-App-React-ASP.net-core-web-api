import React, { Fragment, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import MovieList from './Movie/MovieList'
import Navbar from './Navbar/Navbar'
import MovieDetail from './Movie/MovieDetail'
import MyMovies from './Movie/MyMovies'

export default function Home() {

    const [movies, setMovies] = useState([])

    return (
        <Fragment>
            <Navbar setMovies={setMovies} />
            <Routes>
                <Route path='/movielist' element={<MovieList movies={movies} setMovies={setMovies} />} />
                <Route path='/moviedetail' element={<MovieDetail movies={movies} setMovies={setMovies} />} />
                <Route path='/mymovies' element={<MyMovies />} />
            </Routes>
        </Fragment>
    )
}
