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
import Loading from 'components/loading/loading';
import { storage } from 'config/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import joblist from 'styles/joblist';
import { get, put, remove } from 'utils/APICaller';
import locale from 'antd/es/date-picker/locale/vi_VN';
import 'dayjs/locale/vi';
import { useRecoilValue } from 'recoil';
import { authState, clientProfile } from 'recoil/atom';
import dayjs from 'dayjs';



const EditJob = () => {
  const { useBreakpoint } = Grid;
  const { md } = useBreakpoint();
  const [remainingCharacters, setRemainingCharacters] = useState(5000);
  const [progresspercent, setProgresspercent] = useState(0);
  const [category, setCategory] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState('');
  const [initialValues, setInitialValues] = useState([]);
  const [props, setProps] = useState({
    defaultFileList: [],
  });

  const user = useRecoilValue(clientProfile);
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      getJob();
      getCategory();
      getSkill();
    }
  }, [user]);

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
          updateJob(event, downloadURL);
        });
      }
    );
  };

  const onFinish = (values) => {
    if (props.defaultFileList.length > 0) {
      if (
        values.files !== undefined &&
        values.files !== null &&
        values.files !== ''
      ) {
        if (values.files.length > 0) {
          handleUpload(values);
        } else {
          updateJob(values, '');
        }
      } else {
        updateJob(values, props.defaultFileList[0].url);
      }
    } else {
      if (
        values.files !== undefined &&
        values.files !== null &&
        values.files !== ''
      ) {
        if (values.files.length > 0) {
          handleUpload(values);
        } else {
          updateJob(values, '');
        }
      } else {
        updateJob(values, '');
      }
    }
  };

  function updateJob(values, url) {
    put({
      endpoint: `/job/detail/${id}`,
      body: {
        title: values.title,
        description: values.description,
        fileAttachment: url,
        applicationSubmitDeadline: values.deadline,
        lowestIncome: values.paymentRange.from,
        highestIncome: values.paymentRange.to,
        clientId: user.id,
        status: 'open',
        subCategory: values.category,
        skill: values.skills,
      },
    })
      .then((res) => {
        notification.success({
          message: 'Cập nhật bài viết thành công',
        });
        navigate(`/client/jobs-management`);
      })
      .catch((err) => {
        notification.error({
          message: 'Có lỗi xảy ra',
        });
      });
  }

  function getJob() {
    setIsLoading(true);
    get({
      endpoint: `/job/detail/${id}`,
    })
      .then((res) => {
        if (
          res.data.fileAttachment !== null &&
          res.data.fileAttachment !== undefined &&
          res.data.fileAttachment !== ''
        ) {
          let url = new URL(res.data.fileAttachment);
          const encodedFilename = url.pathname.split('/').pop();

          const fileName = decodeURIComponent(encodedFilename).split('/').pop();
          setProps({
            defaultFileList: [
              {
                uid: '-1',
                name: fileName,
                status: 'done',
                url: url.href,
              },
            ],
          });
        }
        setRemainingCharacters(5000 - res.data.description.length);
        setInitialValues({
          title: res.data.title,
          description: res.data.description,
          category: res.data.subcategories.map((category) => ({
            label: category.name,
            value: category.name,
          })),
          skills: res.data.skills.map((skill) => ({
            label: skill.name,
            value: skill.name,
          })),
          paymentRange: {
            from: res.data.lowestIncome,
            to: res.data.highestIncome,
          },
          deadline: dayjs(res.data.applicationSubmitDeadline),
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
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

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Layout.Content
        className="edit-job"
        style={{ maxWidth: 1080, margin: '0 auto' }}
      >
        <Card
          bodyStyle={{ padding: 'unset' }}
          style={joblist.card}
          className="card-jobs"
          headStyle={{ paddingLeft: 0 }}
          title={
            <div className="trackingJobs">
              <Typography.Title level={md ? 3 : 5} style={{ paddingLeft: 30 }}>
                Chỉnh sửa bài viết
              </Typography.Title>
            </div>
          }
        >
          <Form
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ padding: '20px 30px' }}
            layout="vertical"
            initialValues={initialValues}
          >
            <Form.Item
              name="title"
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
                placeholder="Nhập tiêu đề cho dự án của bạn"
                bordered={false}
                style={{ borderBottom: '1px solid #000', borderRadius: 0 }}
              />
            </Form.Item>
            <Form.Item
              name="description"
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
                placeholder="Nhập thông tin chi tiết cho dự án của bạn"
                style={{ height: 100, border: '1px solid #000' }}
                onChange={handleTextAreaChange}
              />
            </Form.Item>
            <Form.Item
              name="files"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload.Dragger
                {...props}
                name="file-upload"
                accept='.pdf'
                maxCount={1}
                beforeUpload={() => false}
              >
                <p className="ant-upload-drag-icon">
                  <PaperClipOutlined />
                </p>
                <p className="ant-upload-text">
                  Kéo và thả bất kỳ hình ảnh hoặc tài liệu nào có thể hữu ích
                  trong việc giải thích tóm tắt của bạn tại đây
                </p>
                <p className="ant-upload-hint">
                  (Kích thước tệp tối đa: 25 MB)
                </p>
              </Upload.Dragger>
            </Form.Item>
            <Form.Item
              name="category"
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
              extra="Nhập tối đa 5 danh mục mô tả đúng nhất dự án của bạn. Freelancer sẽ sử dụng những phân loại này để tìm ra những dự án mà họ quan tâm và có kinh nghiệm nhất."
            >
              <Select
                mode="multiple"
                size="large"
                placeholder="Chọn phân loại"
                style={{ width: '100%' }}
                options={category}
              ></Select>
            </Form.Item>
            <Form.Item
              name="skills"
              label={
                <Typography.Title level={4}>Kĩ năng cần thiết</Typography.Title>
              }
              extra="Nhập tối đa 5 danh mục mô tả đúng nhất dự án của bạn. Freelancer sẽ sử dụng những kỹ năng này để tìm ra những dự án mà họ quan tâm và có kinh nghiệm nhất."
            >
              <Select
                mode="tags"
                size="large"
                placeholder="Nhập hoặc chọn kĩ năng"
                style={{ width: '100%' }}
                options={skills}
                tokenSeparators={[',']}
              ></Select>
            </Form.Item>
            <div style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
              <Typography.Title level={4}>Khoảng lương</Typography.Title>
              <Form.Item
                name={['paymentRange', 'from']}
                label="Từ: "
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
                  placeholder="000,000"
                  addonAfter="VNĐ"
                  min={0}
                  formatter={(value) =>
                    ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  step={10000}
                />
              </Form.Item>
              <Form.Item
                name={['paymentRange', 'to']}
                label="Đến: "
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
                  placeholder="000, 000"
                  addonAfter="VNĐ"
                  min={0}
                  formatter={(value) =>
                    ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                />
              </Form.Item>
            </div>
            <Form.Item
              name="deadline"
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
                timezone="UTC"
                showTime
                size="large"
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="Chọn ngày giờ"
                locale={locale}
                showNow={false}
                disabledDate={(current) => {
                  return (
                    current && current.isBefore(dayjs().endOf('day'))
                  );
                }}
              />
            </Form.Item>
            <Form.Item style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                size="large"
                danger
                style={{ marginRight: 10 }}
                onClick={(e) => removeItem()}
              >
                Xoá bài
              </Button>
              <Button type="primary" size="large" htmlType="submit">
                Cập nhật bài viết
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Layout.Content>
    </>
  );
};

export default EditJob;
