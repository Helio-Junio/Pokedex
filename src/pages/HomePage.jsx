// pages/HomePage.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  TextField,
  AppBar,
  Toolbar,
  Typography,
  Box,
  CircularProgress,
  Alert,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PokemonCard from '../components/PokemonCard';
import { getPokemonList, searchPokemon } from '../services/pokeApi';

const HomePage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [offset, setOffset] = useState(0);
  const limit = 20;

  // Buscar lista de Pokémon
  const fetchPokemon = async (offset = 0) => {
    try {
      setLoading(true);
      const data = await getPokemonList(limit, offset);
      
      // Para cada Pokémon, buscar detalhes para obter a imagem
      const pokemonWithDetails = await Promise.all(
        data.results.map(async (pokemon, index) => {
          const details = await getPokemonDetails(offset + index + 1);
          return {
            id: offset + index + 1,
            name: pokemon.name,
            image: details.sprites.other['official-artwork'].front_default,
            types: details.types
          };
        })
      );
      
      setPokemonList(prev => [...prev, ...pokemonWithDetails]);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Buscar detalhes de um Pokémon específico
  const getPokemonDetails = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return await response.json();
  };

  // Pesquisar Pokémon
  const handleSearch = async (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.length > 2) {
      try {
        setLoading(true);
        const pokemon = await searchPokemon(term);
        setPokemonList([{
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other['official-artwork'].front_default,
          types: pokemon.types
        }]);
      } catch (err) {
        setPokemonList([]);
      } finally {
        setLoading(false);
      }
    } else if (term.length === 0) {
      // Se a busca estiver vazia, recarrega a lista completa
      setPokemonList([]);
      setOffset(0);
      fetchPokemon(0);
    }
  };

  // Carregar mais Pokémon (scroll infinito)
  const loadMore = () => {
    if (!loading && searchTerm === '') {
      const newOffset = offset + limit;
      setOffset(newOffset);
      fetchPokemon(newOffset);
    }
  };

  // Efeito inicial para carregar os primeiros Pokémon
  useEffect(() => {
    fetchPokemon(0);
  }, []);

  // Verificar quando o usuário chega no final da página
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, searchTerm]);

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: 'white', minHeight: '100vh' }}>
      {/* Header com título e busca */}
      <AppBar position="fixed" sx={{ backgroundColor: '#DC0A2D', mb: 4 }}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', fontFamily: 'Poppins' }}>
            Pokédex
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Buscar Pokémon..."
            size="small"
            value={searchTerm}
            onChange={handleSearch}
            sx={{
              backgroundColor: 'white',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: 1
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Toolbar>
      </AppBar>

      {/* Conteúdo principal */}
      <Container sx={{ mt: 16 }} maxWidth="100%">
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Grid de Pokémon */}
        <Grid container spacing={3}>
          {pokemonList.map((pokemon) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.id}>
              <PokemonCard pokemon={pokemon} />
            </Grid>
          ))}
        </Grid>

        {/* Loading indicator */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
            <CircularProgress sx={{ color: '#DC0A2D' }} />
          </Box>
        )}

        {/* Mensagem se não encontrar resultados */}
        {!loading && pokemonList.length === 0 && searchTerm && (
          <Typography variant="h6" textAlign="center" sx={{ mt: 4, color: 'text.secondary' }}>
            Nenhum Pokémon encontrado para "{searchTerm}"
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default HomePage;