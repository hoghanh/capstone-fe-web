import React, { useState } from 'react';
import { Modal, Typography, Input, Button, Checkbox, notification } from 'antd';

import { home } from '../../styles/homepage';
import GoogleLoginButton from '../../components/button/GoogleLoginButton';
import Link from 'antd/es/typography/Link';
import useAuthActions from 'recoil/action';
import { post } from 'utils/APICaller';

function LoginModal({ visible, onCancel, onOk, handleMove }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuthActions();

  const handleOk = () => {
    setTimeout(() => {
      onOk();
    }, 3000);
  };

  const loginBasic = (event) => {
    if (!validateForm()) {
      return;
    }
    post({
      endpoint: `/accounts/login`,
      body: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        onCancel();
        login(res.data.token);
        setEmail('');
        setPassword('');
        notification.success({
          message: 'Đăng nhập thành công',
        });
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  };

  const emailHandle = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandle = (event) => {
    setPassword(event.target.value);
  };

  const validateForm = () => {
    if (email.trim() === '') {
      notification.error({ message: 'Vui lòng nhập email.' });
      return false;
    }

    if (password.trim() === '') {
      notification.error({
        message: 'Vui lòng nhập mật khẩu',
      });
      return false;
    }

    return true;
  };

  return (
    <>
      <Modal
        width={450}
        open={visible}
        title={<div style={{ height: 45 }}></div>}
        onOk={handleOk}
        onCancel={onCancel}
        footer={
          <Typography style={home.login.footerModal}>
            Chưa phải thành viên?{' '}
            <Link onClick={() => handleMove('register')}>
              <b>Tham gia ngay</b>
            </Link>
          </Typography>
        }
        bodyStyle={home.login.bodyModal}
      >
        <Typography.Title
          level={3}
          style={{ textAlign: 'center', margin: 0, padding: '15px 10px' }}
        >
          Đăng nhập FPT-SEP
        </Typography.Title>
        <GoogleLoginButton onLogin={() => onCancel()} />
        <div style={home.login.contain}>
          <div style={home.login.line}></div>
          <Typography style={home.login.or}>HOẶC</Typography>
          <div style={home.login.line}></div>
        </div>
        <Input
          placeholder='Email'
          style={home.login.input}
          onChange={emailHandle}
        />
        <Input.Password
          placeholder='Mật khẩu'
          style={home.login.input}
          autoComplete='current-password'
          onChange={passwordHandle}
        />
        <div style={home.login.contain}>
          <Checkbox>Nhớ tài khoản</Checkbox>
          <Typography>
            <Link>
              <b>Quên Mật Khẩu</b>
            </Link>
          </Typography>
        </div>
        <Button
          type='primary'
          style={home.login.button}
          onClick={() => loginBasic()}
        >
          Đăng Nhập
        </Button>
      </Modal>
    </>
  );
}

export default LoginModal;
