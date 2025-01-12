'use client';

import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface Pokemon {
  name: string;
  image: string;
  types: string;
}

interface PokemonContextProps {
  pokemonList: Pokemon[];
  filteredPokemon: Pokemon[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const PokemonContext = createContext<PokemonContextProps | undefined>(
  undefined
);

export const PokemonProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

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
        setFilteredPokemon(detailedPokemon);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    const filtered = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPokemon(filtered);
  }, [searchQuery, pokemonList]);

  return (
    <PokemonContext.Provider
      value={{
        pokemonList,
        filteredPokemon,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }
  return context;
};
