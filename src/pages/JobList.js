import React from "react";
import Header from "../layout/header/Header";
import Footer from "../layout/footer/Footer";
import { Breadcrumb, Card, Layout, Select, Typography } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const JobList = () => {
  return (
    <>
      <Header />
      <Layout.Content style={{ maxWidth: 1400, margin: "0 auto" }}>
        <Breadcrumb
          items={[
            {
              href: "",
              title: <HomeOutlined />,
            },
            {
              href: "",
              title: (
                <>
                  <UserOutlined />
                  <span>Application List</span>
                </>
              ),
            },
            {
              title: "Application",
            },
          ]}
        />
        <Typography.Title level={3}>Logo Design</Typography.Title>
        <Card
          title={
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
              }}
            >
              <Typography.Title level={3}>Kết quả hàng đầu</Typography.Title>
              <Typography.Text
                style={{
                  color: "#000",
                  fontFamily: "Montserrat",
                  fontSize: 12,
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "normal",
                  paddingLeft: 10,
                }}
              >
                1-10 of 200 results
              </Typography.Text>
            </div>
          }
          extra={
            <div>
              <Typography.Text
                style={{
                  color: "#000",
                  fontFamily: "Montserrat",
                  fontSize: 14,
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "normal",
                  paddingRight: 14,
                }}
              >
                Sort By:
              </Typography.Text>
              <Select
                placeholder='Sort By'
                style={{
                  width: 120,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "jack",
                    label: "Jack",
                  },
                  {
                    value: "lucy",
                    label: "Lucy",
                  },
                  {
                    value: "Yiminghe",
                    label: "yiminghe",
                  },
                  {
                    value: "disabled",
                    label: "Disabled",
                    disabled: true,
                  },
                ]}
              />
            </div>
          }
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Layout.Content>
      <Footer />
    </>
  );
};

export default JobList;
