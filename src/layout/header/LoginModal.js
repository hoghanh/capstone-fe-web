import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Modal, Typography, Input, Button, Checkbox } from 'antd';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

import { home } from '../../styles/homepage';
import GoogleLoginButton from '../../components/button/GoogleLoginButton';
import Link from 'antd/es/typography/Link';
import { useAuthActions } from '../../recoil/auth';
import { post } from 'utils/APICaller';
import {
  showErrorMessage,
  showSuccessMessage,
} from 'components/message/Message';

function LoginModal({ visible, onCancel, onOk, handleMove }) {
  const [loading, setLoading] = useState(false);
  const { search } = useLocation();
  const { token, error } = queryString.parse(search);
  const { login } = useAuthActions();

  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onOk();
    }, 3000);
  };

  const loginBasic = (event) => {
    event.preventDefault();
    post({
      endpoint: `/accounts/login`,
      body: {
        email: username,
        password: password,
      },
    })
      .then((res) => {
        onCancel();
        login(res.data.token);
        showSuccessMessage('Đăng nhập thành công');
      })
      .catch((error) => {
        console.log(error);
        showErrorMessage('Có lỗi xảy ra, vui lòng kiểm tra lại');
      });
  };

  const userNameHandle = (event) => {
    setUsername(event.target.value);
  };

  const passwordHandle = (event) => {
    setpassword(event.target.value);
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
        <GoogleLoginButton />
        <div style={home.login.contain}>
          <div style={home.login.line}></div>
          <Typography style={home.login.or}>HOẶC</Typography>
          <div style={home.login.line}></div>
        </div>
        <Input
          placeholder='Email'
          style={home.login.input}
          onChange={userNameHandle}
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
        <Button type='primary' style={home.login.button} onClick={loginBasic}>
          Đăng Nhập
        </Button>
      </Modal>
    </>
  );
}

export default LoginModal;
