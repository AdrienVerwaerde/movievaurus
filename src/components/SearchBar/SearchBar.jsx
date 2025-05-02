import React from 'react';
import { TextField } from '@mui/material';

export default function SearchBar({ onSearch }) {
    const handleChange = (e) => {
        const query = e.target.value;
        onSearch(query);
    };

    return (
        <TextField
            label="Search shows"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            sx={{ mb: 4 }}
        />
    );
}
