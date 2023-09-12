import React from 'react';
import { Button, Typography, notification } from 'antd';
import { ReactSVG } from 'react-svg';
import color from 'styles/color';
import GoogleLogin from 'react-google-login';

import { useAuthActions } from 'recoil/auth';
import { CLIENTID } from 'config';
import { post } from 'utils/APICaller';

const GoogleLoginButton = () => {
  const { login } = useAuthActions();

  const onSuccess = (res) => {
    const allowedDomain = '@fpt.edu.vn';

    if (res.profileObj.email.endsWith(allowedDomain)) {
      post({
        endpoint: `/accounts/google/login`,
        body: {
          email: res.profileObj.email,
          image: res.profileObj.ImageUrl,
          name: res.profileObj.name,
          googleId: res.profileObj.googleId,
        },
      })
        .then((res) => {
          login(res.data.token);
          notification.success({ message: 'Đăng nhập thành công' });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      notification.error({
        message: 'Email của bạn không được phép đăng nhập',
      });
    }
  };

  const onFailure = (res) => {
    console.log('LOGIN FAIL! ', res);
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
