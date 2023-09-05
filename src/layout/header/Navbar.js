import React from 'react';
import { Menu, Row, Col } from 'antd';
import navbar from '../../styles/navbar';

const Navbar = () => {
  return (
    <Row>
      <Col xs={0} md={0} xl={24}>
        <Menu mode='horizontal' items={navbar.items} style={navbar.menu} />
      </Col>
    </Row>
  );
};

export default Navbar;
