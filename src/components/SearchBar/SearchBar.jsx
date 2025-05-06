import React, { useState } from 'react';
import { Box, TextField, InputAdornment, IconButton, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');
    const isMobile = useMediaQuery('(max-width: 760px)');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ width: isMobile ? "100%" : "345px", mr: 1.2 }}>
            <TextField
                label="Search shows..."
                variant="outlined"
                fullWidth
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton type="submit" edge="end" disableRipple sx={{'&:hover': { color: '#59BFD6', transform: 'scale(1.1)' }, color: '#999', transition: 'transform 0.2s ease'}}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        color: '#333',
                        
                        '& fieldset': {
                            borderColor: '#999', // default border
                        },
                        '&:hover fieldset': {
                            borderColor: '#999', // hover border
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#5BC1D8', // focus border
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#999', // label color
                        '&.Mui-focused': {
                            color: '#5BC1D8', // label focus color
                        },
                        '&.hover': {
                            color: '#5BC1D8', // label hover color
                        },
                    },
                }}
            />
        </Box>
    );
}
