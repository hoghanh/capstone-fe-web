import React from 'react';
import { Form, InputNumber, Radio, Row, Col, Image, notification } from 'antd';
import { ModalPrimary } from 'components/Modal/Modal';
import { post } from 'utils/APICaller';

function ModalTopup({ visible, onCancel, id }) {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (values.paymentMethod === 'vnpay') {
          post({
            endpoint: `/payment/vnpay`,
            body: {
              amount: values.amount,
              bankCode: '',
              language: 'vn',
              clientId: id,
            },
          })
            .then((res) => {
              window.location.href = res.data.vnpUrl;
            })
            .catch((error) => {
              notification.error({
                message: error.response.data.message,
              });
            });
        } else {
          post({
            endpoint: `/payment/momo`,
            body: {
              amount: values.amount,
            },
          })
            .then((res) => {
              window.location.href = res.data.body.payUrl;
            })
            .catch((error) => {
              notification.error({
                message: error.response.data.message,
              });
            });
        }
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
          <Form.Item
            name='paymentMethod'
            initialValue='vnpay'
            label='Chọn phương thức thanh toán'
            rules={[
              {
                required: true,
                message: 'Chọn phương thức thanh toán!',
              },
            ]}
          >
            <Radio.Group style={{ width: '100%', marginLeft: 10 }}>
              <Row>
                <Col span={12}>
                  <Radio value='vnpay'>
                    <Image
                      src='https://vnpay.vn/assets/images/logo-icon/logo-primary.svg'
                      preview={false}
                      width={134}
                      height={40}
                      alt='VNPAY'
                    />
                  </Radio>
                </Col>
                <Col span={12}>
                  <Radio value='momo'>
                    <Image
                      src='/icon/momo_square_pinkbg.svg'
                      preview={false}
                      width={40}
                      height={40}
                      alt='Momo'
                    />
                  </Radio>
                </Col>
              </Row>
            </Radio.Group>
          </Form.Item>
        </Form>
      </ModalPrimary>
    </>
  );
}

export default ModalTopup;
