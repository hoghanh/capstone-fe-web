import React from 'react';
import { Button, Typography, notification } from 'antd';
import { ReactSVG } from 'react-svg';
import GoogleLogin from 'react-google-login';
import { useLocation, useNavigate } from 'react-router-dom';

import { CLIENTID } from 'config';
import color from 'styles/color';
import { post } from 'utils/APICaller';
import useAuthActions from 'recoil/action';

const GoogleLoginButton = ({ onLogin }) => {
  const { login } = useAuthActions();
  const { pathname } = useLocation();
  const page = pathname.replace('/', '');
  const navigate = useNavigate();

  const onSuccess = (res) => {
    const allowedDomain = '@fpt.edu.vn';

    if (res.profileObj.email.endsWith(allowedDomain)) {
      requestLogin(res.profileObj);
      onLogin();
    } else {
      notification.error({
        message: 'Email của bạn không được phép đăng nhập',
      });
    }
  };

  function requestLogin(data) {
    post({
      endpoint: `/accounts/google/login`,
      body: {
        email: data.email,
        image: data.ImageUrl,
        name: data.name,
        googleId: data.googleId,
      },
    })
      .then((response) => {
        login(response.data.token);
        if (!page.startsWith('jobs/job-detail/')) {
          navigate('/home');
        }
        notification.success({ message: response.data.message });
      })
      .catch((err) => {
        console.log(err);
        notification.error({ message: err.response.data.message });
      });
  }

  const onFailure = (res) => {
    notification.error({
      message: 'Đăng nhập không thành công',
    });
  };

  return (
    <GoogleLogin
      clientId={CLIENTID}
      onFailure={onFailure}
      onSuccess={onSuccess}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
      className='google-login-button'
      render={(renderProps) => (
        <Button
          onClick={renderProps.onClick}
          type='default'
          style={{
            width: '100%',
            height: 50,
            display: 'flex',
            padding: 10,
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: 10,
            borderColor: color.colorBlueWhale,
          }}
        >
          <ReactSVG
            src='./icon/google.svg'
            beforeInjection={(svg) => {
              svg.setAttribute('width', '28');
              svg.setAttribute('height', '29');
            }}
          />
          <Typography.Title level={5} style={{ margin: 0 }}>
            Tiếp tục với Google
          </Typography.Title>
          <div></div>
        </Button>
      )}
    ></GoogleLogin>
  );
};

export default GoogleLoginButton;
