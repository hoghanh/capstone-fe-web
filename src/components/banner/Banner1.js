import React from "react";
import { Row, Col, Typography, Button, Grid, Layout } from "antd";

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
        <Typography.Title style={{ color: "#013042", textAlign: "center" }}>
          Tìm freelancer cho
          <br />
          dự án của bạn
        </Typography.Title>
        <Button
          style={{
            borderRadius: 25,
            border: "1px solid #013042",
            color: "#013042",
            marginRight: 10,
            background: "none",
          }}
        >
          Tìm hiểu ngay
        </Button>
      </Row>
    );
  }
  return (
    <Layout.Content
      style={{
        backgroundColor: "#89DBE9",
      }}
    >
      <Row
        style={{
          height: 350,
          padding: 30,
          maxWidth: 1400,
          margin: "0 auto",
        }}
        align="middle"
      >
        <Col span={10} offset={2}>
          <Typography.Title style={{ color: "#013042" }}>
            Tìm freelancer cho
            <br />
            dự án của bạn
          </Typography.Title>
          <Row
            justify="space-between"
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <Typography.Text
              strong
              style={{ margin: 0, paddingRight: 10, color: "#013042" }}
            >
              Phổ biến:
            </Typography.Text>

            <Button
              style={{
                borderRadius: 25,
                border: "1px solid #013042",
                color: "#013042",
                marginRight: 10,
                background: "none",
              }}
            >
              Thiết kế web
            </Button>

            <Button
              style={{
                borderRadius: 25,
                border: "1px solid #013042",
                color: "#013042",
                marginRight: 10,
                background: "none",
              }}
            >
              WordPress
            </Button>
            <Button
              style={{
                borderRadius: 25,
                border: "1px solid #013042",
                color: "#013042",
                background: "none",
              }}
            >
              Thiết kế logo
            </Button>
          </Row>
        </Col>
        <Col
          span={12}
          style={{
            backgroundImage: "url('img/Successful-Freelancer.png')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%",
          }}
        ></Col>
      </Row>
    </Layout.Content>
  );
};

export default Banner1;
