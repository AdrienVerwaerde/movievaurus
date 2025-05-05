import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MovieCard from '../Cards/MovieCard';
import SearchBar from '../SearchBar/SearchBar';
import { useMediaQuery } from '@mui/material';

const fetchCast = async (id) => {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}/cast`);
    return res.json();
};

export default function CardsGrid() {
    const [shows, setShows] = React.useState([]);
    const isMobile = useMediaQuery('(max-width: 760px)');

    const fetchShows = async (searchTerm = '') => {
        let showsData;

        if (searchTerm.trim()) {
            const res = await fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
            const data = await res.json();
            showsData = data.map(item => item.show);
        } else {
            const res = await fetch('https://api.tvmaze.com/shows');
            const data = await res.json();
            showsData = data.slice(0, 12);
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

    return (
        <Box sx={{ flexGrow: 1, p: 2, pb: 4, m: 2, backgroundColor: "white", borderRadius: "12px", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)" }}>

            <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                <Box sx={{ width: isMobile ? "80%" : "100%" }}>
                    <SearchBar onSearch={fetchShows} />
                </Box>
                {shows.map(show => (
                    <Grid item key={show.id} xs={12} sm={6} md={4}>
                        <MovieCard show={show} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
