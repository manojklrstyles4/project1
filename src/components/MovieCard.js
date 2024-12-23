import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  
  return (
    <>

<Link to={`/movie/${movie.id}`} className="movie-card">
      <img 
       className="movie-poster"
        src={movie.poster_path ? imageUrl : '/api/placeholder/300/450'}
        alt={movie.title}
       
      />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split('-')[0]}</p>
        <div className="rating">
          <span>★ {movie.vote_average?.toFixed(1)}</span>
        </div>
      </div>
    </Link>
    
    </>
    
  );
};

export default MovieCard;