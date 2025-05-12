import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import Login from './pages/Login';

import MovieDetails from './pages/MovieDetails';
import { MovieProvider } from './context/MovieContext';
import Favorites from './pages/Favourites';

const App = () => {
  const [mode, setMode] = useState('light');

  const theme = createTheme({
    palette: {
      mode,
      primary: { main: '#1976d2' },
      secondary: { main: '#dc004e' },
    },
  });

  const toggleTheme = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MovieProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home toggleTheme={toggleTheme} />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Router>
      </MovieProvider>
    </ThemeProvider>
  );
};

export default App;