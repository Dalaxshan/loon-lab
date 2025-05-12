import React, { useState } from 'react';
import { TextField, Box, MenuItem } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');

  const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
  ];

  const handleSearch = () => {
    if (query) {
      onSearch(query, genre);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
      <TextField
        label="Search Movies"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        fullWidth
      />
      <TextField
        select
        label="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="">All</MenuItem>
        {genres.map((g) => (
          <MenuItem key={g.id} value={g.id}>
            {g.name}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default SearchBar;