'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const debounce = (fn: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const debouncedSearch = debounce((query: string) => {
    if (query.trim()) {
      router.push(`/home?search=${encodeURIComponent(query)}`);
    }
  }, 500);

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery]);

  return (
    <div className='flex flex-row w-full'>
      <input
        type='text'
        placeholder='Search for movies...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='p-2 border border-gray-400 text-black rounded flex-grow'
      />
    </div>
  );
};

export default SearchBar;
