import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieGrid from '../components/MovieGrid';
import Pagination from '../components/Pagination';

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';

const SearchResults = () => {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${currentPage}`
        );
        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, currentPage]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="search-results">
      <h1>Search Results for "{query}"</h1>
      {movies.length > 0 ? (
        <>
          <MovieGrid movies={movies} />
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="no-results">
          <p>No movies found matching your search</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;