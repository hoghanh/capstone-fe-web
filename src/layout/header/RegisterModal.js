import React, { useState } from 'react';
import { Modal, Typography, Input, Button, message } from 'antd';
import { notification } from 'antd';

import { home } from 'styles/homepage';
import GoogleLoginButton from 'components/button/GoogleLoginButton';
import Link from 'antd/es/typography/Link';
import { post } from 'utils/APICaller';

function RegisterModal({ visible, onCancel, onOk, handleMove }) {
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onOk();
    }, 3000);
  };

  const emailHandle = (event) => {
    setemail(event.target.value);
  };
  const nameHandle = (event) => {
    setName(event.target.value);
  };

  const passwordHandle = (event) => {
    setPassword(event.target.value);
  };

  const confirmPasswordHandle = (event) => {
    setConfirmPassword(event.target.value);
  };

  const register = (e) => {
    if (!validateForm()) {
      return;
    }
    post({
      endpoint: `/accounts/register`,
      body: {
        email: email,
        name: name,
        password: password,
      },
    })
      .then((res) => {
        onCancel();
        notification.success({
          message: 'Đăng ký tài khoản thành công',
        });
      })
      .catch((error) => {
        console.log(error.response.data.message);
        notification.error({
          message: error.response.data.message,
        });
      });
  };

  const validatePasswordFormat = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    if (email.trim() === '') {
      notification.error({ message: 'Vui lòng nhập email.' });
      return false;
    } else if (!validateEmailFormat(email)) {
      notification.error({ message: 'Vui lòng nhập đúng định dạng email.' });
      return false;
    }

    if (name.trim() === '') {
      notification.error({ message: 'Vui lòng nhập tên doanh nghiệp' });
      return false;
    }

    if (email.trim() === '') {
      notification.error({ message: 'Vui lòng nhập tên đăng nhập.' });
      return false;
    }

    if (password.trim() === '') {
      notification.error({
        message: 'Vui lòng nhập mật khẩu',
      });
      return false;
    } else if (!validatePasswordFormat) {
      return false;
    }
    if (confirmPassword.trim() === '') {
      notification.error({
        message: 'Vui lòng xác nhận lại mật khẩu',
      });
      return false;
    } else if (password !== confirmPassword) {
      return false;
    }

    return true;
  };

  return (
    <Modal
      width={450}
      open={visible}
      title={<div style={{ height: 45 }}></div>}
      onOk={handleOk}
      onCancel={onCancel}
      footer={
        <Typography style={home.login.footerModal}>
          Đã là thành viên?{' '}
          <Link onClick={() => handleMove('login')}>
            <b>Đăng nhập</b>
          </Link>
        </Typography>
      }
      bodyStyle={home.login.bodyModal}
    >
      <Typography.Title
        level={3}
        style={{ textAlign: 'center', margin: 0, padding: '15px 10px' }}
      >
        Trở thành thành viên FPT-SEP
      </Typography.Title>
      <GoogleLoginButton />
      <div style={home.login.contain}>
        <div style={home.login.line}></div>
        <Typography style={home.login.or}>HOẶC</Typography>
        <div style={home.login.line}></div>
      </div>
      <Input
        placeholder='Email'
        className='Email'
        style={home.login.input}
        onChange={emailHandle}
      />
      <Input
        placeholder='Tên doanh nghiệp'
        className='FullName'
        style={home.login.input}
        onChange={nameHandle}
      />
      <Input.Password
        placeholder='Mật khẩu'
        className='Password'
        style={home.login.input}
        onChange={passwordHandle}
      />
      <Typography.Text
        type='danger'
        style={
          validatePasswordFormat(password) || password.length === 0
            ? home.login.remindText
            : home.login.remindTextError
        }
        className='PasswordLabelError'
      >
        8 ký tự trở lên. Kết hợp chữ hoa và chữ thường và số.
      </Typography.Text>

      <Input.Password
        placeholder='Nhập lại mật khẩu'
        className='ConfirmPassword'
        style={home.login.input}
        onChange={confirmPasswordHandle}
      />
      <Typography.Text
        type='danger'
        style={home.login.remindTextError}
        className='ConfirmPasswordLabel'
      >
        {confirmPassword !== password &&
        password.length > 0 &&
        confirmPassword.length > 0
          ? 'Mật khẩu không trùng khớp'
          : ''}
      </Typography.Text>
      <Button type='primary' style={home.login.button} onClick={register}>
        Đăng Kí
      </Button>
    </Modal>
  );
}

export default RegisterModal;
