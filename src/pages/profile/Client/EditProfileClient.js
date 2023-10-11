import { InboxOutlined, PaperClipOutlined, WarningFilled } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Collapse,
  DatePicker,
  Form,
  Grid,
  Input,
  InputNumber,
  Layout,
  Row,
  Select,
  Typography,
  Upload,
  notification,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { ButtonPrimary } from "components/customize/GlobalCustomize";
import { CustomCard } from "components/customize/Layout";
import Loading from "components/loading/loading";
import { storage } from "config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import color from "styles/color";
import joblist from "styles/joblist";
import { get, put, remove } from "utils/APICaller";
import LocalStorageUtils from "utils/LocalStorageUtils";


const { Dragger } = Upload;




const BasicInformation = () => {
  const [form] = Form.useForm();

  const [, setProgresspercent] = useState(0);

  const uploadFile = (event) => {
    const file = event.dragger[0].originFileObj;

    if (!file) return;

    const storageRef = ref(storage, `proposals/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
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
          // createProposal(event, downloadURL);
        });
      }
    );
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const props = {
    name: "files",
    maxCount: 1,
    beforeUpload: () => false,
  };
  return (
    <>
      <Row gutter={[10, 10]} style={{ padding: 5 }}>
        <Col span={24}>
          <Typography.Title level={4}>Tên doanh nghiệp</Typography.Title>
          <Input
            style={{ width: "100%" }}
            placeholder="Thí dụ: Công ty TNHH Foody"
            controls={false}
          />
        </Col>
        <Col span={24}>
          <Typography.Title level={4}>Ảnh đại diện</Typography.Title>
          <Row>
            <Col span={6}>
              <Avatar
                shape="square"
                size={200}
                src={
                  "https://i.9mobi.vn/cf/images/ba/2018/4/16/anh-avatar-dep-10.jpg"
                }
              />
            </Col>
            <Col span={18}>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <PaperClipOutlined />
                </p>
                <p className="ant-upload-text">
                  Kéo và thả bất kỳ hình ảnh bạn muốn
                </p>
                <p className="ant-upload-hint">
                  (Kích thước tệp tối đa: 25 MB)
                </p>
              </Dragger>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Typography.Title level={4}>Giới thiệu</Typography.Title>
          <TextArea
            className="introText"
            showCount
            allowClear={true}
            minLength={100}
            maxLength={1000}
            style={{
              minHeight: 120,
              resize: "none",
            }}
            placeholder="textarea"
          />
        </Col>
        <Col span={24}>
          <Row gutter={20}>
            <Col span={12}>
              <Typography.Title level={4}>Email</Typography.Title>
              <Input placeholder="VD: Foody.com.vn" />
            </Col>
            <Col span={12}>
              <Typography.Title level={4}>Số điện thoại</Typography.Title>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống ô này!",
                  },
                  {
                    pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                    message: "Số điện thoại không hợp lệ!",
                  },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Ex: 0123456789"
                  controls={false}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Typography.Title level={4}>Email</Typography.Title>
          <Input placeholder="VD: Lầu G, Tòa nhà Jabes 1, số 244 đường Cống Quỳnh, Phường Phạm Ngũ Lão, Quận 1, Thành phố Hồ Chí Minh, Việt Nam" />
        </Col>
        <Col span={24}>
          <Row gutter={20}>
            <Col span={12}>
              <Typography.Title level={4}>Website</Typography.Title>
              <Input placeholder="VD: Foody.com.vn" />
            </Col>
            <Col span={12}>
              <Typography.Title level={4}>Mã số thuế</Typography.Title>
              <InputNumber
                style={{ width: "100%" }}
                placeholder="VD: 0123456789"
                controls={false}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
            <ButtonPrimary
              style={{ marginRight: 10 }}
              $primary
              htmlType="reset"
            >
              Hủy
            </ButtonPrimary>
            <ButtonPrimary htmlType="submit">Lưu</ButtonPrimary>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

const ChangePassword = () => {
  const [form] = Form.useForm();

  return (
    <>
      <Row gutter={[10, 10]} style={{ padding: 5 }}>
        <Col span={24}>
          <Typography.Title level={4}>Mật khẩu hiện tại</Typography.Title>
          <Input
            style={{ width: "100%" }}
            placeholder="Mật khẩu dài hơn 8 ký tự, ít nhất 1 chữ cái in hoa và 1 chứ cái thường"
            controls={false}
          />
        </Col>
        <Col span={24}>
          <Typography.Title level={4}>Mật khẩu mới</Typography.Title>
          <Input
            style={{ width: "100%" }}
            placeholder="Mật khẩu dài hơn 8 ký tự, ít nhất 1 chữ cái in hoa và 1 chứ cái thường"
            controls={false}
          />
        </Col>
        <Col span={24}>
          <Typography.Title level={4}>Xác nhận lại mật khẩu</Typography.Title>
          <Input
            style={{ width: "100%" }}
            placeholder="Giống với mật khẩu mới"
            controls={false}
          />
        </Col>
        <Col span={24}>
          <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
            <ButtonPrimary
              style={{ marginRight: 10 }}
              $primary
              htmlType="reset"
            >
              Hủy
            </ButtonPrimary>
            <ButtonPrimary htmlType="submit">Lưu</ButtonPrimary>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

const getItems = (panelStyle) => [
  {
    key: "1",
    label: <Typography.Title level={3} style={{margin: 0}}>Thông tin cơ bản</Typography.Title>,
    children: <BasicInformation />,
    style: panelStyle,
  },
  {
    key: "2",
    label: <Typography.Title level={3} style={{margin: 0}}>Đổi mật khẩu</Typography.Title>,
    children: <ChangePassword />,
    style: panelStyle,
  },
];

const EditProfileClient = () => {
  const { useBreakpoint } = Grid;
  const { md } = useBreakpoint();
  const [isLoading, setIsLoading] = useState(false);
  const onChange = (key) => {
    console.log(key);
  };
  useEffect(() => {}, []);

  const panelStyle = {
    marginBottom: 24,
    background: color.colorWhite,
    borderRadius: 20,
    border: "none",
    boxShadow: "2px 6px 4px 0px rgba(0, 0, 0, 0.25)",
  };
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Layout.Content style={{ maxWidth: 1080, margin: "0 auto" }}>
        <Collapse
          items={getItems(panelStyle)}
          defaultActiveKey={["1"]}
          onChange={onChange}
          expandIconPosition={"end"}
          size="large"
          style={{
            border: "none",
            background: "#f7f8f9",
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
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: 10,
              }}
            >
              <ButtonPrimary
                style={{
                  marginRight: 10,
                  backgroundColor: color.colorInfo,
                }}
                $primary
                htmlType="reset"
              >
                Vô hiệu hóa
              </ButtonPrimary>
              <ButtonPrimary
                style={{
                  color: color.colorWhite,
                  backgroundColor: color.colorWarning,
                }}
                htmlType="submit"
              >
                Xóa tài khoản
              </ButtonPrimary>
            </div>
          </div>
        </CustomCard>
      </Layout.Content>
    </>
  );
};

export default EditProfileClient;
