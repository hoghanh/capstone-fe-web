import React from "react";
import {
  List,
  Row,
  Col,
  Layout,
  Grid,
  Collapse,
  Image,
  Typography,
} from "antd";
import {
  FacebookFilled,
  LinkedinFilled,
  InstagramFilled,
  TwitterSquareFilled,
} from "@ant-design/icons";
import theme from "../../styles/theme";
import { footer } from "../../styles/footer";

const Footer = () => {
  return (
    <Layout.Footer style={footer}>
      <Row gutter={[32, 10]} style={footer.firstrow}>
        <Col span={6}>
          <Typography.Text style={footer.text}>Về Chúng Tôi</Typography.Text>
        </Col>
        <Col span={6}>
          <Typography.Text style={footer.text}>Hỗ Trợ</Typography.Text>
        </Col>
        <Col span={6}>
          <Typography.Text style={footer.text}>
            Chính Sách Cookie
          </Typography.Text>
        </Col>
        <Col span={6}>
          <Typography.Text style={footer.text}>
            Điều Khoản Dịch Vụ
          </Typography.Text>
        </Col>
        <Col span={6}>
          <Typography.Text style={footer.text}>Phản Hồi</Typography.Text>
        </Col>
        <Col span={6}>
          <Typography.Text style={footer.text}>
            Chính Sách Bảo Mật
          </Typography.Text>
        </Col>
        <Col span={6}>
          <Typography.Text style={footer.text}>Cài Đặt Cookie</Typography.Text>
        </Col>
      </Row>
      <Row style={footer.secondrow}>
        <Typography.Title level={3} style={{ margin: 0 }}>
          <Image
            width={34}
            src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
            alt='Apofoitisi logo'
            preview={false}
          />{" "}
          FPT-SEP
        </Typography.Title>
        <div>
          <FacebookFilled style={{ fontSize: 25 }} />
          <LinkedinFilled style={{ fontSize: "30px" }} />
          <InstagramFilled style={{ fontSize: "30px" }} />
          <TwitterSquareFilled style={{ fontSize: "30px" }} />
        </div>
      </Row>
    </Layout.Footer>
  );
};

export default Footer;
