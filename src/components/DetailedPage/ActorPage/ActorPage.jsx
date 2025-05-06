import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Avatar, CircularProgress, Grid, Card, useMediaQuery, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

export default function ActorPage() {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [credits, setCredits] = useState([]);
    const navigate = useNavigate();

    const isMobile = useMediaQuery('(max-width: 760px)');

    useEffect(() => {
        const fetchPerson = async () => {
            const res = await fetch(`https://api.tvmaze.com/people/${id}`);
            const data = await res.json();
            setPerson(data);

            const creditsRes = await fetch(`https://api.tvmaze.com/people/${id}/castcredits?embed=show`);
            const creditsData = await creditsRes.json();
            setCredits(creditsData);
        };

        fetchPerson();

    }, [id]);

    if (!person) return <CircularProgress sx={{ mt: 4 }} />;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card sx={{ m: 2, p: 4, width: isMobile ? '80%' : '50%', borderRadius: "12px", display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'center' : 'flex-start' }}>
                <Button onClick={() => navigate(-1)} sx={{ p: 0, mb: 1, alignSelf: 'flex-start', backgroundColor: 'transparent' }}>
                        <Typography sx={{ display: 'flex', alignItems: 'center', fontFamily: "Sour Gummy", fontWeight: 'bold', color: '#4B8AB9', '&:hover': { color: '#5bc1d8' }, transition: 'all ease 0.2s' }}>
                            <ArrowBack fontSize='small' />
                            Back
                        </Typography>
                </Button>
                <Avatar
                    alt={person.name}
                    src={person.image?.original || ''}
                    sx={{ width: 150, height: 150, mb: 2 }}
                />
                <Typography variant="h4" sx={{ fontWeight: 'bold', fontFamily: 'Sour Gummy' }}>
                    {person.name}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Birthday: {person.birthday || 'Unknown'}
                </Typography>
                <Typography variant="body1">
                    Country: {person.country?.name || 'Unknown'}
                </Typography>
                <Typography variant="body1">
                    Gender: {person.gender || 'Unknown'}
                </Typography>
                {person.url && (
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        Bio:{" "}
                        <a href={person.url} target="_blank" rel="noreferrer" style={{ color: '#1976d2' }}>
                            Visit TVMaze Profile
                        </a>
                    </Typography>
                )}

                <Typography variant="h5" sx={{ mt: 4, mb: 2, fontFamily: "Sour Gummy", fontWeight: 'bold' }}>
                    Known For
                </Typography>

                <Grid container spacing={2}>
                    {credits.map((credit) => {
                        const show = credit._embedded?.show;
                        if (!show) return null;
                        return (
                            <Grid item key={show.id} xs={12} sm={6} md={4} sx={{ display: 'flex', alignItems: 'center', gap: 1, width: isMobile ? '100%' : '40%', border: '1px solid #ccc', borderRadius: '4px', p: 2 }}>
                                <Link to={`/${show.id}`} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <img
                                            src={show.image?.medium || 'https://placehold.co/345x480?text=🚫'}
                                            alt={show.name}
                                            style={{ width: 60, height: 85, objectFit: 'cover', borderRadius: 4 }}
                                        />
                                        <Typography sx={{ fontWeight: 500 }}>{show.name}</Typography>
                                    </Box>
                                </Link>
                            </Grid>
                        );
                    })}
                </Grid>
            </Card>
        </Box>
    );
}
