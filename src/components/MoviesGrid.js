import React, { useState, useEffect } from 'react';
import '../styles.css';
import MovieCard from './MovieCard';

export default function MoviesGrid({
  movies,
  watchlist,
  toggleWatchlist,
  searchTerm,
  handleSearchChange,
  genre,
  handleGenreChange,
  rating,
  handleRatingChange,
}) {
  const [movieDetails, setMovieDetails] = useState([]);

  // Fetch movie details including YouTube URLs and top cast
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const updatedMovies = await Promise.all(
          movies.map(async (movie) => {
            // Fetch YouTube videos
            const videoResponse = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=b482d5d15eea5207ec4eb7e49570a8e6`
            );
            const videoData = await videoResponse.json();
            const youtubeUrl = videoData.results.find((video) => video.site === 'YouTube')
              ? `https://www.youtube.com/embed/${videoData.results.find(
                  (video) => video.site === 'YouTube'
                ).key}`
              : null;

            // Fetch cast information
            const castResponse = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=b482d5d15eea5207ec4eb7e49570a8e6`
            );
            const castData = await castResponse.json();
            const topCast = castData.cast
              .slice(0, 5) // Get the top 5 cast members
              .map((actor) => actor.name)
              .join(', ');

            return {
              ...movie,
              youtube_url: youtubeUrl,
              topCast: topCast || 'Unknown Artists', // Add top cast to movie details
            };
          })
        );
        setMovieDetails(updatedMovies);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movies]);

  const matchesSearchTerm = (movie, searchTerm) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const matchesGenre = (movie, genre) => {
    return genre === 'All Genres' || movie.genre.toLowerCase() === genre.toLowerCase();
  };

  const matchesRating = (movie, rating) => {
    switch (rating) {
      case 'All':
        return true;
      case 'Good':
        return movie.rating >= 8;
      case 'Ok':
        return movie.rating >= 5 && movie.rating < 8;
      case 'Bad':
        return movie.rating < 5;
      default:
        return false;
    }
  };

  const filteredMovies = movieDetails.filter(
    (movie) =>
      matchesGenre(movie, genre) &&
      matchesRating(movie, rating) &&
      matchesSearchTerm(movie, searchTerm)
  );

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="filter-bar">
        <div className="filter-slot">
          <label>Genre</label>
          <select className="filter-dropdown" value={genre} onChange={handleGenreChange}>
            <option>All Genres</option>
            <option>Action</option>
            <option>Drama</option>
            <option>Fantasy</option>
            <option>Horror</option>
          </select>
        </div>
        <div className="filter-slot">
          <label>Rating</label>
          <select className="filter-dropdown" value={rating} onChange={handleRatingChange}>
            <option>All</option>
            <option>Good</option>
            <option>Ok</option>
            <option>Bad</option>
          </select>
        </div>
      </div>
      <div className="movies-grid">
        {filteredMovies.length === 0 ? (
          <p>No movies found</p>
        ) : (
          filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              toggleWatchlist={toggleWatchlist}
              isWatchlisted={watchlist.includes(movie.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
