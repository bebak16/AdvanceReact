import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ marginLeft: "4em"}}>
          <Button color="inherit" onClick={() => navigate("/")}>
            <span role="img" aria-label="home">🏠</span>
            Home
          </Button>
          <Button color="inherit">About</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
