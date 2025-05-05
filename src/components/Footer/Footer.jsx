import { AppBar, Box, Button, Typography, useMediaQuery } from '@mui/material'
import jungle from '../../assets/jungle.jpg'



const Footer = () => {
    const isMobile = useMediaQuery('(max-width: 760px)');
    return (
        <Box>
            <AppBar position="static" sx={{ width: '100%', backgroundColor: 'transparent', backgroundImage: `url(${jungle})` }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                    <Button onClick={() => window.scrollTo(0, 0)} sx={{ p: 0 }}>
                        <img src="/dinologo.png" alt="logo" width="70" />
                    </Button>
                    <Typography sx={{ fontFamily: "Rubik Distressed", fontSize: isMobile ? '20px' : '30px', color: 'white', textShadow: '1px 1px 4px #000000', mr: 2 }}>
                        FÉRIEVAURUS
                    </Typography>
                </Box>
            </AppBar>
        </Box>
    )
}

export default Footer

