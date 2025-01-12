'use client';

import React from 'react';

import { usePokemonContext } from '../context/PokemonContext';

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = usePokemonContext();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='mb-4'>
      <input
        type='text'
        placeholder='Search...'
        value={searchQuery}
        onChange={handleSearch}
        className='w-full border p-2'
      />
    </div>
  );
};

export default SearchBar;
