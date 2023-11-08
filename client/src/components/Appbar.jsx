import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom"

import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
  } from '@mui/material';
// import { styled } from '@mui/material/styles';
import "../styles/Header.css"

////// <<---Images & Icons--->>//////
import bonzaiLogo from "../assets/headerLogo/BonzaiLogo3.png";
import ToolBarContent from './ToolBarContent';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import Auth from "../utils/auth";

const drawerWidth = 240;
const navItems = [
  {
      id: 0,
      icon: <HomeIcon />,
      name: "Home",
      url: "/"
  },
  {
      id: 1,
      icon: <SearchIcon />,
      name: "Discover",
      url: "/discover"
  }
];

const loggedInItems = [
  ...navItems,
  {
      id: 2,
      icon: <AccountBoxIcon />,
      name: "Profile",
      url: "/profile"
  },
  {
      id: 3,
      icon: <LogoutIcon />,
      name: "Logout",
      url: "/", 
      onClick: () => Auth.logout()
  }
];

const loggedOutItems = [
  ...navItems,
  {
      id: 4,
      icon: <LoginIcon />,
      name: "Login",
      url: "/login"
  }
];


////-------------------------------------////
////<<-------- AppBar Function -------->>////
////-------------------------------------////

function ResponsiveAppBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <img className="logo" src={bonzaiLogo} style={{ width: 50, height: 50 }} alt="Bonzai Collective logo" />
      <Typography variant="h6" sx={{ my: 2 }}>
        Bonzai Collective
      </Typography>
      <Divider />
      <List>
        {(Auth.loggedIn() ? loggedInItems: loggedOutItems).map((item) => (
          <ListItem key={item.id} disablePadding>
            <Link to={`${item.url}`}>
              <ListItemButton 
                sx={{ textAlign: "center" }}
                onClick={item.onClick}>
                <ListItemIcon >
                    <>{item.icon}</>
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>                
          </ListItem>
        ))}
      </List>
    </Box>
  );

  function HideOnScroll(hideProps) {
    const { children } = hideProps;
    const trigger = useScrollTrigger();
  
    return (
      <Slide appear={true} direction="down" in={trigger}>
        {children}
      </Slide>
    );
  }
  
  HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
  };

  return (
    <Container id="back-to-top-anchor" sx={{ display: 'flex', position: 'absolute' }}>
      <HideOnScroll>
        <AppBar sx={{backgroundColor: "#515b3a"}} component="nav">
          <Toolbar sx={{ justifyContent: "space-between"}}>
            <IconButton 
            color="inherit"
            aria-label="open drawer"
            edge="start"
            className={mobileOpen}
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <ToolBarContent />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main">
        <Toolbar />
      </Box>
    </Container>
  );
}

export default ResponsiveAppBar;