import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MovieCard from '../Cards/MovieCard';
import SearchBar from '../SearchBar/SearchBar';
import { Button, Fade, useMediaQuery } from '@mui/material';

const fetchCast = async (id) => {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}/cast`);
    return res.json();
};

export default function CardsGrid() {
    const [allShows, setAllShows] = React.useState([]);
    const [visibleShows, setVisibleShows] = React.useState([]);
    const [visibleCount, setVisibleCount] = React.useState(12);
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
            showsData = data;
        }
        setAllShows(showsData);
        loadVisibleShows(showsData, 12);
    };

    const loadVisibleShows = async (showsData, count) => {
        const nextBatch = showsData.slice(0, count);
        const showsWithCast = await Promise.all(
            nextBatch.map(async (show) => {
                const cast = await fetchCast(show.id);
                return { ...show, cast };
            })
        );
        setVisibleShows(showsWithCast);
    };

    const handleLoadMore = () => {
        const newCount = visibleCount + 12;
        setVisibleCount(newCount);
        loadVisibleShows(allShows, newCount);
    };

    React.useEffect(() => {
        fetchShows();
    }, []);

    return (
        <Box sx={{ p: 2, pb: 4, m: 2, backgroundColor: "white", borderRadius: "12px", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)", display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: isMobile ? "center" : "flex-end" }}>
            <Box sx={{ width: isMobile ? "100%" : "80%", mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <SearchBar onSearch={fetchShows} />
            </Box>
            <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                {visibleShows.map(show => (
                    <Grid item key={show.id} xs={12} sm={6} md={4}>
                        <Fade in={true} timeout={500}>
                            <Box>
                                <MovieCard show={show} />
                            </Box>
                        </Fade>
                    </Grid>
                ))}
            </Grid>
            {visibleCount < allShows.length && (
                <Button
                    onClick={handleLoadMore}
                    disableRipple
                    sx={{ mt: 3, alignSelf: 'center', fontFamily: "Sour Gummy", backgroundColor: 'transparent', fontWeight: 'bold', fontSize: '20px', color: '#4B8AB9', '&:hover': { color: '#5bc1d8' }, transition: 'all ease 0.2s' }}
                >
                    More Shows
                </Button>
            )}
        </Box>
    );
}
