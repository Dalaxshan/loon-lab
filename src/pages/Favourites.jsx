import React, { useContext } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { MovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const { favorites, addFavorite } = useContext(MovieContext);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Favorite Movies
      </Typography>
      {favorites.length === 0 ? (
        <Typography>No favorites added yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {favorites.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <MovieCard movie={movie} onFavorite={addFavorite} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorites;