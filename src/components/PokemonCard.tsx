import Image from 'next/image';
import React from 'react';

interface PokemonCardProps {
  pokemon: {
    name: string;
    image: string;
    types: string;
  };
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className='flex items-center gap-4 border-b p-4'>
      <Image
        width={80}
        height={80}
        src={pokemon.image}
        alt={pokemon.name}
        className='flex-shrink-0'
      />
      <div>
        <h2 className='text-lg font-semibold capitalize text-gray-800'>
          {pokemon.name}
        </h2>
        <p className='text-sm text-gray-600'>{pokemon.types}</p>
      </div>
    </div>
  );
};

export default PokemonCard;
