import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const navbarStyles = {
  appBar: {
    zIndex: 1300,
    backgroundColor: "#00B4CB",
    paddingBottom: "8px", // Adiciona padding na parte inferior
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
  },
  title: {
    display: "none",
    "@media (min-width: 600px)": {
      display: "block",
    },
    textDecoration: "none", // Remove sublinhado do link
    color: "inherit", // Mantém a cor do texto conforme o tema
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    marginLeft: "8px", // Espaçamento à esquerda do ícone e nome
  },
  avatar: {
    width: 32,
    height: 32,
    marginRight: "8px", // Espaçamento à direita do avatar
  },
  menuButton: {
    marginLeft: "8px", // Espaçamento entre o ícone e o avatar
  },
};

const Navbar = ({ user }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed" sx={navbarStyles.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <div style={navbarStyles.titleContainer}>
            <Typography variant="h6" component={Link} to="/" sx={navbarStyles.title}>
              URLGenius
            </Typography>
          </div>
          Olá {user?.name || "Usuário"}!
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose} component={Link} to="/reset_password">Trocar minha senha</MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/add_user">Criar novo usuário</MenuItem>
            <MenuItem onClick={handleMenuClose}>Sair</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* Toolbar vazio para empurrar o conteúdo para baixo */}
    </>
  );
};

export default Navbar;
