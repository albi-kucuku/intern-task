'use client';

import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PokemonDetails {
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
  stats: { name: string; value: number }[];
}

const PokemonDetailsPage = ({ params }: { params: { id: string } }) => {
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${params.id}`
        );
        const data = response.data;

        const formattedData: PokemonDetails = {
          name: data.name,
          image: data.sprites.front_default,
          types: data.types.map((type: any) => type.type.name),
          height: data.height,
          weight: data.weight,
          stats: data.stats.map((stat: any) => ({
            name: stat.stat.name,
            value: stat.base_stat,
          })),
        };

        setPokemon(formattedData);
      } catch (err) {
        setError('Oh no! The Poké Ball failed. Try again!');
      }
    };

    fetchPokemonDetails();
  }, [params.id]);

  if (error) {
    return (
      <div className='p-4 text-center'>
        <p className='text-red-500'>{error}</p>
        <button
          className='mt-4 text-black hover:underline'
          onClick={() => router.push('/')}
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!pokemon) {
    return <p className='p-4 text-center'>Loading Pokémon details...</p>;
  }

  return (
    <div className='p-4'>
      <button
        className='mb-4 px-4 py-2 text-black hover:underline'
        onClick={() => router.push('/')}
      >
        Go Back
      </button>

      <h1 className='mb-6 text-center text-3xl font-bold capitalize'>
        {pokemon.name}
      </h1>
      <div className='flex flex-col items-center'>
        <Image
          width={200}
          height={200}
          src={pokemon.image}
          alt={pokemon.name}
          className='mb-4'
        />
        <p className='mb-2'>Types: {pokemon.types.join(', ')}</p>
        <p className='mb-2'>Height: {pokemon.height} decimeters</p>
        <p className='mb-4'>Weight: {pokemon.weight} hectograms</p>
        <h2 className='mb-2 text-xl font-semibold'>Stats</h2>
        <ul className='list-disc'>
          {pokemon.stats.map((stat) => (
            <li key={stat.name}>
              {stat.name}: {stat.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetailsPage;
