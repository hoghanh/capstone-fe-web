import React, { useEffect, useState } from 'react';
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
  notification,
} from 'antd';
import { SearchOutlined, MenuOutlined } from '@ant-design/icons';
import { ReactSVG } from 'react-svg';
import { useRecoilState, useRecoilValue } from 'recoil';

import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import useAuthActions from 'recoil/action';
import { categoriesNavbarState, authState, otp } from 'recoil/atom';
import { GoogleLogout } from 'react-google-login';
import { CLIENTID } from 'config';
import { Heart, Logout, Manage, User } from 'components/icon/Icon';
import { Link } from 'react-router-dom';
import { ModalPrimary } from 'components/Modal/Modal';
import { post } from 'utils/APICaller';
import OTPModal from './OTPModal';

const onSuccess = () => {
  console.log('Logout success');
};

const onFail = () => {
  console.log('Fail');
};


function SearchBar() {

const Search =() =>{
  const { useBreakpoint } = Grid;
  const { md, lg } = useBreakpoint();
  const [results, setResults] = useState([]);


  const onSearch = (value) => {
    post({
      endpoint: `/accounts/`,
      body: {
        searchInput: value,
      },
    })
      .then((res) => {
        const data = res.data.searchList;
        const jobs = data
          .filter((item) => item.title)
          .map((job) => ({
            ...job,
            icon: <Manage />,
          }));
        const accounts = data
          .filter((item) => item.name)
          .map((account) => ({
            ...account,
            icon: <User />,
          }));
        const items = [...accounts, ...jobs];
        setResults(items);
      })
      .catch((error) => {
        console.error({
          message: error.response.data.message,
        });
      });
  };

  const items = results.length
    ? results.map((result, index) => ({
        label: (
          <Link
            to={
              result.name
                ? `/profile/${result.id}`
                : `/jobs/job-detail/${result.id}`
            }
          >
            <Typography.Text style={{ padding: 10 }}>
              {result.name || result.title}
            </Typography.Text>
          </Link>
        ),
        key: index,
        icon: result.icon,
      }))
    : [{ label: <Empty />, key: '1' }]

  return (
    <Dropdown
      overlayStyle={{
        maxHeight: '300px',
        overflow: 'auto',
        boxShadow: '2px 6px 4px 0px rgba(0, 0, 0, 0.25)',
        borderRadius: 10,
        border: '1px solid #ccc',
      }}
      menu={{
        items,
      }}
      trigger={['click']}
    >
      <Input.Search
        placeholder="Tìm kiếm"
        onSearch={onSearch}
        style={{
          padding: 10,
          borderRadius: 8,
          width: lg ? 477 : md ? 325 : 250,
        }}
      />
    </Dropdown>
  );
}

function SearchBar() {
  const categoriesNavbar = useRecoilValue(categoriesNavbarState);
  const auth = useRecoilValue(authState);
  const { logout } = useAuthActions();

  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [OTPVisible, setOTPVisible] = useState(false);
  const [openOTP, setOpenOTP] = useState(false);

  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [OTP, setOTP] = useRecoilState(otp);
  const [OTPInput, setOTPInput] = useState('');
  const [password, setPassword] = useState('');
  const [rePassWord, setRePassword] = useState('');

  const items = [
    {
      key: '1',
      label: <Link to='/applications'><Typography.Text style={{marginLeft: 10}}>Quản lý công việc</Typography.Text></Link>,
      icon: <Manage size={14} color='#222222'/>,
  
    },
    {
      key: '2',
      label: <Link to={`/profile/${auth.id}`}><Typography.Text style={{marginLeft: 10}}>Trang cá nhân</Typography.Text></Link>,
      icon: <User size={14} color='#222222'/>,
    },
    {
      key: '4',
      label: <Link to='/favorite'><Typography.Text style={{marginLeft: 10}}>Danh sách yêu thích</Typography.Text></Link>,
      icon: <Heart size={14}/>
    },
    {
      key: '3',
      label: (
        <GoogleLogout
          clientId={CLIENTID}
          onLogoutSuccess={onSuccess}
          onFailure={onFail}
          render={(renderProps) => (
            <Typography.Text onClick={renderProps.onClick} style={{marginLeft: 10}}>
              Đăng xuất
            </Typography.Text>
          )}
        ></GoogleLogout>
      ),
      icon: <Logout size={14} />,
    },
  ];
 

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

  const handleOkOTPModal = () => {
    setOpenOTP(false);
  };
  const handleCancelOTPModal = () => {
    setOpenOTP(false);
  };

  const handleMove = (type) => {
    if (type === 'register') {
      setOpenRegister(true);
      setOpenLogin(false);
    } else if (type === 'login') {
      setOpenLogin(true);
      setOpenRegister(false);
    } else {
      setOpenLogin(false);
      setOpenRegister(false);
      setOpenOTP(true);
    }
  };

  const onClick = ({ key }) => {
    if (key === '3') {
      logout();
    }
  };

  const openForgotPasswordModal = () => {
    setForgotPasswordVisible(true);
    setOpenLogin(false);
  };

  const closeForgotPasswordModal = () => {
    setForgotPasswordVisible(false);
  };

  const checkOTP = () => {
    if (OTPInput === OTP) {
      if (password !== rePassWord) {
        setError('Mật khẩu không trùng khớp');
      } else if (!validatePasswordFormat(password)) {
        setError(
          'Mật khẩu phải bao gồm 8 ký tự, kết hợp chữ hoa và chữ thường và số.'
        );
      } else {
        post({
          endpoint: `/accounts/reset_password`,
          body: {
            email: email,
            password: password,
          },
        })
          .then((res) => {
            closeOTPModal();
            notification.success({ message: 'Đổi mật khẩu thành công' });
          })
          .catch((err) => {
            notification.err({
              message: 'Có lỗi xảy ra, vui lòng thử lại sau',
            });
            console.log(err);
          });
      }
    } else {
      setError('OTP không hợp lệ');
    }
  };

  const closeOTPModal = () => {
    setOTPVisible(false);
    setError('');
    setOTP('');
  };

  const sendMailForgotPassword = () => {
    post({
      endpoint: `/accounts/forgot_password`,
      body: {
        email: email,
      },
    })
      .then((res) => {
        setOTP(res.data.otp);
      })
      .catch((err) => {
        console.log(err);
      });

    closeForgotPasswordModal();
    setOTPVisible(true);
  };

  const validatePasswordFormat = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setEmail(email);
      setError(null);
    } else {
      setError('Email không hợp lệ');
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
        openForgotPasswordModal={openForgotPasswordModal}
      />

      <OTPModal
        visible={openOTP}
        onCancel={handleCancelOTPModal}
        onOk={handleOkOTPModal}
        handleMove={handleMove}
      />

      {/* Handle forgot password */}
      <ModalPrimary
        title={'Quên mật khẩu'}
        visible={forgotPasswordVisible}
        onOk={sendMailForgotPassword}
        onCancel={closeForgotPasswordModal}
        okText='Gửi'
      >
        <Typography.Title level={5}>
          Vui lòng nhập email để xác thực
        </Typography.Title>
        <Input
          className='header-search'
          placeholder='abc@gmail.com'
          onChange={(e) => validateEmailFormat(e.target.value)}
        />
        <Typography.Text type='danger'>{error}</Typography.Text>
      </ModalPrimary>

      <ModalPrimary
        title={'Nhập OTP của bạn'}
        visible={OTPVisible}
        onOk={checkOTP}
        onCancel={closeOTPModal}
        okText='Gửi'
      >
        <Input
          type='number'
          className='otp'
          placeholder='123456'
          onChange={(e) => setOTPInput(e.target.value)}
        />
        <Typography.Title level={5}>Nhập mật khẩu mới</Typography.Title>
        <div style={{ display: 'flex', gap: 10 }}>
          <Input
            type='password'
            className='password'
            placeholder='Nhập mật khẩu mới'
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type='password'
            className='re-password'
            placeholder='Nhập lại mật khẩu mới'
            onChange={(e) => setRePassword(e.target.value)}
          />
        </div>
        <Typography.Text type='danger'>{error}</Typography.Text>
      </ModalPrimary>

      <Row
        align="middle"
        justify="space-between"
        style={{
          maxWidth: 1080,
          margin: '0 auto',
        }}
      >
        <Col xs={6} sm={2} md={2} lg={1} xl={0}>
          <div>
            <MenuOutlined onClick={toggleCollapsed} />
            <Menu
              mode="inline"
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
          <Link to="/">
            <Image
              width={34}
              src="/icon/logo.svg"
              alt="Apofoitisi logo"
              preview={false}
            />
          </Link>
        </Col>
        <Col xs={5} sm={3} md={2} lg={2} xl={4}>
          <Link to="/">
            <Typography.Title level={3} style={{ margin: 0 }}>
              SEP
            </Typography.Title>
          </Link>
        </Col>

        <Col xs={0} sm={12} md={11} lg={13} xl={13}>
          <Search />
        </Col>

        {auth.email ? (
          <>
            <Col xs={0} sm={0} md={3} lg={3} xl={3}>
              <ReactSVG
                style={{ height: 40 }}
                src="/icon/notification.svg"
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
                    src="/icon/user.svg"
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
