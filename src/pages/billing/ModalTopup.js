import React from 'react';
import { Form, InputNumber } from 'antd';
import { ModalPrimary } from 'components/Modal/Modal';
import { post } from 'utils/APICaller';

function ModalTopup({ visible, onCancel, id }) {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        post({
          endpoint: `/payment/vnpay`,
          body: {
            amount: values.amount,
            bankCode: '',
            language: 'vn',
            clientId: id,
          },
        }).then((res) => {
          window.location.href = res.data.vnpUrl;
        });
      })
      .catch((error) => {
        console.error('Validation failed:', error);
      });
  };

  const validateAmount = (rule, value) => {
    if (value && value < 10000) {
      return Promise.reject('Số tiền tối thiểu là 10000');
    }
    return Promise.resolve();
  };

  return (
    <>
      <ModalPrimary
        title={'Nhập số tiền nạp'}
        open={visible}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleOk}
        onCancel={onCancel}
      >
        <Form form={form} name='inputMoney'>
          <Form.Item
            name='amount'
            rules={[
              {
                required: true,
                message: 'Không được để trống ô này!',
              },
              {
                validator: validateAmount,
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }} placeholder='10000' />
          </Form.Item>
        </Form>
      </ModalPrimary>
    </>
  );
}

export default ModalTopup;
