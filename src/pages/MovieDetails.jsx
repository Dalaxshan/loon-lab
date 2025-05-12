import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import axios from 'axios';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState('');
  const [error, setError] = useState('');

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const BASE_URL = 'https://api.themoviedb.org/3';

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`)
      .then((response) => {
        setMovie(response.data);
        const trailerVideo = response.data.videos.results.find((v) => v.type === 'Trailer');
        if (trailerVideo) {
          setTrailer(`https://www.youtube.com/embed/${trailerVideo.key}`);
        }
      })
      .catch(() => setError('Failed to load movie details'));
  }, [id, API_KEY]);

  if (error) return <Typography color="error">{error}</Typography>;
  if (!movie) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4">{movie.title}</Typography>
      <Box sx={{ mt: 2 }}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        <Typography variant="body1" sx={{ mt: 2 }}>
          {movie.overview}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Genres: {movie.genres.map((g) => g.name).join(', ')}
        </Typography>
        <Typography variant="body2">Rating: {movie.vote_average}</Typography>
        <Typography variant="body2">Release: {movie.release_date}</Typography>
        {trailer && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Trailer</Typography>
            <iframe
              width="560"
              height="315"
              src={trailer}
              title="Trailer"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default MovieDetails;