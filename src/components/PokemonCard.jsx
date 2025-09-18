// components/PokemonCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip
} from '@mui/material';

// Cores para cada tipo de Pokémon
const typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};

const PokemonCard = ({ pokemon }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3
        },
        backgroundColor: '#f5f5f5'
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height="200"
        image={pokemon.image}
        alt={pokemon.name}
        sx={{ objectFit: 'contain', backgroundColor: 'white', p: 2 }}
      />
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          #{pokemon.id.toString().padStart(3, '0')}
        </Typography>
        <Typography variant="h6" sx={{ textTransform: 'capitalize', mb: 1 }}>
          {pokemon.name}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
          {pokemon.types.map((type, index) => (
            <Chip
              key={index}
              label={type.type.name}
              size="small"
              sx={{
                backgroundColor: typeColors[type.type.name] || '#777',
                color: 'white',
                fontSize: '0.7rem'
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;