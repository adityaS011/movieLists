import React from 'react';
import { useRouter } from 'next/navigation';
import { useWatchlist } from '@/context/WatchListContext';

const MyLists: React.FC = () => {
  const { Watchlists, createWatchlist } = useWatchlist(); // Use context to get Watchlists
  const router = useRouter();
  const handleAddWatchlist = () => {
    const newWatchlist = prompt('Enter watchlist name:');
    if (newWatchlist) {
      createWatchlist(newWatchlist);
    }
  };

  const handleNavigateToWatchlist = (WatchlistName: string) => {
    const formattedName = encodeURIComponent(WatchlistName);
    router.push(`/watchlists/${formattedName}`);
  };

  return (
    <div className='flex flex-col px-2 text-black gap-2'>
      <h2 className='md:text-lg font-medium px-1'>My Lists</h2>
      <ul className='flex flex-col space-y-2'>
        {Watchlists.map((watchlist, index) => (
          <li
            key={index}
            onClick={() => handleNavigateToWatchlist(watchlist.name)}
            className='cursor-pointer hover:bg-gray-300 border-gray-400 border p-2 rounded'
          >
            {watchlist.name}{' '}
            <span className='text-gray-500'>
              ({watchlist.movies.length} movies)
            </span>
          </li>
        ))}
      </ul>
      <button
        className='mt-4 text-blue-400 hover:text-blue-300'
        onClick={handleAddWatchlist}
      >
        + Add Watchlist
      </button>
    </div>
  );
};

export default MyLists;
