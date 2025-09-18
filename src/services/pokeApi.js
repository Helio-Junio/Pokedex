// src/services/pokeApi.js
export const getPokemonList = async (limit = 20, offset = 0) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    if (!response.ok) throw new Error('Failed to fetch Pokémon list');
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch Pokémon list');
  }
};

export const searchPokemon = async (name) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) throw new Error('Pokémon not found');
    return await response.json();
  } catch (error) {
    throw new Error('Pokémon not found');
  }
};

export const getPokemonDetails = async (id) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) throw new Error('Failed to fetch Pokémon details');
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch Pokémon details');
  }
};