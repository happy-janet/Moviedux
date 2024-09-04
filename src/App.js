// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MoviesGrid from './components/MoviesGrid';
import Watchlist from './components/Watchlist';
// import MoviePlayer from './components/MoviePlayer'; // Import MoviePlayer
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('All Genres');
  const [rating, setRating] = useState('All');

  useEffect(() => {
    fetchDefaultMovies();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      fetchMoviesBySearch();
    } else {
      fetchDefaultMovies();
    }
  }, [searchTerm, genre, rating]);

  const fetchDefaultMovies = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/movies/default/');
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching default movies:', error);
    }
  };

  const fetchMoviesBySearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/movies/search/?query=${searchTerm}`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies by search:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const toggleWatchlist = (movieId) => {
    setWatchlist((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  return (
    <div className="App">
      <div className="container">
        <Header />

        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/watchlist">Watch List</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route
              path="/"
              element={
                <MoviesGrid
                  watchlist={watchlist}
                  movies={movies}
                  toggleWatchlist={toggleWatchlist}
                  searchTerm={searchTerm}
                  genre={genre}
                  rating={rating}
                  handleSearchChange={handleSearchChange}
                  handleGenreChange={handleGenreChange}
                  handleRatingChange={handleRatingChange}
                />
              }
            />
            <Route
              path="/watchlist"
              element={
                <Watchlist
                  watchlist={watchlist}
                  movies={movies}
                  toggleWatchlist={toggleWatchlist}
                />
              }
            />
            <Route
              
            />
          </Routes>
        </Router>
      </div>

      <Footer />
    </div>
  );
}

export default App;
