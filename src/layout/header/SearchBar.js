import React, { useState } from 'react';
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
  Dropdown,
} from 'antd';
import { SearchOutlined, MenuOutlined, SettingFilled } from '@ant-design/icons';
import { ReactSVG } from 'react-svg';
import { useRecoilValue } from 'recoil';

import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import useAuthActions from 'recoil/action';
import { categoriesNavbarState, authState } from 'recoil/atom';
import { GoogleLogout } from 'react-google-login';
import { CLIENTID } from 'config';
import { Logout } from 'components/icon/Icon';

const onSuccess = () => {
  console.log('Logout success');
};

const onFail = () => {
  console.log('Fail');
};

const items = [
  {
    key: '1',
    label: 'Quản lý công việc',
  },
  {
    key: '2',
    label: 'Cài Đặt',
    icon: <SettingFilled />,
  },
  {
    key: '3',
    label: (
      <GoogleLogout
        clientId={CLIENTID}
        onLogoutSuccess={onSuccess}
        onFailure={onFail}
        render={(renderProps) => (
          <Typography.Text onClick={renderProps.onClick}>
            Đăng xuất
          </Typography.Text>
        )}
      ></GoogleLogout>
    ),
    icon: <Logout size={14} />,
  },
];

function SearchBar() {
  const { useBreakpoint } = Grid;
  const { md, lg } = useBreakpoint();

  const categoriesNavbar = useRecoilValue(categoriesNavbarState);
  const auth = useRecoilValue(authState);
  const { logout } = useAuthActions();

  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const showModalRegister = () => {
    setOpenRegister(true);
  };
  const handleOkRegister = () => {
    setTimeout(() => {
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
    setTimeout(() => {
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

  const onClick = ({ key }) => {
    if (key === '3') {
      logout();
    }
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
              <Dropdown menu={{ items, onClick }}>
                <div>
                  <ReactSVG
                    style={{ height: 40 }}
                    src='/icon/user.svg'
                    beforeInjection={(svg) => {
                      svg.setAttribute('width', '32');
                      svg.setAttribute('height', '32');
                    }}
                  />
                </div>
              </Dropdown>
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
