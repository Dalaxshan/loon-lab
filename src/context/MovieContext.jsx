import React, { createContext, useState, useEffect } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [lastSearch, setLastSearch] = useState(localStorage.getItem('lastSearch') || '');

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('lastSearch', lastSearch);
  }, [lastSearch]);

  const addFavorite = (movie) => {
    setFavorites((prev) => {
      if (prev.find((fav) => fav.id === movie.id)) {
        return prev.filter((fav) => fav.id !== movie.id);
      }
      return [...prev, movie];
    });
  };

  return (
    <MovieContext.Provider value={{ movies, setMovies, favorites, addFavorite, lastSearch, setLastSearch }}>
      {children}
    </MovieContext.Provider>
  );
};