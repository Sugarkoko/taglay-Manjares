import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleIcon from "@mui/icons-material/People";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import logo from "../assets/logo.svg";
import Footer from "./Footer";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: "rgba(45, 55, 72, 0.8)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "16px",
  boxShadow: "0 18px 50px rgba(0, 0, 0, 0.3)",
  top: "20px",
  left: "20px",
  right: "20px",
  width: "calc(100% - 40px)",
  transition: theme.transitions.create(["width", "left"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const getPageTitle = (pathname) => {
  switch (pathname) {
    // case "/dashboard":
    //   return "Dashboard";
    case "/dashboard/dash-articles":
      return "Articles";
    case "/dashboard/users":
      return "Users";
    // case "/dashboard/reports":
    //   return "Reports";
    default:
      return "Welcome";
  }
};

const DashLayout = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const name =
    location.state?.firstName || localStorage.getItem("firstName") || "User";
  const userType = location.state?.type || localStorage.getItem("type");
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />
        {/* App Bar */}
        <AppBar position="fixed">
          <Toolbar sx={{ gap: 2 }}>
            <IconButton
              color="inherit"
              aria-label="open menu"
              onClick={handleMenuOpen}
              edge="start"
              sx={{ 
                marginRight: 2,
                color: '#a855f7',
                '&:hover': {
                  background: 'rgba(168, 85, 247, 0.1)',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mr: 2 }}>
              <img src={logo} alt="Logo" style={{ width: 34, height: 34 }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  fontSize: '1.25rem',
                  background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Taglay
              </Typography>
            </Box>
            <Typography
              variant="body1"
              noWrap
              sx={{ 
                flexGrow: 1,
                color: '#e5e7eb',
                fontWeight: 600,
              }}
            >
              Welcome, {name}
            </Typography>
            {/* Search */}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Button 
              variant="outlined" 
              onClick={handleLogout}
              sx={{
                borderColor: "rgba(168, 85, 247, 0.5)",
                color: "#fff",
                borderRadius: '12px',
                padding: '10px 16px',
                fontWeight: 700,
                textTransform: 'none',
                "&:hover": {
                  borderColor: "#a855f7",
                  background: "rgba(168, 85, 247, 0.1)",
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.18s ease',
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              background: '#2d3748',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              mt: 1,
              boxShadow: '0 18px 50px rgba(0, 0, 0, 0.3)',
              minWidth: 200,
            }
          }}
        >
          <MenuItem 
            onClick={() => handleNavigation('/dashboard/dash-articles')}
            selected={location.pathname === '/dashboard/dash-articles'}
            sx={{
              color: '#e5e7eb',
              borderRadius: '8px',
              mx: 1,
              my: 0.5,
              '&:hover': {
                background: 'rgba(168, 85, 247, 0.1)',
              },
              '&.Mui-selected': {
                background: 'rgba(168, 85, 247, 0.2)',
                '&:hover': {
                  background: 'rgba(168, 85, 247, 0.3)',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: '#a855f7' }}>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText>Articles</ListItemText>
          </MenuItem>
          {userType === "admin" && (
            <MenuItem 
              onClick={() => handleNavigation('/dashboard/users')}
              selected={location.pathname === '/dashboard/users'}
              sx={{
                color: '#e5e7eb',
                borderRadius: '8px',
                mx: 1,
                my: 0.5,
                '&:hover': {
                  background: 'rgba(168, 85, 247, 0.1)',
                },
                '&.Mui-selected': {
                  background: 'rgba(168, 85, 247, 0.2)',
                  '&:hover': {
                    background: 'rgba(168, 85, 247, 0.3)',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: '#a855f7' }}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText>Users</ListItemText>
            </MenuItem>
          )}
        </Menu>

        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            display: "flex", 
            flexDirection: "column", 
            background: "#1f2937",
            width: "100%",
            overflow: "auto",
            pt: "100px",
          }}
        >
          {/* Content */}
          <Box sx={{ flexGrow: 1, p: 3, width: "100%" }}>
            <Outlet />
          </Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default DashLayout;
