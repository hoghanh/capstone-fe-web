import React from "react";
import { Menu } from "antd";
import navbar from "../../styles/navbar";

const Navbar = () => {
  return (
    <Menu mode="horizontal" items={navbar.items} style={navbar.menu}></Menu>
  );
};

export default Navbar;
