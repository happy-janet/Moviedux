import React, { useState } from 'react';
import '../styles.css';

export default function MovieCard({ movie, isWatchlisted, toggleWatchlist }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleError = (e) => {
    e.target.src = 'images/default.jpg'; // Ensure this path is correct
  };

  const getRatingClass = (rating) => {
    if (rating >= 8) return 'rating-good';
    if (rating >= 5 && rating < 8) return 'rating-ok';
    return 'rating-bad';
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleWatchlistClick = (e) => {
    e.stopPropagation(); // Prevent modal from closing
    toggleWatchlist(movie.id);
  };

  const videoKey = movie.youtube_url?.split('/').pop();
  const embeddedVideoUrl = videoKey
    ? `https://www.youtube.com/embed/${videoKey}?modestbranding=1&playsinline=1&showinfo=0&rel=0`
    : '';

  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        onError={handleError}
        style={{ cursor: 'pointer' }}
      />
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <p className="movie-card-date">Release Date: {movie.release_date || 'Unknown Date'}</p>
        <p className="movie-card-cast">Artists: {movie.topCast || 'Unknown Artists'}</p>
        <div>
          <span className={`rating ${getRatingClass(movie.rating)}`}>{movie.rating}</span>
          <button onClick={handleWatchlistClick}>
            {isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </button>
          {embeddedVideoUrl && (
            <button onClick={openModal} className="watch-now-button">
              Watch Now
            </button>
          )}
        </div>
      </div>

      {/* Modal for watching the video */}
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <iframe
              width="560"
              height="315"
              src={embeddedVideoUrl}
              title={movie.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ border: 'none' }}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
