import React from 'react';
import { notification } from 'antd';
import { ModalPrimary } from 'components/Modal/Modal';
import { post } from 'utils/APICaller';

function ModalAlert({ visible, onCancel, id }) {

  const handleOk = () => {

    post({ endpoint: `/payment/refund/${id}` })
      .then((res) => {
        window.location.reload();
        notification.success({
          message: res.data.message,
        });
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  }


  return (
    <>
      <ModalPrimary
        title={'Nhập số tiền nạp'}
        open={visible}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleOk}
        onCancel={onCancel}
        okText='Rút hết'
      >
        Bạn có muốn rút toàn bộ số dư?
      </ModalPrimary>
    </>
  );
}

export default ModalAlert;
