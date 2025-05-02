import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MovieCard from '../Cards/MovieCard';
import { Button, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const fetchCast = async (id) => {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}/cast`);
    return res.json();
};

export default function CardsGrid() {
    const [shows, setShows] = React.useState([]);
    const [query, setQuery] = React.useState('');

    const fetchShows = async (searchTerm = '') => {
        let showsData;

        if (searchTerm.trim()) {
            const res = await fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
            const data = await res.json();
            showsData = data.map(item => item.show);
        } else {
            const res = await fetch('https://api.tvmaze.com/shows');
            const data = await res.json();
            showsData = data.slice(0, 10);
        }

        const showsWithCast = await Promise.all(
            showsData.map(async (show) => {
                const cast = await fetchCast(show.id);
                return { ...show, cast };
            })
        );
        setShows(showsWithCast);
    };

    React.useEffect(() => {
        fetchShows();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetchShows(query);
    };

    return (
        <Box sx={{ flexGrow: 1, p: 2, mt: 2 }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <TextField
                    label="Search shows"
                    variant="outlined"
                    fullWidth
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button type="submit">
                    <SearchIcon />
                </Button>
            </Box>

            <Grid container spacing={3}>
                {shows.map(show => (
                    <Grid item key={show.id} xs={12} sm={6} md={4}>
                        <MovieCard show={show} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
