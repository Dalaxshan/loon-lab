import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, Button, Typography, Switch, Box } from '@mui/material';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { MovieContext } from '../context/MovieContext';
import axios from 'axios';

const Home = ({ toggleTheme }) => {
  const { movies, setMovies, addFavorite, lastSearch, setLastSearch } = useContext(MovieContext);
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const BASE_URL = 'https://api.themoviedb.org/3';
    

  useEffect(() => {
    axios
        .get(`${BASE_URL}/account/22002212/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`)
      .then((response) => setTrending(response.data.results))
          .catch(() => setError('Failed to load trending movies'));

    if (lastSearch) {
      axios
        .get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${lastSearch}&page=1`)
        .then((response) => setMovies(response.data.results))
        .catch(() => setError('Failed to load last search'));
    }
  }, [API_KEY, lastSearch, setMovies, trending]);

  const handleSearch = (query) => {
    setLastSearch(query);
    setPage(1);
    axios
      .get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=1`)
      .then((response) => setMovies(response.data.results))
      .catch(() => setError('No movies found'));
  };

  const loadMore = () => {
    axios
      .get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${lastSearch}&page=${page + 1}`)
      .then((response) => {
        setMovies([...movies, ...response.data.results]);
        setPage(page + 1);
      })
      .catch(() => setError('Failed to load more movies'));
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Movie Explorer</Typography>
        <Switch onChange={toggleTheme} label="Dark Mode" />
      </Box>
      <SearchBar onSearch={handleSearch} />
      {error && <Typography color="error">{error}</Typography>}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Trending Movies
      </Typography>
      <Grid container spacing={2}>
        {trending.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <MovieCard movie={movie} onFavorite={addFavorite} />
          </Grid>
        ))}
      </Grid>
      {movies.length > 0 && (
        <>
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Search Results
          </Typography>
          <Grid container spacing={2}>
            {movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie.id}>
                <MovieCard movie={movie} onFavorite={addFavorite} />
              </Grid>
            ))}
          </Grid>
          <Button variant="contained" onClick={loadMore} sx={{ mt: 4 }}>
            Load More
          </Button>
        </>
      )}
    </Container>
  );
};

export default Home;