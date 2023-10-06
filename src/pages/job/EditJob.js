import { PaperClipOutlined, WarningFilled } from '@ant-design/icons';
import {
  Button,
  Card,
  DatePicker,
  Form,
  Grid,
  Input,
  InputNumber,
  Layout,
  Select,
  Typography,
  Upload,
  notification,
} from 'antd';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import joblist from 'styles/joblist';
import { remove } from 'utils/APICaller';

const EditJob = () => {
  const { useBreakpoint } = Grid;
  const { sm, md, lg, xl } = useBreakpoint();
  const [remainingCharacters, setRemainingCharacters] = useState(5000);

  const { id } = useParams();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const onFinish = (values) => {
    console.log(values);
  };

  const handleTextAreaChange = (e) => {
    const textAreaValue = e.target.value;
    const charCount = textAreaValue.length;
    const remainingChars = 5000 - charCount;

    form.setFieldsValue({ description: textAreaValue });
    setRemainingCharacters(remainingChars);
  };

  function removeItem() {
    console.log(id);
    remove({ endpoint: `/job/detail/${id}` })
      .then((res) => {
        notification.success({
          message: 'Xoá bài viết thành công',
        });
        navigate('/client/jobs-management');
      })
      .catch((error) => {
        notification.error({
          message: 'Có lỗi xảy ra trong quá trình xoá',
        });
      });
  }

  return (
    <>
      <Layout.Content style={{ maxWidth: 1080, margin: '0 auto' }}>
        <Card
          bodyStyle={{ padding: 'unset' }}
          style={joblist.card}
          className='card-jobs'
          headStyle={{ paddingLeft: 0 }}
          title={
            <div className='trackingJobs'>
              <Typography.Title level={md ? 3 : 5} style={{ paddingLeft: 30 }}>
                Chỉnh sửa bài viết
              </Typography.Title>
            </div>
          }
        >
          <Form
            form={form}
            name='control-hooks'
            onFinish={onFinish}
            style={{ padding: '20px 30px' }}
            layout='vertical'
          >
            <Form.Item
              name='title'
              label={<Typography.Title level={4}>Tiêu đề</Typography.Title>}
              rules={[
                {
                  required: true,
                  message: (
                    <div>
                      <WarningFilled /> Vui lòng nhập tiêu đề
                    </div>
                  ),
                },
              ]}
            >
              <Input
                placeholder='Nhập tiêu đề cho dự án của bạn'
                bordered={false}
                style={{ borderBottom: '1px solid #000', borderRadius: 0 }}
              />
            </Form.Item>
            <Form.Item
              name='description'
              label={
                <Typography.Title level={4}>Chi tiết dự án</Typography.Title>
              }
              rules={[
                {
                  required: true,
                  message: (
                    <div>
                      <WarningFilled /> Vui lòng nhập thông tin
                    </div>
                  ),
                },
              ]}
              extra={
                <Typography style={{ textAlign: 'right' }}>
                  {remainingCharacters} kí tự còn lại
                </Typography>
              }
            >
              <Input.TextArea
                placeholder='Nhập thông tin chi tiết cho dự án của bạn'
                style={{ height: 100, border: '1px solid #000' }}
                onChange={handleTextAreaChange}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item
                name='dragger'
                valuePropName='fileList'
                getValueFromEvent={normFile}
                noStyle
              >
                <Upload.Dragger name='files' action='/upload.do'>
                  <p className='ant-upload-drag-icon'>
                    <PaperClipOutlined />
                  </p>
                  <p className='ant-upload-text'>
                    Kéo và thả bất kỳ hình ảnh hoặc tài liệu nào có thể hữu ích
                    trong việc giải thích tóm tắt của bạn tại đây
                  </p>
                  <p className='ant-upload-hint'>
                    (Kích thước tệp tối đa: 25 MB)
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
            <Form.Item
              name='category'
              label={
                <Typography.Title level={4}>Phân loại dự án</Typography.Title>
              }
              rules={[
                {
                  required: true,
                  message: (
                    <div>
                      <WarningFilled /> Bắt buộc
                    </div>
                  ),
                },
              ]}
              extra='Nhập tối đa 5 danh mục mô tả đúng nhất dự án của bạn. Freelancer sẽ sử dụng những phân loại này để tìm ra những dự án mà họ quan tâm và có kinh nghiệm nhất.'
            >
              <Select
                mode='multiple'
                size='large'
                placeholder='Nhập hoặc chọn phân loại'
                style={{ width: '100%' }}
              >
                <Select.Option value='tag1'>Tag 1</Select.Option>
                <Select.Option value='tag2'>Tag 2</Select.Option>
                <Select.Option value='tag3'>Tag 3</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name='skills'
              label={
                <Typography.Title level={4}>Kĩ năng cần thiết</Typography.Title>
              }
              extra='Nhập tối đa 5 danh mục mô tả đúng nhất dự án của bạn. Freelancer sẽ sử dụng những kỹ năng này để tìm ra những dự án mà họ quan tâm và có kinh nghiệm nhất.'
            >
              <Select
                mode='multiple'
                size='large'
                placeholder='Nhập hoặc chọn kĩ năng'
                style={{ width: '100%' }}
              >
                <Select.Option value='tag1'>Tag 1</Select.Option>
                <Select.Option value='tag2'>Tag 2</Select.Option>
                <Select.Option value='tag3'>Tag 3</Select.Option>
              </Select>
            </Form.Item>
            <div style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
              <Typography.Title level={4}>Khoảng lương</Typography.Title>
              <Form.Item
                name={['paymentRange', 'from']}
                label='Từ: '
                rules={[
                  {
                    required: true,
                    message: (
                      <div>
                        <WarningFilled /> Bắt buộc
                      </div>
                    ),
                  },
                ]}
              >
                <InputNumber placeholder='000' addonAfter='VNĐ' />
              </Form.Item>
              <Form.Item
                name={['paymentRange', 'to']}
                label='Đến: '
                rules={[
                  {
                    required: true,
                    message: (
                      <div>
                        <WarningFilled /> Bắt buộc
                      </div>
                    ),
                  },
                ]}
              >
                <InputNumber placeholder='000' addonAfter='VNĐ' />
              </Form.Item>
            </div>
            <Form.Item
              name='deadline'
              label={
                <Typography.Title level={4}>Ngày hết hạn</Typography.Title>
              }
              rules={[
                {
                  required: true,
                  message: (
                    <div>
                      <WarningFilled /> Bắt buộc
                    </div>
                  ),
                },
              ]}
            >
              <DatePicker
                showTime
                size='large'
                format='YYYY-MM-DD HH:mm:ss'
                placeholder='Chọn ngày giờ'
              />
            </Form.Item>
            <Form.Item style={{ textAlign: 'right' }}>
              <Button
                type='primary'
                size='large'
                danger
                style={{ marginRight: 10 }}
                onClick={(e) => removeItem()}
              >
                Xoá bài
              </Button>
              <Button type='primary' size='large' htmlType='submit'>
                Đăng bài tuyển dụng
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Layout.Content>
    </>
  );
};

export default EditJob;
