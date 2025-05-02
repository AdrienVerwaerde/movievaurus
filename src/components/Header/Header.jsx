import { AppBar, Box, IconButton, Typography, useMediaQuery } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import jungle from '../../assets/jungle.jpg'



const Header = () => {
    const isMobile = useMediaQuery('(max-width: 600px)');
    return (
        <Box>
            <AppBar position="static" sx={{ width: '100%', backgroundColor: 'transparent', backgroundImage: `url(${jungle})` }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                    <img src="/dinologo.png" alt="logo" width="100" />
                    <Typography sx={{ fontFamily: "Rubik Distressed", fontSize: isMobile ? '30px' : '50px', color: 'white', textShadow: '1px 1px 4px #000000' }}>
                        MOVIEVAURUS
                    </Typography>
                    <IconButton
                        size="small"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ ml: "auto", mr: 2 }}
                    >
                        <MenuIcon fontSize='large' sx={{ textShadow: '1px 1px 4px #000000' }} />
                    </IconButton>
                </Box>
            </AppBar>
        </Box>
    )
}

export default Header

