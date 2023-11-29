import React, { useState } from 'react';
import { Typography, Input } from 'antd';
import { notification } from 'antd';
import { useRecoilValue } from 'recoil';
import { registerInfo } from 'recoil/atom';
import { post } from 'utils/APICaller';
import { ModalPrimary } from 'components/Modal/Modal';

function OTPModal({ visible, onCancel, onOk, handleMove }) {
  const [OTPInput, setOTPInput] = useState('');
  const [error, setError] = useState(null);
  const registerInformation = useRecoilValue(registerInfo);

  const handleOk = () => {
    onOk();
    checkOTP();
  };

  const checkOTP = () => {
    setError('');
    onCancel();
    if (registerInformation) {
      post({
        endpoint: `/accounts/register/confirm`,
        body: {
          email: registerInformation.email,
          otp: OTPInput,
        },
      })
        .then((res) => {
          notification.success({ message: 'Đăng ký thành công' });
        })
        .catch((error) => {
          notification.error({
            message: 'OTP quá hạn/ không hợp lệ',
          });
        });
    }
  };

  return (
    <ModalPrimary
      title={'Nhập OTP'}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText='Gửi'
    >
      <Typography.Text>
        Chúng tôi vừa gửi 1 OTP về email của bạn, vui lòng kiểm tra email và
        điền vào bên dưới!
      </Typography.Text>
      <Input
        type='number'
        className='otp'
        defaultValue=''
        placeholder='123456'
        onChange={(e) => setOTPInput(e.target.value)}
      />
      <Typography.Text type='danger'>{error}</Typography.Text>
    </ModalPrimary>
  );
}

export default OTPModal;
