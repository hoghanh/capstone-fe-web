import React, { useState, useEffect } from 'react';
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
  Empty,
  Badge,
} from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { ReactSVG } from 'react-svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import useAuthActions from 'recoil/action';
import { categoriesNavbarState, authState, otp } from 'recoil/atom';
import { GoogleLogout } from 'react-google-login';
import socket, { CLIENTID } from 'config';
import {
  Company,
  Heart,
  Job,
  Logout,
  Manage,
  User,
} from 'components/icon/Icon';
import { Link } from 'react-router-dom';
import { ModalPrimary } from 'components/Modal/Modal';
import { post, put, get } from 'utils/APICaller';
import OTPModal from './OTPModal';

const onSuccess = () => {};

const onFail = () => {};

const Search = () => {
  const { useBreakpoint } = Grid;
  const { md, lg, sm } = useBreakpoint();
  const [results, setResults] = useState([]);
  const auth = useRecoilValue(authState);

  const onSearch = (value) => {
    post({
      endpoint: `/accounts/`,
      body: {
        searchInput: value,
      },
    })
      .then((res) => {
        const data = res.data.searchList;
        setResults(data);
      })
      .catch((error) => {
        console.error({
          message: error.response.data.message,
        });
      });
  };

  const items = results.length
    ? results?.map((result, index) => ({
        label: (
          <Link
            to={
              result.tag === 'freelancer'
                ? `/profile/${result.id}`
                : result.tag === 'client'
                ? `/profile-client/${result.id}`
                : `/jobs/job-detail/${result.id}`
            }
            state={{
              clientId: result.tag === 'client' ? result.referId : null,
            }}
          >
            <Typography.Text
              style={{
                display: 'flex',
                alignItems: 'center',
                textWrap: 'nowrap',
              }}
            >
              {result.tag === 'freelancer' ? (
                <span style={{ paddingRight: 10 }}>
                  <User />
                </span>
              ) : result.tag === 'client' ? (
                <span style={{ paddingRight: 10 }}>
                  <Company />
                </span>
              ) : (
                <span style={{ paddingRight: 10 }}>
                  <Job />
                </span>
              )}
              {result.name || result.title}{' '}
              {result.id === auth.id ? '(Bạn)' : ''}
            </Typography.Text>
          </Link>
        ),
        key: index,
      }))
    : [{ label: <Empty description={<span>Dữ liệu trống</span>} />, key: '1' }];

  return (
    <Dropdown
      overlayStyle={{
        maxHeight: 300,
        overflow: 'auto',
        boxShadow: '2px 6px 4px 0px rgba(0, 0, 0, 0.25)',
        borderRadius: 10,
        border: '1px solid #ccc',
        width: lg ? 700 : md ? 700 : sm ? 500 : 300,
        overflowX: 'hidden',
      }}
      menu={{
        items,
      }}
      trigger={['click']}
      placement='bottom'
    >
      <Input.Search
        placeholder='Tìm kiếm'
        onSearch={onSearch}
        style={{
          padding: 10,
          borderRadius: 8,
          width: lg ? 477 : md ? 325 : sm ? 250 : 150,
        }}
      />
    </Dropdown>
  );
};

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

  const [notifications, setNotifications] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [count, setCount] = useState(0);

  const items = [
    {
      key: '1',
      label: (
        <Link to='/applications'>
          <Typography.Text style={{ marginLeft: 10 }}>
            Quản lý công việc
          </Typography.Text>
        </Link>
      ),
      icon: <Manage size={14} color='#222222' />,
    },
    {
      key: '2',
      label: (
        <Link to={`/profile/${auth.id}`}>
          <Typography.Text style={{ marginLeft: 10 }}>
            Trang cá nhân
          </Typography.Text>
        </Link>
      ),
      icon: <User size={14} color='#222222' />,
    },
    {
      key: '4',
      label: (
        <Link to='/favorite'>
          <Typography.Text style={{ marginLeft: 10 }}>
            Danh sách yêu thích
          </Typography.Text>
        </Link>
      ),
      icon: <Heart size={14} />,
    },
    {
      key: '3',
      label: (
        <GoogleLogout
          clientId={CLIENTID}
          onLogoutSuccess={onSuccess}
          onFailure={onFail}
          render={(renderProps) => (
            <Typography.Text
              onClick={renderProps.onClick}
              style={{ marginLeft: 10 }}
            >
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
      setOpenOTP(false);
    } else if (type === 'login') {
      setOpenLogin(true);
      setOpenRegister(false);
      setOpenOTP(false);
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

  const validateForm = () => {
    if (email.trim() === '') {
      notification.error({ message: 'Vui lòng nhập email.' });
      return false;
    }

    return true;
  };

  const sendMailForgotPassword = () => {
    if (!validateForm()) {
      return;
    }
    
    post({
      endpoint: `/accounts/forgot_password`,
      body: {
        email: email,
      },
    })
      .then((res) => {
        setOTP(res.data.otp);
        closeForgotPasswordModal();
        setOTPVisible(true);
      })
      .catch((err) => {
        console.log(err);
        notification.error({ message: err.response.data.message });
      });
  };

  const validatePasswordFormat = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateEmailFormat = (email) => {
    if (email.length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        setEmail(email);
        setError(null);
      } else {
        setError('Email không hợp lệ');
      }
    } else {
      setError(null);
    }
  };

  useEffect(() => {
    changeNotification();
  }, []);

  useEffect(() => {
    if (auth) {
      socket?.emit('newUser', auth.id);
      socket.on('getNotification', (data) => {
        notification.info({
          message:
            data.notification.name + ': ' + data.notification.description,
        });
        changeNotification();
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [auth, socket]);

  const handleMenuClick = ({ key }) => {
    put({ endpoint: `/notification/${key}` })
      .then((res) => {
        changeNotification();
      })
      .catch((err) => {});
  };

  const changeNotification = () => {
    get({ endpoint: `/notification/account/${auth.id}` })
      .then((res) => {
        const arr = res.data.notifications.map((item) => ({
          key: item.id.toString(),
          label: (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography.Text
                style={{
                  textWrap: 'wrap',
                }}
              >
                {item.status === 'unread' ? (
                  <Badge
                    status='processing'
                    style={{ marginRight: '8px', fontSize: '20px' }}
                  />
                ) : (
                  ''
                )}
                {item.description}
              </Typography.Text>
            </div>
          ),
        }));

        if (arr.length > 0) {
          setNotifications(arr);
          setCount(res.data.unreadNotifications);
        } else {
          setNotifications([
            {
              id: 'no-data',
              label: (
                <Empty description={<span>Không có thông báo nào</span>} />
              ),
            },
          ]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleMenuVisibility = () => {
    changeNotification();
    setMenuVisible(!menuVisible);
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
        open={forgotPasswordVisible}
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
        open={OTPVisible}
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
        align='middle'
        justify='space-between'
        style={{
          maxWidth: 1080,
          margin: '0 auto',
        }}
      >
        <Col xs={3} sm={3} md={3} lg={1} xl={0}>
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
        <Col xs={3} sm={3} md={1} lg={1} xl={1}>
          <Link to={auth.role === 'freelancer' ? '/home' : '/'}>
            <Image
              width={34}
              src='/icon/logo.svg'
              alt='Apofoitisi logo'
              preview={false}
            />
          </Link>
        </Col>
        <Col xs={0} sm={0} md={3} lg={3} xl={3}>
          <Link to={auth.role === 'freelancer' ? '/home' : '/'}>
            <Typography.Title level={3} style={{ margin: 0 }}>
              SEP
            </Typography.Title>
          </Link>
        </Col>

        <Col
          xs={12}
          sm={12}
          md={10}
          lg={13}
          xl={14}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Search />
        </Col>

        {auth.email ? (
          <>
            <Col xs={3} sm={3} md={3} lg={3} xl={3} style={{ display: 'flex' }}>
              <Badge count={count}>
                <ReactSVG
                  onClick={toggleMenuVisibility}
                  src='/icon/notification.svg'
                  beforeInjection={(svg) => {
                    svg.setAttribute('width', '35');
                    svg.setAttribute('height', '35');
                  }}
                />
                {menuVisible && (
                  <Menu
                    className='notification'
                    items={notifications}
                    onClick={handleMenuClick}
                    style={{
                      backgroundColor: '#ffffff',
                      position: 'absolute',
                      top: 48,
                      width: 350,
                      right: 10,
                      zIndex: 1,
                      border: '1px solid #f5f5f5',
                      borderRadius: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                      background: '#F7F8F9',
                      boxShadow:
                        'rgba(0, 0, 0, 0.03) 4px 5px 6px 4px, rgba(0, 0, 0, 0.02) 4px 5px 10px 3px, rgba(0, 0, 0, 0.02) 4px 6px 8px 4px',
                    }}
                  ></Menu>
                )}
              </Badge>
            </Col>
            <Col xs={3} sm={3} md={3} lg={3} xl={3}>
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
            <Col xs={6} sm={6} md={3} lg={3} xl={3}>
              <Button onClick={showModalLogin}>Đăng nhập</Button>
            </Col>
          </>
        )}
      </Row>
    </Layout.Header>
  );
}

export default SearchBar;
