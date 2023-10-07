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
import { storage } from 'config/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import joblist from 'styles/joblist';
import { get, put, remove } from 'utils/APICaller';
import LocalStorageUtils from 'utils/LocalStorageUtils';

const EditJob = () => {
  const { useBreakpoint } = Grid;
  const { md } = useBreakpoint();
  const [remainingCharacters, setRemainingCharacters] = useState(5000);
  const [progresspercent, setProgresspercent] = useState(0);
  const clientId = LocalStorageUtils.getItem('profile').id;
  const [category, setCategory] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    getCategory();
    getSkill();
  }, []);

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

  const handleTextAreaChange = (e) => {
    const textAreaValue = e.target.value;
    const charCount = textAreaValue.length;
    const remainingChars = 5000 - charCount;

    form.setFieldsValue({ description: textAreaValue });
    setRemainingCharacters(remainingChars);
  };

  const handleUpload = (event) => {
    const file = event.files[0].originFileObj;

    if (!file) return;

    const storageRef = ref(storage, `jobs/client-${clientId}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateJob(event, downloadURL);
        });
      }
    );
  };

  const onFinish = (values) => {
    console.log(values);
    if (values.files.length > 0) {
      handleUpload(values);
    } else {
      updateJob(values);
    }
  };

  function updateJob(values, url) {
    put({
      endpoint: `/job/create`,
      body: {
        title: values.title,
        description: values.description,
        fileAttachment: url,
        proposalSubmitDeadline: values.deadline,
        lowestIncome: values.paymentRange.from,
        highestIncome: values.paymentRange.to,
        clientId: clientId,
        status: true,
        subCategory: values.category,
        skill: values.skills,
      },
    })
      .then((res) => {
        notification.success({
          message: 'Đăng bài viết mới thành công',
        });
        navigate(`/client/jobs-management`);
      })
      .catch((err) => {
        notification.error({
          message: 'Có lỗi xảy ra',
        });
      });
  }

  function getCategory() {
    get({
      endpoint: `/subCategory/`,
    })
      .then((res) => {
        setCategory(
          res.data.map((item) => ({
            label: item.name,
            value: item.name,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getSkill() {
    get({
      endpoint: `/skill/`,
    })
      .then((res) => {
        setSkills(
          res.data.map((item) => ({
            label: item.name,
            value: item.name,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function removeItem() {
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
            <Form.Item
              name='files'
              valuePropName='fileList'
              getValueFromEvent={normFile}
            >
              <Upload.Dragger
                name='file-upload'
                maxCount={1}
                beforeUpload={() => false}
              >
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
                placeholder='Chọn phân loại'
                style={{ width: '100%' }}
                options={category.map((cate) => ({
                  label: cate.name,
                  value: cate.id,
                }))}
              ></Select>
            </Form.Item>
            <Form.Item
              name='skills'
              label={
                <Typography.Title level={4}>Kĩ năng cần thiết</Typography.Title>
              }
              extra='Nhập tối đa 5 danh mục mô tả đúng nhất dự án của bạn. Freelancer sẽ sử dụng những kỹ năng này để tìm ra những dự án mà họ quan tâm và có kinh nghiệm nhất.'
            >
              <Select
                mode='tags'
                size='large'
                placeholder='Nhập hoặc chọn kĩ năng'
                style={{ width: '100%' }}
                options={skills}
                tokenSeparators={[',']}
              ></Select>
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
                <InputNumber
                  placeholder='000,000'
                  addonAfter='VNĐ'
                  min={0}
                  formatter={(value) =>
                    ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                />
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
                <InputNumber
                  placeholder='000, 000'
                  addonAfter='VNĐ'
                  min={0}
                  formatter={(value) =>
                    ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                />
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
