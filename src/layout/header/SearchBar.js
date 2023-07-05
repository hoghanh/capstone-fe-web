import React from "react";
import { Input, Image, Typography, Row, Col, Button, Layout, Grid } from "antd";
import { SearchOutlined } from "@ant-design/icons";
function SearchBar() {
  const { useBreakpoint } = Grid;
  const { xs } = useBreakpoint();

  if (xs) {
    // Hiển thị menu trên điện thoại
    return (
      <Layout.Header style={{ background: "#ffffff" }}>
        <Row justify="center" align="middle">
          <Col flex={1}>
            <Typography.Title level={4} style={{ margin: 0 }}>
              Apofoitisi
            </Typography.Title>
          </Col>

          <Col flex={1}>
            <Input
              placeholder="Search... "
              prefix={<SearchOutlined />}
              style={{ width: 150 }}
            />
          </Col>
        </Row>
      </Layout.Header>
    );
  }

  // Hiển thị giao diện trên màn hình lớn hơn điện thoại
  return (
    <Layout.Header style={{ background: "#ffffff" }}>
      <Row justify="center" align="middle">
        <Col flex={1} offset={2}>
          <Image
            width={50}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            alt="Apofoitisi logo"
            style={{ marginBottom: 10 }}
            preview={false}
          />
        </Col>
        <Col
          flex={3}
          style={{ display: "flex", justifyContent: "center" }}
          pull={1}
        >
          <Typography.Title level={3} style={{ margin: 0 }}>
            Apofoitisi
          </Typography.Title>
        </Col>
        <Col flex={8} pull={1}>
          <Input placeholder="Search..." prefix={<SearchOutlined />} />
        </Col>
        <Col
          flex={2}
          style={{ display: "flex", justifyContent: "center" }}
          pull={1}
        >
          <Typography.Title level={3} style={{ margin: 0 }}>
            Explore
          </Typography.Title>
        </Col>
        <Col flex={1} pull={1}>
          <Button>Register</Button>
        </Col>
        <Col flex={1} pull={1}>
          <Button>Login</Button>
        </Col>
      </Row>
    </Layout.Header>
  );
}

export default SearchBar;
