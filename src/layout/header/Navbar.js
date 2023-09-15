import React, { useContext } from 'react';
import { Menu, Row, Col } from 'antd';
import navbar from 'styles/navbar';
import { AppContext } from 'context/AppContext';

const Navbar = () => {
  const { categoriesNavbar } = useContext(AppContext);
  return (
    <Row>
      <Col xs={0} md={0} xl={24}>
        <Menu mode='horizontal' items={categoriesNavbar} style={navbar.menu} />
      </Col>
    </Row>
  );
};

export default Navbar;
