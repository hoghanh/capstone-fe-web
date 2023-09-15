import React from "react";
import { Modal } from "antd";

const ModalPrimary = ({ children, ...rest}) => {
  return (
    <Modal className={'modalPrimary'} cancelText={'Hủy bỏ'} okText={'Lưu'} {...rest} >
      {children}
    </Modal>
  );
};

const ModalAlert = (Comp) => (props) => {
  return (
    <Modal
      {...props}
      onCancel={() => {
        alert('Modal đã đóng!');
      }}
    >
      <Comp {...props} />
    </Modal>
  );
};




export {ModalPrimary, ModalAlert};
