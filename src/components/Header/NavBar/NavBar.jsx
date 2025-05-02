import { List, ListItem } from '@mui/material'
import React from 'react'

const NavBar = () => {
    return (
        <List sx={{ display: 'flex', alignItems: 'center', gap: 3, mr: 2 }}>
            <ListItem sx={link}><a href="/">Home</a></ListItem>
            <ListItem sx={link}><a href="/">Movies</a></ListItem>
            <ListItem sx={link}><a href="/">Shows</a></ListItem>
            <ListItem sx={link}><a href="/">Trending</a></ListItem>  
        </List>
    )
}

const link = {
        textDecoration : 'none',
        fontFamily: 'Sour Gummy',
        fontWeight: 'bold',
        color: '#333',
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)',
        transition: 'all 0.2s ease',
        '&:hover': {
            transform: 'scale(1.1)',
            backgroundColor: '#5BC1D8',
            color: 'white',
            cursor: 'pointer'
        }
}

export default NavBar