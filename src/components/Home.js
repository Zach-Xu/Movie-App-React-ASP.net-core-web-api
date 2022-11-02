import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import MovieList from './Movie/MovieList'
import Navbar from './Navbar/Navbar'
import MovieDetail from './Movie/MovieDetail'

export default function Home() {
    return (
        <Fragment>
            <Navbar />
            <Routes>
                <Route path='/movielist' element={<MovieList />} />
                <Route path='/moviedetail' element={<MovieDetail />} />
            </Routes>
        </Fragment>
    )
}
