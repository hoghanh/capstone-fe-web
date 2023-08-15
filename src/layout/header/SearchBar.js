import React, { useState } from 'react';
import {
  Input,
  Image,
  Typography,
  Button,
  Layout,
  Modal,
  Checkbox,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import GoogleLoginButton from '../../components/button/GoogleLoginButton';
import Link from 'antd/es/typography/Link';
import { home } from '../../styles/homepage';
import { ReactSVG } from 'react-svg';

function SearchBar() {
  const [loading, setLoading] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const [logined, setLogined] = useState(false);

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

  return (
    <Layout.Header style={{ background: '#F7F8F9' }}>
      {/* Modal Register */}
      <Modal
        width={450}
        open={openRegister}
        title={<div style={{ height: 45 }}></div>}
        onOk={handleOkRegister}
        onCancel={handleCancelRegister}
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
          8 characters or longer. Combine upper and lowercase letters and
          numbers.
        </Typography.Text>
        <Button type='primary' style={home.login.button}>
          Đăng Kí
        </Button>
      </Modal>

      {/* Modal login */}
      <Modal
        title={<div style={{ height: 45 }}></div>}
        width={450}
        open={openLogin}
        onOk={handleOkLogin}
        onCancel={handleCancelLogin}
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
          style={{ padding: 10, borderRadius: 8, width: 477 }}
        />
        <Typography.Title level={3} style={{ margin: 0 }}>
          Khám phá
        </Typography.Title>
        {logined ? (
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
