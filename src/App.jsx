// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetalhesPage from './pages/DetalhesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Adicione esta rota temporária para evitar erro */}
        <Route path="/pokemon/:id" element={<DetalhesPage />} />
      </Routes>
    </Router>
  );
}

export default App;