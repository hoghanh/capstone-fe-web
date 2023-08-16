import React, { useState } from 'react';
import { Modal, Typography, Input, Button, Checkbox } from 'antd';
import { home } from '../../styles/homepage';
import GoogleLoginButton from '../../components/button/GoogleLoginButton';
import Link from 'antd/es/typography/Link';

function LoginModal({ visible, onCancel, onOk, handleMove }) {
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onOk();
    }, 3000);
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
      <Input placeholder='Email' style={home.login.input} />
      <Input.Password placeholder='Mật khẩu' style={home.login.input} />
      <div style={home.login.contain}>
        <Checkbox>Nhớ tài khoản</Checkbox>
        <Typography>
          <Link>
            <b>Quên Mật Khẩu</b>
          </Link>
        </Typography>
      </div>
      <Button type='primary' style={home.login.button}>
        Đăng Nhập
      </Button>
    </Modal>
  );
}

export default LoginModal;
