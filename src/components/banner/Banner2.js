import React from "react";
import { Row, Col, Typography, Button, Grid, List, Avatar } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const data = [
  {
    title: "Phù hợp ngân sách của bạn",
    des: "Tìm dịch vụ phù hợp với mọi mức giá. Không có giá theo giờ, chỉ có giá dựa trên dự án.",
  },
  {
    title: "Công việc được hoàn thành với chất lượng tốt",
    des: "Bàn giao dự án của bạn cho freelancer tài năng chỉ trong vài phút, để có được một kết quả lâu dài.",
  },
  {
    title: "Hỗ trợ khách hàng 24/7",
    des: "Đội ngũ hỗ trợ khách hàng lun túc trực, sẵn sàng hỗ trợ mọi lúc mọi nơi.",
  },
];

const Banner1 = () => {
  const { useBreakpoint } = Grid;
  const { xs } = useBreakpoint();
  if (xs) {
    return (
      <Row
        style={{
          height: 250,
          padding: 10,
          backgroundColor: "#CDF1FD",
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
    <Row
      style={{
        height: 300,
        margin: 32,
        borderRadius: 10,
        backgroundColor: "#CDF1FD",
      }}
      align="middle"
    >
      <Col span={10} offset={2}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item style={{ borderBlockEnd: "unset", padding: 0 }}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    size="small"
                    style={{
                      backgroundColor: "#CDF1FD",
                      color: "#000000",
                    }}
                    icon={<CheckCircleOutlined />}
                  />
                }
                title={<span style={{ fontSize: 16 }}>{item.title}</span>}
              />
              {item.des}
            </List.Item>
          )}
        />
      </Col>
      <Col
        span={12}
        style={{
          backgroundImage: "url('img/happywork.png')",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
        }}
      ></Col>
    </Row>
  );
};

export default Banner1;
