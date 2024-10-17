import { useEffect, useState } from 'react';
import { Movie } from '../types';

export const useMovies = (query: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchMovies = async (page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query.trim()}&page=${page}&apikey=b0d74b2d`
      );
      const data = await response.json();

      if (data.Response) {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults, 10));
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch {
      setError('Failed to fetch movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [query, currentPage]);

  return { movies, loading, error, totalResults, currentPage, setCurrentPage };
};
