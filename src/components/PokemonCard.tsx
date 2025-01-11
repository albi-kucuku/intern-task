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
    <div className='border p-3'>
      <Image
        width={100}
        height={100}
        src={pokemon.image}
        alt={pokemon.name}
        className='mx-auto mb-2'
      />
      <h2 className='text-center text-base font-medium capitalize'>
        {pokemon.name}
      </h2>
      <p className='text-center text-sm'>{pokemon.types}</p>
    </div>
  );
};

export default PokemonCard;
