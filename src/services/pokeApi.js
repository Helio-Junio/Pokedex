import api from './api';

export const getPokemonList = async (limit = 20, offset = 0) => {
  try {
    const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar lista de Pokémon');
  }
};

export const getPokemonDetails = async (id) => {
  try {
    const response = await api.get(`/pokemon/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar detalhes do Pokémon');
  }
};

export const searchPokemon = async (term) => {
  try {
    const response = await api.get(`/pokemon/${term.toLowerCase()}`);
    return response.data;
  } catch (error) {
    throw new Error('Pokémon não encontrado');
  }
};