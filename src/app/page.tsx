'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import { usePokemonContext } from '../context/PokemonContext';

const HomePage = () => {
  const { team, filteredPokemon, removeFromTeam } = usePokemonContext();

  return (
    <div className='min-h-screen bg-gradient-to-br from-yellow-400 to-blue-500 p-6 text-gray-800'>
      <h1 className='mb-6 text-center text-4xl font-extrabold text-red-500'>
        Pokémons
      </h1>
      {team.length > 0 && (
        <div className='mb-6'>
          <h2 className='mb-4 text-center text-2xl font-bold text-yellow-500'>
            Your Pokémon Team
          </h2>
          <div className='flex flex-wrap justify-center gap-4'>
            {team.map((pokemon) => (
              <div
                key={pokemon.name}
                className='flex flex-col items-center rounded-lg border-2 border-yellow-400 bg-white p-4 shadow-lg'
              >
                <Image
                  width={80}
                  height={80}
                  src={pokemon.image}
                  alt={pokemon.name}
                  className='h-20 w-20'
                />
                <h3 className='mt-2 text-lg font-bold capitalize text-blue-500'>
                  {pokemon.name}
                </h3>
                <button
                  className='mt-2 text-red-500 hover:underline'
                  onClick={() => removeFromTeam(pokemon.name)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
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
