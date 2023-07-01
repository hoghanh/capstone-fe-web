import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">My Website</Typography>
        {/* Các thành phần Navbar khác ở đây */}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
