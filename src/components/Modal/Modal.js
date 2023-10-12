import React from 'react';
import { Modal } from 'antd';

const ModalPrimary = ({ children, ...rest }) => {
  return (
    <Modal
      className='modalPrimary'
      cancelText='Hủy bỏ'
      okText='Lưu'
      okType='primary'
      {...rest}
    >
      {children}
    </Modal>
  );
};

const ModalAlert = ({ children, ...rest}) => {
  return (
    <Modal className={'modalPrimary modalAlert'} cancelText={'Hủy bỏ'} okText={'Xóa'} {...rest} >
      {children}
    </Modal>
  );
};

export { ModalPrimary, ModalAlert };
