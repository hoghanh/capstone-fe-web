import React from "react";
import { Row, Col, Grid, List, Layout } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import color from "../../styles/color";
import { home } from "../../styles/homepage";

const data = [
  {
    title: "Phù hợp ngân sách của bạn",
    des: "Tìm dịch vụ phù hợp với mọi mức giá. Không có giá theo giờ, chỉ có giá dựa trên dự án.",
  },
  {
    title: "Hoàn thành chất lượng tốt",
    des: "Bàn giao dự án của bạn cho freelancer tài năng chỉ trong vài phút, để có được một kết quả lâu dài.",
  },
  {
    title: "Hỗ trợ khách hàng 24/7",
    des: "Đội ngũ hỗ trợ khách hàng lun túc trực, sẵn sàng hỗ trợ mọi lúc mọi nơi.",
  },
];

const Banner2 = () => {
  const { useBreakpoint } = Grid;
  const { xs } = useBreakpoint();
  if (xs) {
    return (
      <Row
        style={{
          height: 180,
          backgroundColor: color.colorPaleBlueSky,
        }}
        align="middle"
        justify="center"
      >
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item
              style={{ borderBlockEnd: "unset", padding: 0, fontSize: 18 }}
            >
              <CheckCircleOutlined style={{ marginRight: 10 }} />
              {item.title}
            </List.Item>
          )}
        />
      </Row>
    );
  }
  return (
    <Layout.Content style={{ backgroundColor: color.colorPaleBlueSky }}>
      <Row style={home.banner} align="middle">
        <Col span={12} style={{ padding: 10 }}>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item style={home.banner2.des}>
                <List.Item.Meta
                  title={
                    <span style={home.banner2.title}>
                      <CheckCircleOutlined /> {item.title}
                    </span>
                  }
                />
                {item.des}
              </List.Item>
            )}
          />
        </Col>
        <Col span={12} style={home.banner2.bannerImg}></Col>
      </Row>
    </Layout.Content>
  );
};

export default Banner2;
