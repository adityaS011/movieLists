'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import LoadingSkeleton from '../ui/LoadingSkeleton';
import MovieCard from '../../components/MovieCard';
import { Movie } from '../types';
import { useMovies } from '@/app/customHooks/useMovies';
import { BsBookmarkPlusFill } from 'react-icons/bs';
import { useWatchlist } from '@/context/WatchListContext';
import WatchlistModal from '../ui/WatchlistModal';

const MovieList: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('search') || 'deadpool';
  const router = useRouter();
  const { addToWatchlist } = useWatchlist();

  const { movies, loading, error, totalResults, currentPage, setCurrentPage } =
    useMovies(query);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleBookmarkClick = (movie: Movie) => {
    setSelectedMovie(movie); // Open watchlist modal
  };

  const closeModal = () => {
    setSelectedMovie(null); // Close modal
  };
  useEffect(() => {
    router.push('/home');
  }, []);
  return (
    <div className='flex flex-col gap-8'>
      <div className='border-2 border-red-700 p-4 rounded-md'>
        <h1 className=' text-2xl smd:text-4xl mb-4 font-medium'>
          Welcome to <span className='text-red-500'>Watchlists</span>
        </h1>
        <p className='text-sm md:text-base'>
          Browse movies, add them to watchlists, and share with friends.
        </p>
        <p className='text-sm md:text-base'>
          Click the + to add a movie and hover to see its plot!
        </p>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6'>
        <div className='col-span-2 md:col-span-5'>
          <SearchBar />
        </div>

        {loading && <LoadingSkeleton />}
        {error && <div className='col-span-5 text-red-500'>{error}</div>}
        {(!movies || (!loading && movies?.length === 0)) && (
          <p>No movies found.</p>
        )}

        {!loading &&
          movies?.length > 0 &&
          movies.map((movie) => (
            <MovieCard
              movie={movie}
              onPrimaryActionClick={(movie) => {
                addToWatchlist(movie.Title, movie);
                handleBookmarkClick(movie);
              }}
              primaryActionIcon={
                <div>
                  <div className='absolute w-5 h-5 bg-white left-1.5 top-1'></div>
                  <BsBookmarkPlusFill className='absolute top-0 w-10 h-10 text-gray-500' />
                </div>
              }
            />
          ))}
      </div>

      {movies?.length > 0 && (
        <Pagination
          totalResults={totalResults}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}

      {/* Watchlist Modal */}
      {selectedMovie && (
        <WatchlistModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
};

export default MovieList;
