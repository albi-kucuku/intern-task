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

interface EvolutionDetails {
  name: string;
  image: string;
}

const PokemonDetailsPage = ({ params }: { params: { id: string } }) => {
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionDetails[]>([]);
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

        const speciesResponse = await axios.get(data.species.url);
        const evolutionChainUrl = speciesResponse.data.evolution_chain.url;

        const evolutionResponse = await axios.get(evolutionChainUrl);
        const chain = processEvolutionChain(evolutionResponse.data.chain);

        setEvolutionChain(await chain);
      } catch (err) {
        setError('Oh no! The Poké Ball failed. Try again!');
      }
    };

    fetchPokemonDetails();
  }, [params.id]);

  const processEvolutionChain = async (
    chain: any
  ): Promise<EvolutionDetails[]> => {
    const evolutions: EvolutionDetails[] = [];
    let current = chain;

    while (current) {
      const speciesResponse = await axios.get(current.species.url);
      const pokemonId = speciesResponse.data.id;
      const pokemonResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      const image = pokemonResponse.data.sprites.front_default;

      evolutions.push({
        name: current.species.name,
        image,
      });

      current = current.evolves_to.length > 0 ? current.evolves_to[0] : null;
    }

    return evolutions;
  };

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
        <h2 className='mb-2 mt-6 text-xl font-semibold'>Evolution Chain</h2>
        {evolutionChain.length > 0 ? (
          <ul className='flex flex-col items-center gap-4'>
            {evolutionChain.map((evolution) => (
              <li key={evolution.name} className='text-center capitalize'>
                <Image
                  width={100}
                  height={100}
                  src={evolution.image}
                  alt={evolution.name}
                  className='mb-2'
                />
                {evolution.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No evolution chain available.</p>
        )}
      </div>
    </div>
  );
};

export default PokemonDetailsPage;
