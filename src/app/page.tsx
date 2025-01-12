'use client';

import Link from 'next/link';
import React from 'react';

import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import { usePokemonContext } from '../context/PokemonContext';

const HomePage = () => {
  const { filteredPokemon } = usePokemonContext();

  return (
    <div className='min-h-screen bg-gradient-to-br from-yellow-400 to-blue-500 p-6 text-gray-800'>
      <h1 className='mb-6 text-center text-4xl font-extrabold text-red-500'>
        Pokémons
      </h1>
      <SearchBar />
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {filteredPokemon.map((pokemon) => (
          <Link key={pokemon.name} href={`/pokemon/${pokemon.name}`}>
            <div className='transform transition duration-200 hover:scale-105'>
              <PokemonCard pokemon={pokemon} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
