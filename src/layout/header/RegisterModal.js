import React, { useState } from 'react';
import { Modal, Typography, Input, Button } from 'antd';
import { home } from '../../styles/homepage';
import GoogleLoginButton from '../../components/button/GoogleLoginButton';
import Link from 'antd/es/typography/Link';

function RegisterModal({ visible, onCancel, onOk, handleMove }) {
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
      <Input placeholder='Email' style={home.login.input} />
      <Input.Password placeholder='Mật khẩu' style={home.login.input} />
      <Typography.Text style={home.login.remindText}>
        8 characters or longer. Combine upper and lowercase letters and numbers.
      </Typography.Text>
      <Button type='primary' style={home.login.button}>
        Đăng Kí
      </Button>
    </Modal>
  );
}

export default RegisterModal;
