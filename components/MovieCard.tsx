import { useState } from 'react';
import { Movie } from '../app/types';
import { BsBookmarkPlusFill } from 'react-icons/bs';
import { PiCheckBold } from 'react-icons/pi';

interface MovieCardProps {
  movie: Movie;
  onPrimaryActionClick?: (val: Movie) => void;
  primaryActionIcon?: JSX.Element;
  showWatched?: boolean;
  isWatched?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onPrimaryActionClick,
  primaryActionIcon = <BsBookmarkPlusFill />,
  showWatched = false,
  isWatched = false,
}) => {
  const [hoveredPlot, setHoveredPlot] = useState<string | null>(null);

  const fetchPlot = async () => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${movie.imdbID}&plot=full&apikey=b0d74b2d`
      );
      const data = await response.json();
      if (data.Response) setHoveredPlot(data.Plot);
    } catch {
      setHoveredPlot('Failed to fetch plot.');
    }
  };

  return (
    <div
      onMouseLeave={() => setHoveredPlot(null)}
      className='bg-white  rounded-md shadow-md md:w-[15vw] md:max-w-sm h-[50vh] flex flex-col cursor-pointer hover:translate-x-[-2px] hover:translate-y-[-2px]'
    >
      {hoveredPlot ? (
        <div className='p-4'>
          <p className='text-black font-medium text-xl'>Plot</p>
          <p className='text-sm text-gray-500'>{hoveredPlot}</p>
        </div>
      ) : (
        <>
          <div
            className='relative flex-1 flex items-center justify-center overflow-hidden'
            onClick={() => onPrimaryActionClick && onPrimaryActionClick(movie)}
          >
            <div className='opacity-90'>
              {showWatched ? (
                <PiCheckBold
                  className={`absolute w-11 h-11 p-1 top-0 right-0 ${
                    isWatched ? 'text-green-400' : 'text-gray-300'
                  }`}
                />
              ) : (
                primaryActionIcon
              )}
            </div>
            <img
              src={movie.Poster}
              alt={movie.Title}
              className='object-cover w-full h-full rounded-md'
            />
          </div>
          <div className='p-4'>
            <h3 className='text-lg font-semibold line-clamp-1'>
              {movie.Title}
            </h3>
            <div className='flex justify-between'>
              <p className='text-sm text-gray-500'>{movie.Year}</p>
              <p
                className='text-sm text-gray-50 bg-blue-400 py-1 px-2 rounded-md'
                onMouseEnter={fetchPlot}
              >
                Plot
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieCard;
