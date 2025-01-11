'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import PokemonCard from '../components/PokemonCard';

interface Pokemon {
  name: string;
  image: string;
  types: string;
}

const HomePage = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=30&offset=0'
        );
        const results = response.data.results;

        const detailedPokemon: Pokemon[] = await Promise.all(
          results.map(async (pokemon: { name: string; url: string }) => {
            const details = await axios.get(pokemon.url);
            return {
              name: details.data.name,
              image: details.data.sprites.front_default,
              types: details.data.types
                .map((type: any) => type.type.name)
                .join(', '),
            };
          })
        );

        setPokemonList(detailedPokemon);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };

    fetchPokemon();
  }, []);

  return (
    <div className='p-4'>
      <h1 className='mb-4 text-center text-2xl font-semibold'>Pokémons</h1>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
