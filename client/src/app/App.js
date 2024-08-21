import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MoviesList, MoviesInsert, MoviesUpdate } from '../pages/index';
import { NavBar } from '../components'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/movies/list" element={<MoviesList />} />
                <Route path="/movies/create" element={<MoviesInsert />} />
                <Route path="/movies/update" element={<MoviesUpdate />} />
                
            </Routes>
        </Router>
    )
}

export default App
