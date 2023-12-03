import React from 'react';
import { Row, Col, Layout, Image, Typography } from 'antd';
import {
  FacebookFilled,
  LinkedinFilled,
  InstagramFilled,
  TwitterSquareFilled,
} from '@ant-design/icons';
import { footer } from '../../styles/footer';

const Footer = () => {
  return (
    <Layout.Footer style={footer}>
      <Row style={footer.firstrow}>
        <Col md={6} sm={8} xs={12} >
          <Typography.Text style={footer.text}>Về Chúng Tôi</Typography.Text>
        </Col>
        <Col md={6} sm={8} xs={12} >
          <Typography.Text style={footer.text}>Hỗ Trợ</Typography.Text>
        </Col>
        <Col md={6} sm={8} xs={12} >
          <Typography.Text style={footer.text}>
            Chính Sách Cookie
          </Typography.Text>
        </Col>
        <Col md={6} sm={8} xs={12} >
          <Typography.Text style={footer.text}>
            Điều Khoản Dịch Vụ
          </Typography.Text>
        </Col>
        <Col md={6} sm={8} xs={12} >
          <Typography.Text style={footer.text}>Phản Hồi</Typography.Text>
        </Col>
        <Col md={6} sm={8} xs={12} >
          <Typography.Text style={footer.text}>
            Chính Sách Bảo Mật
          </Typography.Text>
        </Col>
        <Col md={6} sm={8} xs={12} >
          <Typography.Text style={footer.text}>Cài Đặt Cookie</Typography.Text>
        </Col>
      </Row>
      <Row style={footer.secondrow}>
        <Typography.Title level={3} style={footer.text}>
          <Image
            width={34}
            src='/icon/logo-white.svg'
            alt='Apofoitisi logo'
            preview={false}
          />
          {'  '}
          FPT - SEP
        </Typography.Title>
        <div style={footer.containIcon}>
          <FacebookFilled style={footer.icons} />
          <LinkedinFilled style={footer.icons} />
          <InstagramFilled style={footer.icons} />
          <TwitterSquareFilled style={footer.icons} />
        </div>
      </Row>
      <div style={footer.name}>
        <Typography.Text style={footer.name.text}>
          © 2023 FPT Student-Enterprise Connection Platform.
        </Typography.Text>
      </div>
    </Layout.Footer>
  );
};

export default Footer;
