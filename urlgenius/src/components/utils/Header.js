// Header.js

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

const Header = () => {
    // Estado para controlar o menu do usuário
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    URLGenius
                </Typography>
                {/* Ícone do usuário com menu suspenso */}
                <IconButton color="inherit" onClick={handleMenuOpen}>
                    <AccountCircleIcon />
                </IconButton>
                {/* Menu do usuário */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    {/* Informações do usuário e opções */}
                    <MenuItem onClick={handleMenuClose}>Meu Perfil</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Configurações</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Sair</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
