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
          console.log(res);
          notification.success({ message: res.data.message });
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
