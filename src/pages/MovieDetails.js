import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [movieResponse, creditsResponse] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
        ]);

        const movieData = await movieResponse.json();
        const creditsData = await creditsResponse.json();

        setMovie(movieData);
        setCast(creditsData.cast);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading || !movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster-large"
        />
      </div>
      <div className="movie-details-info">
        <h1>{movie.title}</h1>
        <div className="movie-meta">
          <span>{movie.release_date?.split('-')[0]}</span>
          <span>★ {movie.vote_average?.toFixed(1)}</span>
          <span>{movie.runtime} min</span>
        </div>
        <p className="movie-overview">{movie.overview}</p>
        
        <div className="cast-section">
          <h2>Cast</h2>
          <div className="cast-grid">
            {cast.slice(0, 6).map(person => (
              <div key={person.id} className="cast-card">
                <img
                  src={person.profile_path 
                    ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                    : '/api/placeholder/200/200'}
                  alt={person.name}
                  className="cast-image"
                />
                <div className="cast-info">
                  <div className="cast-name">{person.name}</div>
                  <div className="cast-character">{person.character}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;