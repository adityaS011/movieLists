import { useState } from 'react';
import { Movie } from '../types';
import { useWatchlist } from '@/context/WatchListContext';
import { CrosshairIcon, CrossIcon } from 'lucide-react';
import { MdClose } from 'react-icons/md';
import Seprator from '@/components/Seprator';

interface WatchlistModalProps {
  movie: Movie;
  onClose: () => void;
}

const WatchlistModal: React.FC<WatchlistModalProps> = ({ movie, onClose }) => {
  const { Watchlists, addToWatchlist, createWatchlist } = useWatchlist();
  const [newWatchlistName, setNewWatchlistName] = useState('');

  const handleAddToWatchlist = (WatchlistName: string) => {
    addToWatchlist(WatchlistName, movie);
    onClose();
  };

  const handleCreateWatchlist = () => {
    if (newWatchlistName.trim()) {
      createWatchlist(newWatchlistName);
      setNewWatchlistName('');
    }
  };

  return (
    <div className='modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='modal-content bg-white p-6 rounded-md w-96 gap-4 flex flex-col'>
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-xl font-semibold '>Select Watchlist</h2>
          <MdClose
            className='w-5 h-5 text-black cursor-pointer '
            onClick={onClose}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <p className='font-medium uppercase w-full text-center'>My Lists</p>
          <ul>
            {Watchlists.map((watchlist) => (
              <li key={watchlist.name} className='mb-2'>
                <button
                  className='w-full text-left p-2 border bg-slate-200 rounded-md'
                  onClick={() => handleAddToWatchlist(watchlist.name)}
                >
                  {watchlist.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <Seprator className='bg-gray-200 -my-1' />
        <div className='flex gap-2 '>
          <input
            type='text'
            value={newWatchlistName}
            onChange={(e) => setNewWatchlistName(e.target.value)}
            placeholder='New Watchlist Name'
            className='border p-2 flex-1 rounded-md'
          />
          <button
            className='bg-red-500 text-white px-4 py-2 rounded-md'
            onClick={handleCreateWatchlist}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchlistModal;
