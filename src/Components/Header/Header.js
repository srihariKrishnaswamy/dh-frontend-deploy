import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar style={{backgroundColor: "#E66E15"}}>
        <Typography variant="h6"><b>Clarity</b></Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;