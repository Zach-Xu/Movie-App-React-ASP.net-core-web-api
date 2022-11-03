import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import MovieList from './Movie/MovieList'
import Navbar from './Navbar/Navbar'
import MovieDetail from './Movie/MovieDetail'
import MyMovies from './Movie/MyMovies'

export default function Home() {
    return (
        <Fragment>
            <Navbar />
            <Routes>
                <Route path='/movielist' element={<MovieList />} />
                <Route path='/moviedetail' element={<MovieDetail />} />
                <Route path='/mymovies' element={<MyMovies />} />
            </Routes>
        </Fragment>
    )
}
