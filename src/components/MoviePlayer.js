// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// function MoviePlayer() {
//   const { id } = useParams();
//   const [movie, setMovie] = useState(null);

//   useEffect(() => {
//     const fetchMovie = async () => {
//       try {
//         const response = await fetch(`http://localhost:8000/api/movie/${id}/`);
//         if (response.ok) {
//           const data = await response.json();
//           setMovie(data);
//         } else {
//           console.error('Failed to fetch movie details');
//         }
//       } catch (error) {
//         console.error('Error fetching movie details:', error);
//       }
//     };

//     fetchMovie();
//   }, [id]);

//   if (!movie) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>{movie.title}</h1>
//       <img src={movie.image} alt={movie.title} />
//       <p>{movie.description}</p>
//       <p>Genre: {movie.genre}</p>
//       <p>Rating: {movie.rating}</p>
//       {movie.youtube_url ? (
//         <div>
//           <h2>Watch Now</h2>
//           <iframe
//             width="560"
//             height="315"
//             src={movie.youtube_url}
//             title={movie.title}
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           ></iframe>
//         </div>
//       ) : (
//         <p>No video available.</p>
//       )}
//     </div>
//   );
// }

// export default MoviePlayer;
