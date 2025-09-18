import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styled from '@emotion/styled';

// Estilização do AppBar com Emotion
const EstiloAppBar = styled(AppBar)`
    background-color: transparent;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
`;

// Estilização do Typography com Emotion
const EstiloTypography = styled(Typography)`
  font-family: 'Poppins', sans-serif;
  font-size: 32px;
  font-weight: 600;
`;

export default function AppBarDetalhes({pokemon}) {

  // Formatando o ID do pokemon para ter 3 dígitos (ex: 001, 012, 123)
  const formattedId = pokemon?.id ? String(pokemon.id).padStart(3, '0') : '';

  // JSX do componente AppBar com o nome e ID do Pokémon, além de um botão de voltar
  return (
    <Box sx={{ flexGrow: 1 }}>
      <EstiloAppBar  position="static" elevation={0}>
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="voltar" sx={{ mr: 2 }} href="/">
            <ArrowBackIcon />
          </IconButton>
          <EstiloTypography variant="h5" color="inherit" component="div" sx={{ flexGrow: 1, textTransform: 'capitalize' }}>
            {pokemon?.name || ''}
          </EstiloTypography>
          <EstiloTypography variant="body2" color="inherit" component="div" sx={{ flexGrow: 1, textAlign: 'right' }}>
            #{formattedId}
          </EstiloTypography>
        </Toolbar>
      </EstiloAppBar>
    </Box>
  );
}