// import React from 'react'; //this enables us to acess all react functionalities that we may need
// import '../styles.css';

// export default function Header(){
//     return(
//     <div className='header'>
//         <img className='logo' src='logo.png' alt='moviedux'/>
//         <h2 className='app-subtitle'>It's time for popcorn! Find your next movie here</h2>
//     </div>
//     );
// }


import "../styles.css";

export default function Header() {
  return (
    <section className="hero">
      <div className="hero-overlay">

        <nav className="hero-nav">
          <img src="logo.png" alt="Moviedux" className="hero-logo" />

          <div className="hero-links">
            <a href="/">Home</a>
            <a href="/">Movies</a>
            <a href="/">Genres</a>
            <a href="/">Watchlist</a>
          </div>
        </nav>

        <div className="hero-content">
          <h1>
            DISCOVER <span>MOVIES</span>
          </h1>

          <p>
            Stream and explore thousands of movies from around the world.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">
              Explore Movies
            </button>

            <button className="secondary-btn">
              My Watchlist
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}