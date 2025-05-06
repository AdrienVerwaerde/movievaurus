import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Avatar, Button, useMediaQuery, Grid, Card, Collapse, Stack, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function DetailedPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [show, setShow] = useState(null);
    const [cast, setCast] = useState([]);
    const [episodes, setEpisodes] = useState([]);

    const [showFullCast, setShowFullCast] = useState(false);
    const [episodeCount, setEpisodeCount] = useState(null);
    const isMobile = useMediaQuery('(max-width: 760px)');
    const isLargeScreen = useMediaQuery('(min-width: 1200px)');

    useEffect(() => {
        const fetchDetails = async () => {
            const showRes = await fetch(`https://api.tvmaze.com/shows/${id}`);
            const showData = await showRes.json();
            setShow(showData);

            const castRes = await fetch(`https://api.tvmaze.com/shows/${id}/cast`);
            const castData = await castRes.json();
            setCast(castData);

            const episodesRes = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
            const episodesData = await episodesRes.json();
            setEpisodeCount(episodesData.length);
            setEpisodes(episodesData);
        };

        fetchDetails();
    }, [id]);

    const groupedBySeason = episodes.reduce((acc, ep) => {
        acc[ep.season] = acc[ep.season] || [];
        acc[ep.season].push(ep);
        return acc;
    }, {});

    if (!show) return <Typography>Loading...</Typography>;



    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
            <Card sx={{ p: 2, width: isMobile ? '80%' : '50%', display: 'flex', flexDirection: 'column', borderRadius: '12px', alignItems: 'flex-start' }}>
                <Button onClick={() => navigate(-1)} sx={{ p: 0, mb: 1, backgroundColor: 'transparent', display: 'block' }}>
                    <Typography sx={{ display: 'flex', alignItems: 'center', fontFamily: "Sour Gummy", fontWeight: 'bold', color: '#4B8AB9', '&:hover': { color: '#5bc1d8' }, transition: 'all ease 0.2s' }}>
                        <ArrowBack fontSize='small' />
                        Back
                    </Typography>
                </Button>
                <Box sx={{ display: 'flex', flexDirection: isLargeScreen ? 'row' : 'column', alignItems: isMobile ? 'center' : 'flex-start', gap: 2, width: '100%' }}>
                    <Box>
                        <img src={show.image?.original || ''} alt={show.name} width={isMobile ? '100%' : "90%"} />
                    </Box>
                    <Box>
                        <Typography variant="h3" gutterBottom sx={{ alignSelf: 'flex-start', fontFamily: "Sour Gummy", fontWeight: 'bold', mt: isMobile ? 2 : 0, lineHeight: isLargeScreen ? '0.65' : '1' }}>{show.name}</Typography>
                        <Typography
                            variant="body1"
                            sx={{ fontFamily: "Roboto Slab", }}
                            dangerouslySetInnerHTML={{ __html: show.summary }}
                        />


                        {episodeCount !== null && (
                            <Typography variant="subtitle1" sx={{ fontFamily: "Sour Gummy", fontWeight: 'bold', alignSelf: 'flex-start' }}>
                                Total Episodes: {episodeCount}
                            </Typography>
                        )}
                    </Box>
                </Box>
                <Typography variant="h5" sx={{ mt: 4, mb: 2, fontFamily: "Sour Gummy", fontWeight: 'bold' }}>
                    Seasons & Episodes
                </Typography>
                {Object.entries(groupedBySeason).map(([season, eps]) => (
                    <Accordion key={season} sx={{ width: '100%', backgroundColor: 'transparent', boxShadow: "none", border: '1px solid #333', borderRadius: "12px", mb: 1, '&:before': { backgroundColor: 'transparent' } }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontWeight: 'bold', fontFamily: 'Roboto Slab', color: '#4B8AB9' }}>
                                Season {season}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack spacing={1}>
                                {eps.map(ep => (
                                    <Box key={ep.id}>
                                        <Typography variant="body2" sx={{ fontFamily: 'Roboto Slab' }}>
                                            <strong>Episode {ep.number}:</strong> {ep.name}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                ))}
                <Typography variant="h5" sx={{ mt: 2, mb: 2, fontFamily: "Sour Gummy", fontWeight: 'bold', alignSelf: 'flex-start' }}>Cast</Typography>
                <Grid container spacing={2}>
                    {cast.slice(0, 6).map(c => (
                        <Grid
                            item
                            key={c.person.id}
                            xs={12}
                            md={4}
                            sx={{ display: 'flex', alignItems: 'center', gap: 1, width: isMobile ? '100%' : '40%' }}
                        >
                            <Link
                                to={`/actor/${c.person.id}`}
                                style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'inherit' }}
                            >
                                <Avatar
                                    alt={c.person.name}
                                    src={c.person.image?.medium || ''}
                                    sx={{ width: 64, height: 64 }}
                                />
                                <Stack direction="column">
                                    <Typography>{c.person.name}</Typography>
                                    <Typography sx={{ fontStyle: 'italic', color: '#4B8AB9' }}>{c.character.name}</Typography>
                                </Stack>
                            </Link>
                        </Grid>
                    ))}
                    <Collapse in={showFullCast} timeout="auto" unmountOnExit style={{ width: '100%' }}>
                        <Grid container spacing={2}>
                            {cast.slice(6).map(c => (
                                <Grid
                                    item
                                    key={c.person.id}
                                    xs={12}
                                    md={4}
                                    sx={{ display: 'flex', alignItems: 'center', gap: 1, width: isMobile ? '100%' : '40%' }}
                                >
                                    <Link
                                        to={`/person/${c.person.id}`}
                                        style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <Avatar
                                            alt={c.person.name}
                                            src={c.person.image?.medium || ''}
                                            sx={{ width: 64, height: 64 }}
                                        />
                                        <Stack direction="column">
                                            <Typography>{c.person.name}</Typography>
                                            <Typography sx={{ fontStyle: 'italic', color: '#4B8AB9' }}>{c.character.name}</Typography>
                                        </Stack>
                                    </Link>
                                </Grid>

                            ))}
                        </Grid>
                    </Collapse>
                </Grid>
                {cast.length > 6 && (
                    <Button
                        onClick={() => setShowFullCast(prev => !prev)}
                        disableRipple
                        sx={{ mt: 2, alignSelf: 'center', fontFamily: "Sour Gummy", backgroundColor: 'transparent', fontWeight: 'bold', color: '#4B8AB9', '&:hover': { color: '#5bc1d8' }, transition: 'all ease 0.2s' }}
                    >
                        {showFullCast ? 'Show Less' : 'Show More'}
                    </Button>
                )}
            </Card>
        </Box>
    );
}
