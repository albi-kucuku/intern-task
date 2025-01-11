'use client';

import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    onSearch(query);
  };

  return (
    <div className='mb-4'>
      <input
        type='text'
        placeholder='Search...'
        value={search}
        onChange={handleSearch}
        className='w-full border p-2'
      />
    </div>
  );
};

export default SearchBar;
