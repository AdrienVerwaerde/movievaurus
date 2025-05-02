import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function MovieCard({ show }) {
    const rawText = show.summary?.replace(/<\/?[^>]+(>|$)/g, '') || '';
    const truncatedDesc = rawText.length > 200 ? `${rawText.substring(0, 200)}...` : rawText;
    const truncatedCast = show.cast?.slice(0, 3).map(c => c.person.name).join(', ') || 'Unknown';

    return (
        <Card sx={{
            maxWidth: 345, height: 720, color: '#333', transition: 'transform 0.3s ease', background: ' #5bc1d8', color: "white",
            '&:hover': {
                transform: 'scale(1.05)',
                cursor: 'pointer'
            },
        }}>
            <CardMedia
                sx={{ height: 480 }}
                image={show.image?.medium || '/placeholder.jpg'}
                title={show.name}
                
            />
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 2, textShadow: '1px 1px 2px #4D99C7' }}>
                <Box>
                    <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'left', fontFamily: "Sour Gummy", fontWeight: 'bold' }}>
                        {show.name}
                    </Typography>
                    
                </Box>
                <Box>
                    <Typography
                        variant="body2"
                        sx={{ textAlign: 'left', fontFamily: "Sour Gummy" }}
                    >
                        {truncatedDesc}
                    </Typography>
                </Box>
                {show.cast && (
                    <Box>
                        <Typography variant="body2" sx={{ fontStyle: 'italic', textAlign: 'left', fontFamily: "Roboto Slab", pb: 2 }}>
                            {truncatedCast}
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}
