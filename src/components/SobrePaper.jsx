import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import weightIcon from '/src/assets/weight.svg';
import heightIcon from '/src/assets/height.svg';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';


// Definição do tema com as cores dos tipos de Pokémon
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

// Estilização do Paper com Emotion
const StyledPaper = styled(Paper)`
  background-color: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 54%;
  right: 12px;
  transform: translateY(-50%);
  width: 45%;
  height: 80vh;
  padding: 24px;
`;

// Container para os tipos de Pokémon
const TiposContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin: 16px;
`;

// Estilização dos tipos de Pokémon
const StyledTipo = styled(Typography)`
  background-color: ${props => props.theme.palette.pokemonType[props.pokemonType] || '#f3f3f3'};
  color: white;
  padding: 4px 8px;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 16px;
`;

// Estilização dos subtítulos
const StyledSubtitulo = styled(Typography)`
  font-family: 'Poppins', sans-serif;
  color: ${props => props.theme.palette.pokemonType[props.pokemonType] || '#74CB48'};
  font-weight: 600;
  font-size: 18px;
  align-items: flex-start;
  margin: 16px;
`;

// Estilização dos parágrafos
const StyledParagrafo = styled(Typography)`
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 14px;
  text-align: justify;  
`;

// Estilização dos status
const StyledStatus = styled(Typography)`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 14px;
  text-align: justify;  
`;


export default function SobrePaper( {pokemon} ) {

  const primaryType = pokemon?.types?.[0]?.type?.name || 'normal';

  // Mapeamento dos nomes dos status para exibição
  const statusNames = {
  'hp': 'HP',
  'attack': 'ATTACK',
  'defense': 'DEFENSE',
  'special-attack': 'SP. ATK',
  'special-defense': 'SP. DEF',
  'speed': 'SPEED'
};

// JSX do componente chamando um paper com detalhes do Pokémon, habilidades, peso, altura, movimentos e status base...
  return (
    <Box 
      sx={{
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
      height: '100vh',
      position: 'relative'
      }}
    >
      <StyledPaper elevation={3} >
      <TiposContainer>
       {pokemon?.types?.map((type) => (
      <StyledTipo key={type.type.name} variant="h5" color="inherit" component="div" pokemonType={type.type.name}>
        {type.type.name}
      </StyledTipo>
    ))}
      </TiposContainer>
      <StyledSubtitulo variant="body1" pokemonType={primaryType} component="div">
      Sobre
      </StyledSubtitulo>
      <Box
      sx={{
      display: 'inline-flex',
      alignItems: 'center',
      border: 'none',
      justifyContent: 'center',
      borderColor: 'divider',
      width: '90%',
      borderRadius: 2,
      gap: 2,
      bgcolor: 'background.paper',
      color: 'text.secondary',
      '& svg': {
        m: 1,
      },
      }}
      >
      <img src={weightIcon} alt="Weight" />
      <StyledParagrafo>
      <strong>{(pokemon?.weight / 10).toFixed(1)} kg</strong> <br /> Peso
      </StyledParagrafo>
      <Divider orientation="vertical" variant="middle" flexItem />

      <img src={heightIcon} alt="Height" />
      <StyledParagrafo>
      <strong>{(pokemon?.height / 10).toFixed(1)} m</strong> <br /> Altura
      </StyledParagrafo> 

      <Divider orientation="vertical" variant="middle" flexItem />
      <StyledParagrafo>
      <strong>{pokemon?.abilities?.map(ability => 
        ability.ability.name.replace('-', ' ')
      ).join(' ')}</strong> <br /> Movimentos
      </StyledParagrafo>
      </Box>

      <StyledParagrafo variant="body1" color="inherit" component="div" margin={'16px'}>
        {pokemon?.description || 'Carregando descrição...'}
      </StyledParagrafo>

      <StyledSubtitulo variant="body1" pokemonType={primaryType} component="div">
      Status Base
      </StyledSubtitulo>
      
      <Box
      sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '90%',
      padding: '16px',
      gap: 1,
      }}
      >
      {pokemon?.stats?.map((stat, index) => (
        <Box
        key={index}
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          gap: 1,
        }}
        >
        <StyledStatus sx={{ minWidth: '80px', textAlign: 'right' }} color={theme.palette.pokemonType[primaryType]}>
          {statusNames[stat.stat.name]}
        </StyledStatus>
        <Divider orientation="vertical" variant="inset" flexItem sx={{ mx: 1 }} />
        <StyledStatus sx={{ minWidth: '40px', textAlign: 'right'}}>
          {String(stat.base_stat).padStart(3, '0')}
        </StyledStatus>
        <Stack sx={{ width: '100%', ml: 1 }} spacing={1}>
          <LinearProgress 
            variant="determinate" 
            value={(stat.base_stat / 255) * 100} 
            sx={{
              height: 8,
              borderRadius: 5,
              [`&.${linearProgressClasses.colorPrimary}`]: {
                backgroundColor: `${theme.palette.pokemonType[primaryType]}33`,
              },
              [`& .${linearProgressClasses.bar}`]: {
                borderRadius: 5,
                backgroundColor: theme.palette.pokemonType[primaryType],
              },
            }}
          />
        </Stack>
      </Box>
    ))}
      </Box>
      </StyledPaper>
    </Box>
  );
}