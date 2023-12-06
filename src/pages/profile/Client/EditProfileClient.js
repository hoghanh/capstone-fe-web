import { PlusOutlined } from '@ant-design/icons';
import {
  Col,
  Collapse,
  Form,
  Input,
  InputNumber,
  Layout,
  Row,
  Typography,
  Upload,
  notification,
  Avatar,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ModalAlert, ModalPrimary } from 'components/Modal/Modal';
import { ButtonPrimary } from 'components/customize/GlobalCustomize';
import { CustomCard } from 'components/customize/Layout';
import Loading from 'components/loading/loading';
import { storage } from 'config/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import useAuthActions from 'recoil/action';
import { clientProfile } from 'recoil/atom';
import color from 'styles/color';
import { put, remove } from 'utils/APICaller';

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const BasicInformation = () => {
  const [form] = Form.useForm();
  const [informationUser, setInformationUser] = useRecoilState(clientProfile);
  const [progresspercent, setProgresspercent] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [avatar, setAvatar] = useState([]);
  const navigate = useNavigate();

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };

  const uploadFile = (event) => {
    const file = event.image[0].originFileObj;

    if (!file) return;

    const storageRef = ref(storage, `images/avatars/${file.name}`);
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
          updateClientInfo(event, downloadURL);
        });
      }
    );
  };

  const updateClientInfo = (values, image) => {
    const {
      name,
      introduction,
      email,
      phone,
      address,
      companyWebsite,
      taxCode,
    } = values;
    put({
      endpoint: `/client/profile/${informationUser.accountId}`,
      body: {
        taxCode,
        companyWebsite,
        introduction,
        account: {
          name,
          phone,
          email,
          address,
          image,
        },
      },
    })
      .then((res) => {
        setInformationUser({
          ...informationUser,
          taxCode,
          companyWebsite,
          introduction,
          accounts: {
            ...informationUser.accounts,
            name,
            phone,
            email,
            address,
            image,
          },
        });
        notification.success({
          message: 'Cập nhật thành công!',
        });
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  };

  const handleChange = ({ avatar: newAvatar }) => setAvatar(newAvatar);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
         if (
          values.image !== undefined &&
          values.image !== null &&
          values.image !== ''
        ) {
          if (values.image.length > 0) {
            uploadFile(values);
          } else {
            updateClientInfo(values);
          }
        } else {
          updateClientInfo(values, informationUser?.accounts.image);
        }
        navigate(`/client/profile`)
      })
      .catch(error => {
        console.error('Validation failed:', error);
      });
  };

  const props = {
    listType: 'picture-card',
    fileList: {avatar},
    accept: '.png, .jpg, .jpeg',
    maxCount: 1,
    beforeUpload: () => false,
    onRemove: () => false,
    showUploadList: {
      showRemoveIcon: false,
    },
    onPreview: handlePreview,
    onChange: handleChange,
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Tải ảnh lên
      </div>
    </div>
  );

  const handleCancel = () => setPreviewOpen(false);

  return (
    <>
      <Form
        form={form}
        name="editProfile"
        initialValues={{
          remember: true,
          introduction: informationUser?.introduction
            ? informationUser.introduction
            : 'Chưa có thông tin',
          name: informationUser?.accounts?.name
            ? informationUser.accounts.name
            : 'Chưa có thông tin',
          email: informationUser?.accounts?.email
            ? informationUser.accounts.email
            : 'Chưa có thông tin',
          phone: informationUser?.accounts?.phone
            ? informationUser.accounts.phone
            : 'Chưa có thông tin',
          address: informationUser?.accounts?.address
            ? informationUser.accounts.address
            : 'Chưa có thông tin',
          companyWebsite: informationUser?.companyWebsite
            ? informationUser.companyWebsite
            : 'Chưa có thông tin',
          taxCode: informationUser?.taxCode
            ? informationUser.taxCode
            : 'Chưa có thông tin',
        }}
      >
        <Row gutter={[10, 10]} style={{ padding: 5 }}>
          <Col span={24}>
            <Typography.Title level={4}>Tên doanh nghiệp</Typography.Title>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Không được để trống ô này!',
                },
              ]}
            >
              <Input
                style={{ width: '100%' }}
                placeholder="VD: Công ty TNHH Foody"
                controls={false}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Typography.Title level={4}>Ảnh đại diện</Typography.Title>
            <Row>
              <Avatar
                size={100}
                style={{ border: '1px solid #ccc' }}
                shape="square"
                alt='logo'
                src={informationUser?.accounts?.image}
              />
              <Form.Item
                style={{ paddingLeft: 10 }}
                name="image"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload {...props}>{uploadButton}</Upload>
              </Form.Item>
              <ModalPrimary
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{
                    width: '100%',
                  }}
                  src={previewImage}
                />
              </ModalPrimary>
            </Row>
          </Col>
          <Col span={24}>
            <Typography.Title level={4}>Giới thiệu</Typography.Title>
            <Form.Item
              name={'introduction'}
              rules={[
                {
                  required: true,
                  message: 'Không được để trống ô này!',
                },
                {
                  min: 10,
                  message: 'Giá trị phải lớn hơn hoặc bằng 10',
                },
              ]}
            >
              <TextArea
                className="introText"
                showCount
                allowClear={true}
                minLength={100}
                maxLength={1000}
                rows={5}
                placeholder="textarea"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row gutter={20}>
              <Col span={12}>
                <Typography.Title level={4}>Email</Typography.Title>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Không được để trống ô này!',
                    },
                  ]}
                >
                  <Input placeholder="VD: foody@gmail.com" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Typography.Title level={4}>Số điện thoại</Typography.Title>
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: 'Không được để trống ô này!',
                    },
                    {
                      pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                      message: 'Số điện thoại không hợp lệ!',
                    },
                  ]}
                >
                  <Input
                    style={{ width: '100%' }}
                    placeholder="Ex: 0123456789"
                    controls={false}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Typography.Title level={4}>Địa chỉ</Typography.Title>
            <Form.Item
              name={'address'}
              rules={[
                {
                  required: true,
                  message: 'Không được để trống ô này!',
                },
              ]}
            >
              <Input placeholder="VD: Lầu G, Tòa nhà Jabes 1, số 244 đường Cống Quỳnh, Phường Phạm Ngũ Lão, Quận 1, Thành phố Hồ Chí Minh, Việt Nam" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row gutter={20}>
              <Col span={12}>
                <Typography.Title level={4}>Website</Typography.Title>
                <Form.Item
                  name={'companyWebsite'}
                  rules={[
                    {
                      required: true,
                      message: 'Không được để trống ô này!',
                    },
                  ]}
                >
                  <Input placeholder="VD: Foody.com.vn" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Typography.Title level={4}>Mã số thuế</Typography.Title>
                <Form.Item
                  name={'taxCode'}
                  rules={[
                    {
                      required: true,
                      message: 'Không được để trống ô này!',
                    },
                  ]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    placeholder="VD: 0123456789"
                    controls={false}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <ButtonPrimary
                style={{ marginRight: 10 }}
                $primary
                htmlType="reset"
              >
                Hủy
              </ButtonPrimary>
              <ButtonPrimary onClick={handleOk} htmlType="submit">
                Lưu
              </ButtonPrimary>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

const RemoveAlert = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const user = useRecoilValue(clientProfile);
  const { logout } = useAuthActions();


  const removeItem = () => {
    remove({ endpoint: `/accounts/profile/${user.id}` })
      .then(res => {
        notification.success({
          message: 'Tài khoản đã bị xóa',
        });
        logout();
        navigate('/')
      })
      .catch(error => {
        notification.error({
          message: 'Có lỗi xảy ra trong quá trình xoá',
        });
      });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    removeItem();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <ButtonPrimary
        onClick={showModal}
        style={{
          color: color.colorWhite,
          backgroundColor: color.colorWarning,
        }}
        htmlType="submit"
      >
        Xóa tài khoản
      </ButtonPrimary>
      <ModalAlert
        title={'Thông báo'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Typography.Text>Bạn chắc chắn muốn xóa chưa?</Typography.Text>
      </ModalAlert>
    </>
  );
};

const ChangePassword = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const informationUser = useRecoilValue(clientProfile);

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        changePassword(values);
      })
      .catch(error => {
        console.error('Validation failed:', error);
      });
  };

  const changePassword = values => {
    const { password, confirmPassword } = values;
    put({
      endpoint: `/accounts/password/${informationUser.accountId}`,
      body: {
        oldPassword: password,
        newPassword: confirmPassword,
      },
    })
      .then(res => {
        notification.success({
          message: 'Đổi mật khẩu thành công!',
        });
        navigate(-1);
      })
      .catch(error => {
        console.log(error.response.data.message);

        if (error.response.status === 403) {
          notification.error({
            message: error.response.data.message,
          });
        } else {
          notification.error({
            message: 'Đổi mật khẩu thất bại!',
          });
        }
      });
  };

  return (
    <>
      <Form form={form} name="changePassword">
        <Row gutter={[10, 10]} style={{ padding: 5 }}>
          <Col span={24}>
            <Typography.Title level={4}>Mật khẩu hiện tại</Typography.Title>
            <Form.Item
              name={'password'}
              rules={[
                {
                  required: true,
                  message: 'Không được để trống ô này!',
                },
              ]}
            >
              <Input.Password
                style={{ width: '100%' }}
                type="password"
                placeholder="Mật khẩu dài hơn 8 ký tự, ít nhất 1 chữ cái in hoa và 1 chứ cái thường"
                controls={false}

              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Typography.Title level={4}>Mật khẩu mới</Typography.Title>
            <Form.Item
              name={'newPassword'}
              rules={[
                {
                  required: true,
                  message: 'Không được để trống ô này!',
                },
              ]}
            >
              <Input.Password
                style={{ width: '100%' }}
                type="password"
                placeholder="Mật khẩu dài hơn 8 ký tự, ít nhất 1 chữ cái in hoa và 1 chứ cái thường"
                controls={false}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Typography.Title level={4}>Xác nhận lại mật khẩu</Typography.Title>
            <Form.Item
              name={'confirmPassword'}
              dependencies={['newPassword']}
              rules={[
                {
                  required: true,
                  message: 'Không được để trống ô này!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu mới không khớp'));
                  },
                }),
              ]}
            >
              <Input.Password
                style={{ width: '100%' }}
                type="password"
                placeholder="Giống với mật khẩu mới"
                controls={false}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <ButtonPrimary
                style={{ marginRight: 10 }}
                $primary
                htmlType="reset"
              >
                Hủy
              </ButtonPrimary>
              <ButtonPrimary htmlType="submit" onClick={handleOk}>
                Lưu
              </ButtonPrimary>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

const getItems = panelStyle => [
  {
    key: '1',
    label: (
      <Typography.Title level={3} style={{ margin: 0 }}>
        Thông tin cơ bản
      </Typography.Title>
    ),
    children: <BasicInformation />,
    style: panelStyle,
  },
  {
    key: '2',
    label: (
      <Typography.Title level={3} style={{ margin: 0 }}>
        Đổi mật khẩu
      </Typography.Title>
    ),
    children: <ChangePassword />,
    style: panelStyle,
  },
];

const EditProfileClient = () => {
  const [isLoading, setIsLoading] = useState(false);

  const panelStyle = {
    marginBottom: 24,
    background: color.colorWhite,
    borderRadius: 20,
    border: 'none',
    boxShadow: '2px 6px 4px 0px rgba(0, 0, 0, 0.25)',
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Layout.Content style={{ maxWidth: 1080, margin: '0 auto' }}>
        <Collapse
          items={getItems(panelStyle)}
          defaultActiveKey={['1']}
          expandIconPosition={'end'}
          size="large"
          style={{
            border: 'none',
            background: '#f7f8f9',
            borderRadius: 20,
          }}
        />
        <CustomCard style={{ padding: 16 }}>
          <Typography.Title level={3} style={{ margin: 0, paddingBottom: 20 }}>
            Xóa Tài Khoản
          </Typography.Title>
          <div style={{ padding: 8 }}>
            <Typography.Text>
              Một khi bạn xóa tài khoản của mình, bạn sẽ không thể quay lại. Xin
              hãy cân nhắc kỹ.
            </Typography.Text>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                paddingTop: 10,
              }}
            >
              <RemoveAlert />
            </div>
          </div>
        </CustomCard>
      </Layout.Content>
    </>
  );
};

export default EditProfileClient;
