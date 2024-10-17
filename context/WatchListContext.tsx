'use client';
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { useAuth } from './AuthContext';
import { Movie } from '@/app/types';

interface Watchlist {
  name: string;
  movies: Movie[];
}

interface WatchlistContextType {
  Watchlists: Watchlist[];
  addToWatchlist: (WatchlistName: string, movie: Movie) => void;
  createWatchlist: (name: string) => void;
  removeMovieFromWatchlist: (WatchlistName: string, id: string) => void;
  updateWatchlistName: (oldName: string, newName: string) => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(
  undefined
);

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [Watchlists, setWatchlists] = useState<Watchlist[]>([]);

  useEffect(() => {
    if (user) {
      const savedWatchlists = JSON.parse(
        localStorage.getItem(`${user}-Watchlists`) || '[]'
      );
      setWatchlists(savedWatchlists);
    }
  }, [user]);

  const saveToLocalStorage = (updatedWatchlists: Watchlist[]) => {
    localStorage.setItem(
      `${user}-Watchlists`,
      JSON.stringify(updatedWatchlists)
    );
  };

  const updateWatchlistName = (oldName: string, newName: string) => {
    setWatchlists((prev) => {
      const updatedWatchlists = prev.map((watchlist) =>
        watchlist.name === oldName ? { ...watchlist, name: newName } : watchlist
      );
      saveToLocalStorage(updatedWatchlists);
      return updatedWatchlists;
    });
  };

  const createWatchlist = (name: string) => {
    if (Watchlists.some((watchlist) => watchlist.name === name)) {
      alert('Watchlist already exists!');
      return;
    }
    const newWatchlist: Watchlist = { name, movies: [] };
    setWatchlists((prev) => {
      const updatedWatchlists = [...prev, newWatchlist];
      saveToLocalStorage(updatedWatchlists);
      return updatedWatchlists;
    });
  };

  const addToWatchlist = (WatchlistName: string, movie: Movie) => {
    setWatchlists((prev) => {
      const updatedWatchlists = prev.map((watchlist) =>
        watchlist.name === WatchlistName
          ? {
              ...watchlist,
              movies: watchlist.movies.some((m) => m.imdbID === movie.imdbID)
                ? watchlist.movies
                : [...watchlist.movies, movie],
            }
          : watchlist
      );
      saveToLocalStorage(updatedWatchlists);
      return updatedWatchlists;
    });
  };

  const removeMovieFromWatchlist = (WatchlistName: string, id: string) => {
    setWatchlists((prev) => {
      const updatedWatchlists = prev.map((watchlist) =>
        watchlist.name === WatchlistName
          ? {
              ...watchlist,
              movies: watchlist.movies.filter((movie) => movie.imdbID !== id),
            }
          : watchlist
      );
      saveToLocalStorage(updatedWatchlists);
      return updatedWatchlists;
    });
  };

  return (
    <WatchlistContext.Provider
      value={{
        Watchlists,
        addToWatchlist,
        createWatchlist,
        removeMovieFromWatchlist,
        updateWatchlistName,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};
