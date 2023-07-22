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
              FPT-SEP
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
      <Row
        justify="center"
        align="middle"
        style={{ margin: "0 auto", maxWidth: 1400 }}
      >
        <Col span={1}>
          <Image
            width={50}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            alt="Apofoitisi logo"
            style={{ marginBottom: 10 }}
            preview={false}
          />
        </Col>
        <Col span={3} style={{ display: "flex", justifyContent: "center" }}>
          <Typography.Title level={3} style={{ margin: 0 }}>
            FPT-SEP
          </Typography.Title>
        </Col>
        <Col span={13}>
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            style={{ padding: 10 }}
          />
        </Col>
        <Col span={3} style={{ display: "flex", justifyContent: "center" }}>
          <Typography.Title level={3} style={{ margin: 0 }}>
            Khám phá
          </Typography.Title>
        </Col>
        <Col span={2}>
          <Button>Đăng kí</Button>
        </Col>
        <Col span={2}>
          <Button>Đăng nhập</Button>
        </Col>
      </Row>
    </Layout.Header>
  );
}

export default SearchBar;
