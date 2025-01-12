import Image from 'next/image';
import React from 'react';

import { usePokemonContext } from '@/context/PokemonContext';

interface PokemonCardProps {
  pokemon: {
    name: string;
    image: string;
    types: string;
  };
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const { team, addToTeam } = usePokemonContext();

  const isInTeam = team.some((p) => p.name === pokemon.name);

  return (
    <div className='rounded-lg border-2 border-yellow-400 bg-white p-4 shadow-lg transition hover:shadow-xl'>
      <Image
        width={80}
        height={80}
        src={pokemon.image}
        alt={pokemon.name}
        className='mx-auto'
      />
      <div>
        <h2 className='mt-4 text-center text-lg font-bold capitalize text-blue-500'>
          {pokemon.name}
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          {pokemon.types}
        </p>
        {!isInTeam && (
          <button
            className='text-green-500 hover:underline'
            onClick={() => addToTeam(pokemon)}
          >
            Add to Team
          </button>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
