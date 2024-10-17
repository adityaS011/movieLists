import { Suspense } from 'react';
import MovieList from './MovieList';

const HomePage = () => {
  return (
    <Suspense>
      <MovieList />
    </Suspense>
  );
};

export default HomePage;
