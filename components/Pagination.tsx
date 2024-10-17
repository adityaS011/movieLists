import { useRouter, useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalResults,
}: {
  currentPage: number;
  totalResults: number;
  setCurrentPage: (val: number) => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (direction: 'next' | 'prev') => {
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    setCurrentPage(newPage);

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());

    router.push(`/home?${params.toString()}`);
  };

  const totalPages = useMemo(
    () => Math.ceil(totalResults / 10),
    [totalResults]
  );

  return (
    <div>
      <div className='flex justify-between mt-4 w-full'>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange('prev')}
          className='bg-gray-400 text-white px-4 py-2 rounded disabled:opacity-50'
        >
          Previous
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange('next')}
          className='bg-gray-400 text-white px-4 py-2 rounded disabled:opacity-50'
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
