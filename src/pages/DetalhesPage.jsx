import  AppBarDetalhes from "../components/AppBarDetalhes.jsx";
import * as React from 'react';
import styled from '@emotion/styled';
import SobrePaper from "../components/SobrePaper.jsx";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    pokemonType: {
      bug: '#A7B723',
      dark: '#75574C',
      dragon: '#7037FF',
      electric: '#F9CF30',
      fairy: '#E69EAC',
      fighting: '#C12239',
      fire: '#F57D31',
      flying: '#A891EC',
      ghost: '#70559B',
      grass: '#74CB48',
      ground: '#DEC16B',
      ice: '#9AD6DF',
      normal: '#AAA67F',
      poison: '#966DA3',
      psychic: '#ED4882',
      rock: '#B9A156',
      steel: '#B7B9D0',
      water: '#6493EB',
    }
  }
});

const Container = styled.div`
  background-color:  ${props => props.theme.palette.pokemonType[props.pokemonType] || '#f3f3f3'};
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
`;


export default function DetalhesPage() {

  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  const fetchPokemonDescription = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
      const data = await response.json();

      // Filtra para pegar apenas as descrições em inglês
      const description = data.flavor_text_entries.find(
      entry => entry.language.name === "en"
    )?.flavor_text || 'Descrição não disponível.';

      return description.replace(/\f/g, ' '); // Remove caracteres especiais
    } catch (error) {
      console.error('Erro ao buscar descrição do Pokémon:', error);
      return '';
    }
  };

  useEffect(() => {
    // Função para buscar os detalhes do Pokémon pela API
    const fetchPokemonDetails = async () => {
      try {
        const [pokemonData, description] = await Promise.all([
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json()),
          fetchPokemonDescription(id)
        ]);

        setPokemon({
          id: pokemonData.id,
          name: pokemonData.name,
          types: pokemonData.types,
          image: pokemonData.sprites.other['official-artwork'].front_default,
          height: pokemonData.height / 10,
          weight: pokemonData.weight / 10,
          abilities: pokemonData.abilities, 
          stats: pokemonData.stats, 
          description: description
        });
      } catch (error) {
        console.error('Erro ao buscar detalhes do Pokémon:', error);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  // Pega o primeiro tipo do pokémon
  const primaryType = pokemon?.types?.[0]?.type?.name || 'grass';

  return (
    <ThemeProvider theme={theme}>
      <Container pokemonType={primaryType}>
        {/*chama o componente AppBarDetalhes */}
        <AppBarDetalhes pokemon={pokemon} />
        <img 
          src="/src/assets/Pokeball.svg" 
          alt="Pokebola de fundo" 
          style={{ 
            position: 'absolute', 
            top: '40%', 
            left: '30%', 
            transform: 'translate(-50%, -50%)',
            width: '500px',
            height: '500px',
            opacity: 0.1
          }} 
        />
        <img className="imgPokemon" 
          src={pokemon?.image} 
          alt={`Imagem do ${pokemon?.name || 'pokémon'}`}
          style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '15%', 
            transform: 'translate(-50%, -50%)',
            width: '250px',
            height: '250px'
          }} 
        />
        {/*chama o componente SobrePaper */}
        <SobrePaper pokemon={pokemon} />

      </Container>
    </ThemeProvider>
  );
}
