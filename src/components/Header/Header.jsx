import { AppBar, Box, Button, IconButton, Typography, useMediaQuery } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import jungle from '../../assets/jungle.jpg'
import NavBar from './NavBar/NavBar';



const Header = () => {
    const isMobile = useMediaQuery('(max-width: 760px)');
    return (
        <Box>
            <AppBar position="static" sx={{ width: '100%', backgroundColor: 'transparent', backgroundImage: `url(${jungle})` }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                    <Button onClick={() => window.location.replace('/')} sx={{p: 0}}>
                        <img src="/dinologo.png" alt="logo" width="100" />
                    </Button>
                    <Typography sx={{ fontFamily: "Rubik Distressed", fontSize: isMobile ? '30px' : '50px', color: 'white', textShadow: '1px 1px 4px #000000', mr: "auto" }}>
                        FÉRIEVAURUS
                    </Typography>
                </Box>
            </AppBar>
        </Box>
    )
}

export default Header

