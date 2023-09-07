import React, { useState, useEffect, useContext } from 'react';
import {
  Input,
  Image,
  Typography,
  Button,
  Layout,
  Row,
  Col,
  Grid,
  Menu,
} from 'antd';
import { SearchOutlined, MenuOutlined } from '@ant-design/icons';
import { ReactSVG } from 'react-svg';

import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import { useAuthActions } from 'recoil/auth';
import { useRecoilValue } from 'recoil';
import authAtom from 'recoil/auth/atom';
import { AppContext } from 'context/AppContext';

function SearchBar() {
  const { useBreakpoint } = Grid;
  const { sm, md, lg } = useBreakpoint();

  const [loading, setLoading] = useState(false);
  const { categoriesNavbar } = useContext(AppContext);

  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const auth = useRecoilValue(authAtom);
  const { logout } = useAuthActions();

  const showModalRegister = () => {
    setOpenRegister(true);
  };
  const handleOkRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenRegister(false);
    }, 3000);
  };
  const handleCancelRegister = () => {
    setOpenRegister(false);
  };

  const showModalLogin = () => {
    setOpenLogin(true);
  };
  const handleOkLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenLogin(false);
    }, 3000);
  };
  const handleCancelLogin = () => {
    setOpenLogin(false);
  };

  const handleMove = (type) => {
    if (type === 'register') {
      setOpenRegister(true);
      setOpenLogin(false);
    } else {
      setOpenLogin(true);
      setOpenRegister(false);
    }
  };

  useEffect(() => {
    console.log('change');
  }, [auth.token]);

  const logoutHandlder = () => {
    logout();
  };

  return (
    <Layout.Header style={{ background: '#FFFFFF', padding: '0 20px' }}>
      {/* Modal Register */}
      <RegisterModal
        visible={openRegister}
        onCancel={handleCancelRegister}
        onOk={handleOkRegister}
        handleMove={handleMove}
      />

      {/* Modal Login */}
      <LoginModal
        visible={openLogin}
        onCancel={handleCancelLogin}
        onOk={handleOkLogin}
        handleMove={handleMove}
      />

      <Row
        align='middle'
        justify='space-between'
        style={{
          maxWidth: 1080,
          margin: '0 auto',
        }}
      >
        <Col xs={6} sm={2} md={2} lg={1} xl={0}>
          <div>
            <MenuOutlined onClick={toggleCollapsed} />
            <Menu
              mode='inline'
              inlineCollapsed={collapsed}
              items={categoriesNavbar}
              style={{
                position: 'absolute',
                width: 300,
                zIndex: 100,
                display: collapsed ? 'none' : '',
              }}
            />
          </div>
        </Col>
        <Col xs={2} sm={2} md={1} lg={1} xl={1}>
          <Image
            width={34}
            src='/icon/logo.svg'
            alt='Apofoitisi logo'
            preview={false}
          />
        </Col>
        <Col xs={5} sm={3} md={2} lg={2} xl={4}>
          <Typography.Title level={3} style={{ margin: 0 }}>
            SEP
          </Typography.Title>
        </Col>

        <Col xs={0} sm={12} md={11} lg={13} xl={13}>
          <Input
            placeholder='Tìm kiếm'
            prefix={<SearchOutlined style={{ color: '#828282' }} />}
            style={{
              padding: 10,
              borderRadius: 8,
              width: lg ? 477 : md ? 325 : 250,
            }}
          />
        </Col>

        {auth.email ? (
          <>
            <Col xs={0} sm={0} md={3} lg={3} xl={3}>
              <ReactSVG
                style={{ height: 40 }}
                src='/icon/notification.svg'
                beforeInjection={(svg) => {
                  svg.setAttribute('width', '32');
                  svg.setAttribute('height', '32');
                }}
              />
            </Col>
            <Col xs={7} sm={5} md={4} lg={4} xl={3}>
              <ReactSVG
                style={{ height: 40 }}
                src='/icon/user.svg'
                beforeInjection={(svg) => {
                  svg.setAttribute('width', '32');
                  svg.setAttribute('height', '32');
                }}
              />
            </Col>
          </>
        ) : (
          <>
            <Col xs={0} sm={0} md={3} lg={3} xl={3}>
              <Button onClick={showModalRegister}>Đăng kí</Button>
            </Col>
            <Col xs={7} sm={5} md={4} lg={4} xl={3}>
              <Button onClick={showModalLogin}>Đăng nhập</Button>
            </Col>
          </>
        )}
      </Row>
    </Layout.Header>
  );
}

export default SearchBar;
