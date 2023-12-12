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
import { useNavigate } from 'react-router-dom';
import joblist from 'styles/joblist';
import { get, post } from 'utils/APICaller';
import locale from 'antd/es/date-picker/locale/vi_VN';
import 'dayjs/locale/vi';
import { useRecoilValue } from 'recoil';
import { authState, clientProfile } from 'recoil/atom';
import dayjs from 'dayjs';
import ModalTopup from 'pages/billing/ModalTopup';
import LocalStorageUtils from 'utils/LocalStorageUtils';
import socket from 'config';

const PostJob = () => {
  const { useBreakpoint } = Grid;
  const { md } = useBreakpoint();
  const [remainingCharacters, setRemainingCharacters] = useState(5000);
  const [progresspercent, setProgresspercent] = useState(0);
  const [category, setCategory] = useState([]);
  const [skills, setSkills] = useState([]);
  const [basic, setBasic] = useState([]);
  const [intermediate, setIntermediate] = useState([]);
  const [high, setHigh] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalRefund, setOpenModalRefund] = useState(false);
  const [fee, setFee] = useState();

  const user = useRecoilValue(clientProfile);
  const auth = useRecoilValue(authState);

  useEffect(() => {
    if (user) {
      getCategory();
      getSkill();
    }

    get({ endpoint: `/systemValue/fee` })
      .then((res) => {
        setFee(Number(res.data[1].value));
      })
      .catch((err) => {
        setFee(0);
        console.log(err);
      });
  }, [user]);

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const normFile = (e) => {
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

  let list = [];
  if (basic) {
    for (const skill of basic) {
      list.push({ name: skill, level: 'Cơ bản' });
    }
  }
  if (intermediate) {
    for (const skill of intermediate) {
      list.push({ name: skill, level: 'Trung cấp' });
    }
  }
  if (high) {
    for (const skill of high) {
      list.push({ name: skill, level: 'Thông thạo' });
    }
  }

  let array = [...basic, ...intermediate, ...high];

  const filteredOptions = skills.filter((o) => !array.includes(o.value));

  const handleUpload = (event) => {
    const file = event.files[0].originFileObj;

    if (!file) return;

    const storageRef = ref(storage, `jobs/client-${user.id}/${file.name}`);
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
          createNewJob(event, downloadURL);
        });
      }
    );
  };

  const onFinish = (values) => {
    if (
      values.files !== undefined &&
      values.files !== null &&
      values.files !== ''
    ) {
      if (values.files.length > 0) {
        handleUpload(values);
      } else {
        createNewJob(values);
      }
    } else {
      createNewJob(values);
    }
  };

  function createNewJob(values, url) {
    let description = values.description.replace(/\n/g, '<br />');
    LocalStorageUtils.setItem('jobPost', {
      title: values.title,
      description: description,
      fileAttachment: url,
      applicationSubmitDeadline: dayjs(values.deadline).endOf('day'),
      lowestIncome: values.paymentRange.from,
      highestIncome: values.paymentRange.to,
      clientId: user.id,
      status: 'open',
      subCategory: values.category,
      skill: list,
    });

    post({
      endpoint: `/job`,
      body: {
        title: values.title,
        description: description,
        fileAttachment: url,
        applicationSubmitDeadline: dayjs(values.deadline).endOf('day'),
        lowestIncome: values.paymentRange.from,
        highestIncome: values.paymentRange.to,
        clientId: user.id,
        status: 'open',
        subCategory: values.category,
        skill: list,
      },
    })
      .then((res) => {
        notification.success({
          message: 'Đăng bài viết mới thành công',
        });

        const notificationData = {
          notificationName: 'Thay đổi số dư',
          notificationDescription: `Tính phí bài viết ${values.title} -  ${fee} `,
          context: 'payment',
        };

        //Gửi notification [thông tin] - đến [accountID người nhận]
        socket.emit('sendNotification', notificationData, auth.id);

        LocalStorageUtils.removeItem('jobPost');
        navigate(`/client/jobs-management`);
      })
      .catch((err) => {
        const errMess = err.response.data.message;
        notification.error({ message: errMess });
        if (errMess === 'Không thể đăng bài do không đủ số dư') {
          showModal(true);
        }
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

  const showModal = (id) => {
    setOpenModal(true);
  };
  const handleOkModal = () => {
    setTimeout(() => {
      setOpenModal(false);
    }, 3000);
  };
  const handleCancelModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Layout.Content
        className='post-job'
        style={{ maxWidth: 1080, margin: '0 auto' }}
      >
        <ModalTopup
          visible={openModal}
          onCancel={handleCancelModal}
          onOk={handleOkModal}
          id={user.id}
        />
        <Card
          bodyStyle={{ padding: 'unset' }}
          style={joblist.card}
          className='card-jobs'
          headStyle={{ paddingLeft: 0 }}
          title={
            <div className='trackingJobs'>
              <Typography.Title level={md ? 3 : 5} style={{ paddingLeft: 30 }}>
                Đăng bài
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
                accept='.pdf'
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
                options={category}
              ></Select>
            </Form.Item>
            <Form.Item
              name='highSkills'
              label={
                <Typography.Title level={4}>
                  Kĩ năng thông thạo
                </Typography.Title>
              }
            >
              <Select
                mode='tags'
                size='large'
                placeholder='Nhập hoặc chọn kĩ năng'
                style={{ width: '100%' }}
                options={filteredOptions}
                value={high}
                onChange={setHigh}
                tokenSeparators={[',']}
              />
            </Form.Item>
            <Form.Item
              name='intermediateSkills'
              label={
                <Typography.Title level={4}>Kĩ năng trung cấp</Typography.Title>
              }
            >
              <Select
                mode='tags'
                size='large'
                placeholder='Nhập hoặc chọn kĩ năng'
                style={{ width: '100%' }}
                options={filteredOptions}
                value={intermediate}
                onChange={setIntermediate}
                tokenSeparators={[',']}
              />
            </Form.Item>
            <Form.Item
              name='basicSkills'
              label={
                <Typography.Title level={4}>Kĩ năng cơ bản</Typography.Title>
              }
              extra='Nhập tối đa 5 danh mục mô tả đúng nhất dự án của bạn. Freelancer sẽ sử dụng những kỹ năng này để tìm ra những dự án mà họ quan tâm và có kinh nghiệm nhất.'
            >
              <Select
                mode='tags'
                size='large'
                placeholder='Nhập hoặc chọn kĩ năng'
                style={{ width: '100%' }}
                options={filteredOptions}
                value={basic}
                onChange={setBasic}
                tokenSeparators={[',']}
              />
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
                  step={10000}
                />
              </Form.Item>
              <Form.Item
                name={['paymentRange', 'to']}
                label='Đến: '
                dependencies={['paymentRange', 'from']}
                rules={[
                  {
                    required: true,
                    message: (
                      <div>
                        <WarningFilled /> Bắt buộc
                      </div>
                    ),
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const fromValue = getFieldValue(['paymentRange', 'from']);
                      if (!fromValue || !value) {
                        return Promise.resolve();
                      }
                      if (value >= fromValue) {
                        return Promise.resolve();
                      }
                      return Promise.reject('Đến phải lớn hơn hoặc bằng Từ');
                    },
                  }),
                ]}
              >
                <InputNumber
                  placeholder='000, 000'
                  addonAfter='VNĐ'
                  min={0}
                  formatter={(value) =>
                    ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  step={10000}
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
                timezone='UTC'
                size='large'
                format='YYYY-MM-DD'
                placeholder='Chọn ngày giờ'
                locale={locale}
                showNow={false}
                disabledDate={(current) => {
                  return current && current.isBefore(dayjs().endOf('day'));
                }}
              />
            </Form.Item>
            <Form.Item style={{ textAlign: 'right' }}>
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

export default PostJob;
