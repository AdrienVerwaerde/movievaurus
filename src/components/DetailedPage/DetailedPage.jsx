import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Avatar, Button, useMediaQuery, Grid } from '@mui/material';

export default function DetailedPage() {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [cast, setCast] = useState([]);
    const [episodeCount, setEpisodeCount] = useState(null);
    const isMobile = useMediaQuery('(max-width: 760px)');

    useEffect(() => {
        const fetchDetails = async () => {
            const showRes = await fetch(`https://api.tvmaze.com/shows/${id}`);
            const showData = await showRes.json();
            setShow(showData);

            const castRes = await fetch(`https://api.tvmaze.com/shows/${id}/cast`);
            const castData = await castRes.json();
            setCast(castData);

            // Only fetch episodes if it's a show
            const episodesRes = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
            const episodesData = await episodesRes.json();
            setEpisodeCount(episodesData.length);
        };

        fetchDetails();
    }, [id]);

    if (!show) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ p: 4, width: isMobile ? '100%' : '45%' }}>
            <Button>
                <a href="/">Back</a>
            </Button>
            <Box>
                <img src={show.image?.original || ''} alt={show.name} width="345px" />
            </Box>
            <Typography variant="h3" gutterBottom sx={{ textAlign: 'left', fontFamily: "Sour Gummy", fontWeight: 'bold' }}>{show.name}</Typography>
            <Typography
                variant="body1"
                sx={{ mb: 3, fontFamily: "Roboto, sans-serif", }}
                dangerouslySetInnerHTML={{ __html: show.summary }}
            />

            {episodeCount !== null && (
                <Typography variant="subtitle1" sx={{ mb: 2, fontFamily: "Sour Gummy", fontWeight: 'bold' }}>
                    Total Episodes: {episodeCount}
                </Typography>
            )}

            <Typography variant="h5" sx={{ mt: 4, mb: 2, fontFamily: "Sour Gummy", fontWeight: 'bold' }}>Cast</Typography>
            <Grid container spacing={2}>
                {cast.map(c => (
                    <Grid
                        item
                        key={c.person.id}
                        xs={12}
                        md={4}
                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                    >
                        <Avatar
                            alt={c.person.name}
                            src={c.person.image?.medium || ''}
                            sx={{ width: 64, height: 64 }}
                        />
                        <Typography>{c.person.name}</Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
