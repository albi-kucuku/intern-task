'use client';

import Link from 'next/link';
import React from 'react';

import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import { usePokemonContext } from '../context/PokemonContext';

const HomePage = () => {
  const { filteredPokemon } = usePokemonContext();

  return (
    <div className='p-4'>
      <h1 className='mb-4 text-center text-2xl font-semibold'>Pokémons</h1>
      <SearchBar />
      <div className='flex flex-col gap-4'>
        {filteredPokemon.map((pokemon) => (
          <Link key={pokemon.name} href={`/pokemon/${pokemon.name}`}>
            <PokemonCard pokemon={pokemon} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
