import React, { Suspense } from 'react';
import WatchlistPage from './WatchlistPage';

const page = () => {
  return (
    <Suspense>
      <WatchlistPage />
    </Suspense>
  );
};

export default page;
