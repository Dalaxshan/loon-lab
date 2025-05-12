import React, { useContext } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';

const MovieCard = ({ movie, onFavorite }) => {
  const { favorites } = useContext(MovieContext);
  const navigate = useNavigate();
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  return (
    <Card sx={{ maxWidth: 345, m: 'auto' }}>
      <CardMedia
        component="img"
        height="140"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <CardContent>
        <Typography variant="h6">{movie.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(movie.release_date).getFullYear()} | Rating: {movie.vote_average}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button onClick={() => navigate(`/movie/${movie.id}`)} variant="contained" sx={{ mr: 1 }}>
            Details
          </Button>
          <Button onClick={() => onFavorite(movie)} variant={isFavorite ? 'outlined' : 'contained'}>
            {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;