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

const data = [
  {
    title: "Việc làm phổ biến nhất",
    items: [
      "Việc phổ biến nhất",
      "Việc làm web",
      "Việc lập trình di động",
      "Việc làm SEO",
      "Việc marketing online",
      "Việc dịch thuật",
      "Việc viết lách",
      "Việc thiết kế",
      "Việc quản lý fanpage",
    ],
  },
  {
    title: "Được thuê nhiều nhất",
    items: [
      "Freelancer Marketing online",
      "Freelancer Làm web",
      "Freelancer Mobile app",
      "Freelancer SEO",
      "Freelancer Thiết kế",
      "Freelancer thiết kế banner",
      "Freelancer Viết bài",
      "Freelancer Dịch thuật",
      "Freelancer nhập dữ liệu",
    ],
  },
  {
    title: "Hướng dẫn cho freelancer ",
    items: [
      "Hướng dẫn freelancer kiếm tiền",
      "Hướng dẫn hoàn thiện hồ ",
      "Hướng dẫn chào giá dự ",
      "Hướng dẫn nhận thanh toán",
      "Hướng dẫn xác thực tài kho",
      "Hướng dẫn liên hệ khách hàng",
      "Hướng dẫn mua credit",
    ],
  },
  {
    title: "Câu hỏi thường gặp",
    items: [
      "Cách thuê freelancer",
      "Hướng dẫn đăng việc",
      "Hướng dẫn xác thực email",
      "Hướng dẫn chọn freelancer",
      "Hướng dẫn quản lý dự án",
      "Hướng dẫn liên hệ freelancer",
    ],
  },
];

function Footer() {
  const { useBreakpoint } = Grid;
  const { xs } = useBreakpoint();
  if (xs) {
    return (
      <>
        <Collapse accordion>
          {data.map((list, index) => (
            <Collapse.Panel header={list.title} key={index}>
              <List
                dataSource={list.items}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Collapse.Panel>
          ))}
        </Collapse>
        <Row justify="space-between" style={{ borderTop: "1px solid #EDF6FF" }}>
          <Col
            span={12}
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <Image
              width={35}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              alt="Apofoitisi logo"
              style={{ marginTop: 10 }}
              preview={false}
            />
            <Typography.Title
              level={4}
              style={{ margin: 0, marginLeft: "10px" }}
            >
              Apofoitisi
            </Typography.Title>
          </Col>
          <Col span={12} style={{ textAlign: "right", marginTop: 10 }}>
            <FacebookFilled style={{ fontSize: "30px" }} />
            <LinkedinFilled style={{ fontSize: "30px", marginLeft: 10 }} />
            <InstagramFilled style={{ fontSize: "30px", marginLeft: 10 }} />
            <TwitterSquareFilled style={{ fontSize: "30px", marginLeft: 10 }} />
          </Col>
        </Row>
      </>
    );
  }

  return (
    <Layout.Footer style={{ background: "#013042", color: "#EDF6FF" }}>
      <Row>
        {data.map((list, index) => (
          <Col flex={1} key={index}>
            <h3 style={{ fontWeight: "bold" }}>{list.title}</h3>
            <List
              dataSource={list.items}
              renderItem={(item) => (
                <List.Item style={{ color: "#EDF6FF" }}>{item}</List.Item>
              )}
            />
          </Col>
        ))}
      </Row>
      <Row justify="space-between" style={{ borderTop: "1px solid #EDF6FF" }}>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          }}
        >
          <Image
            width={35}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            alt="Apofoitisi logo"
            style={{ marginTop: 10 }}
            preview={false}
          />
          <Typography.Title
            level={4}
            style={{ margin: 0, color: "#EDF6FF", marginLeft: "10px" }}
          >
            Apofoitisi
          </Typography.Title>
        </Col>
        <Col span={12} style={{ textAlign: "right", marginTop: 10 }}>
          <FacebookFilled style={{ fontSize: "30px" }} />
          <LinkedinFilled style={{ fontSize: "30px", marginLeft: 10 }} />
          <InstagramFilled style={{ fontSize: "30px", marginLeft: 10 }} />
          <TwitterSquareFilled style={{ fontSize: "30px", marginLeft: 10 }} />
        </Col>
      </Row>
    </Layout.Footer>
  );
}

export default Footer;
