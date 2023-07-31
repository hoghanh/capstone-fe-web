import React from "react";
import { Row, Col, Typography, Button, Grid, Layout } from "antd";
import color from "../../styles/color";
import { home } from "../../styles/homepage";

const Banner1 = () => {
  const { useBreakpoint } = Grid;
  const { xs } = useBreakpoint();

  if (xs) {
    return (
      <Row
        style={{
          height: 250,
          padding: 10,
          background:
            "linear-gradient(to right, #70DBFF, #89DBE9, #CDF1FD, #EDF6FF, #CDF1FD, #89DBE9, #70DBFF)",
        }}
        align="middle"
        justify="center"
      >
        <Typography.Title
          style={{ color: color.colorBlueWhale, textAlign: "center" }}
        >
          Tìm freelancer cho
          <br />
          dự án của bạn
        </Typography.Title>
        <Button style={home.banner1.button}>Tìm hiểu ngay</Button>
      </Row>
    );
  }
  return (
    <Layout.Content
      style={{
        backgroundColor: color.colorBluishCyan,
      }}
    >
      <Row style={home.banner} align="middle">
        <Col span={12}>
          <Typography.Title
            style={{ color: color.colorBlueWhale, fontSize: 32 }}
          >
            Tìm freelancer cho
            <br />
            dự án của bạn
          </Typography.Title>
          <Row
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <Typography.Text strong style={home.banner1.subtitle}>
              Phổ biến:
            </Typography.Text>

            <Button style={home.banner1.button}>Thiết kế web</Button>

            <Button style={home.banner1.button}>WordPress</Button>
            <Button style={home.banner1.button}>Thiết kế logo</Button>
          </Row>
        </Col>
        <Col span={12} style={home.banner1.bannerImg}></Col>
      </Row>
    </Layout.Content>
  );
};

export default Banner1;
