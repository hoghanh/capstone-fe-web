import React, { useState } from 'react';
import { Input, Image, Typography, Button, Layout } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { ReactSVG } from 'react-svg';

import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import { useAuthActions } from 'recoil/auth';
import { useRecoilValue } from 'recoil';
import authAtom from 'recoil/auth/atom';

function SearchBar() {
  const [loading, setLoading] = useState(false);

  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

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

  const logoutHandlder = () => {
    logout();
  };

  return (
    <Layout.Header style={{ background: '#FFFFFF' }}>
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

      <div
        style={{
          maxWidth: 1080,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Image
          width={34}
          src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
          alt='Apofoitisi logo'
          preview={false}
        />
        <Typography.Title level={3} style={{ margin: 0 }}>
          FPT - SEP
        </Typography.Title>
        <Input
          placeholder='Tìm kiếm'
          prefix={<SearchOutlined style={{ color: '#828282' }} />}
          style={{
            padding: 10,
            borderRadius: 8,
            width: 477,
          }}
        />
        <Typography.Title level={3} style={{ margin: 0 }}>
          Khám phá
        </Typography.Title>
        {auth.token !== null ? (
          <>
            <ReactSVG
              style={{ height: 40 }}
              src='./icon/notification.svg'
              beforeInjection={(svg) => {
                svg.setAttribute('width', '32');
                svg.setAttribute('height', '32');
              }}
            />
            <ReactSVG
              style={{ height: 40 }}
              src='./icon/user.svg'
              beforeInjection={(svg) => {
                svg.setAttribute('width', '32');
                svg.setAttribute('height', '32');
              }}
            />
          </>
        ) : (
          <>
            <Button onClick={showModalRegister}>Đăng kí</Button>
            <Button onClick={showModalLogin}>Đăng nhập</Button>
          </>
        )}
      </div>
    </Layout.Header>
  );
}

export default SearchBar;
