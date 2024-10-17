'use client';
import { useState } from 'react';
import MovieCard from '@/components/MovieCard';
import { useWatchlist } from '@/context/WatchListContext';
import { useParams, useRouter } from 'next/navigation';
import { BsPencilSquare } from 'react-icons/bs';

const WatchlistPage = () => {
  const { watchlistName } = useParams() as { watchlistName: string };
  const decodedName = decodeURIComponent(watchlistName);

  const router = useRouter();
  const { Watchlists, updateWatchlistName } = useWatchlist();

  const [watchedMovies, setWatchedMovies] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(decodedName);
  console.log(Watchlists, decodedName);
  const watchlist = Watchlists.find((p) => p.name === decodedName);

  if (!watchlist) {
    return <p>Watchlist not found.</p>;
  }

  const toggleWatchedStatus = (movieId: string) => {
    setWatchedMovies((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const saveName = () => {
    setIsEditing(false);
    if (name !== watchlistName) {
      updateWatchlistName(watchlistName, name);
      router.push(`/watchlists/${name}`);
      router.refresh();
    }
  };

  return (
    <div className='p-4 flex flex-col gap-6'>
      <div className='flex items-center gap-4'>
        {isEditing ? (
          <input
            type='text'
            value={name}
            onChange={handleNameChange}
            className='border border-gray-300 p-2 rounded'
            onBlur={saveName}
            autoFocus
          />
        ) : (
          <div className='flex flex-row gap-4 items-center cursor-pointer'>
            <div className='text-3xl font-semibold  '>{name}</div>
            <BsPencilSquare
              className='w-5 h-5 flex items-center  '
              onClick={() => setIsEditing(true)}
            />
          </div>
        )}
      </div>

      <div className='grid grid-cols-2 md:grid-cols-5 gap-6'>
        {watchlist.movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            showWatched={true}
            isWatched={watchedMovies.includes(movie.imdbID)}
            onPrimaryActionClick={() => toggleWatchedStatus(movie.imdbID)}
          />
        ))}
      </div>
    </div>
  );
};

export default WatchlistPage;
