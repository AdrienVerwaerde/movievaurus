import { AppBar, Box, Button, Stack, Typography, useMediaQuery } from '@mui/material'
import jungle from '../../assets/jungle.jpg'



const Footer = () => {
    const isMobile = useMediaQuery('(max-width: 760px)');
    return (
        <Box>
            <AppBar position="static" sx={{ width: '100%', backgroundColor: 'transparent', backgroundImage: `url(${jungle})` }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                    <Stack direction="row">
                        <Button onClick={() => window.scrollTo(0, 0)} sx={{ p: 0 }}>
                            <img src="/dinologo.png" alt="logo" width="70" />
                        </Button>
                        <Typography sx={{ fontFamily: "Roboto Slab", fontSize: isMobile ? '12px' : '24px', color: 'white', textShadow: '1px 1px 4px #000000', mt: 0.5,ml: isMobile ? 0.2 : 0.5, textAlign: 'left' }}>click me to go back to top</Typography>
                    </Stack>
                    <Typography sx={{ fontFamily: "Rubik Distressed", fontSize: isMobile ? '20px' : '30px', color: 'white', textShadow: '1px 1px 4px #000000', mr: 2 }}>
                        FÉRIEVAURUS
                    </Typography>
                </Box>
            </AppBar>
        </Box>
    )
}

export default Footer

