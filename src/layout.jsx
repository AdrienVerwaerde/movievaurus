import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export default function Layout() {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );
}
