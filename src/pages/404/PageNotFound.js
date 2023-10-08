import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { authState } from 'recoil/atom';
import { useRecoilValue } from 'recoil';
const PageNotFound = () => {
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();

  const handleMove = () => {
    if (auth.role === 'client') {
      navigate('/client');
    } else {
      navigate('/');
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Result
        status='404'
        title='404'
        subTitle='Chết rồi, không có trang này bạn ơi'
        extra={
          <Button type='primary' onClick={() => handleMove()}>
            Quay lại thôi
          </Button>
        }
      />
    </div>
  );
};
export default PageNotFound;
