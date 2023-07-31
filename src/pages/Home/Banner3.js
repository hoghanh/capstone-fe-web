import React from "react";
import { Row, Col, Typography, Grid, Layout } from "antd";
import { ReactSVG } from "react-svg";
import { home } from "../../styles/homepage";

const Banner1 = () => {
  const { useBreakpoint } = Grid;
  const { xs } = useBreakpoint();
  if (xs) {
    return <Row></Row>;
  }

  return (
    <Layout.Content style={{ height: 300, maxWidth: 1080, margin: "0 auto" }}>
      <Typography.Title level={3} style={{ fontWeight: 700 }}>
        Bạn cần gì, chúng tôi đều có
      </Typography.Title>
      <Row gutter={[32, 16]} style={{ padding: 10, marginTop: 20 }}>
        <Col span={6} style={home.banner3.column}>
          <ReactSVG
            src="./icon/graphic.svg"
            beforeInjection={(svg) => {
              svg.setAttribute("width", "50");
              svg.setAttribute("height", "50");
            }}
          />
          <Typography style={home.banner3.text}>Thiết Kế Đồ Hoạ</Typography>
        </Col>
        <Col span={6} style={home.banner3.column}>
          <ReactSVG
            src="./icon/digitalmarketing.svg"
            beforeInjection={(svg) => {
              svg.setAttribute("width", "50");
              svg.setAttribute("height", "50");
            }}
          />
          <Typography style={home.banner3.text}>Digital Marketing</Typography>
        </Col>
        <Col span={6} style={home.banner3.column}>
          <ReactSVG
            src="./icon/writing.svg"
            beforeInjection={(svg) => {
              svg.setAttribute("width", "50");
              svg.setAttribute("height", "50");
            }}
          />
          <Typography style={home.banner3.text}>Dịch Thuật</Typography>
        </Col>
        <Col span={6} style={home.banner3.column}>
          <ReactSVG
            src="./icon/video.svg"
            beforeInjection={(svg) => {
              svg.setAttribute("width", "50");
              svg.setAttribute("height", "50");
            }}
          />
          <Typography style={home.banner3.text}>Video & Hoạt Hình</Typography>
        </Col>
        <Col span={6} style={home.banner3.column}>
          <ReactSVG
            src="./icon/tech.svg"
            beforeInjection={(svg) => {
              svg.setAttribute("width", "50");
              svg.setAttribute("height", "50");
            }}
          />
          <Typography style={home.banner3.text}>
            Lập Trình & Công Nghệ
          </Typography>
        </Col>
        <Col span={6} style={home.banner3.column}>
          <ReactSVG
            src="./icon/music.svg"
            beforeInjection={(svg) => {
              svg.setAttribute("width", "50");
              svg.setAttribute("height", "50");
            }}
          />{" "}
          <Typography style={home.banner3.text}>Âm Nhạc</Typography>
        </Col>

        <Col span={6} style={home.banner3.column}>
          <ReactSVG
            src="./icon/photo.svg"
            beforeInjection={(svg) => {
              svg.setAttribute("width", "50");
              svg.setAttribute("height", "50");
            }}
          />
          <Typography style={home.banner3.text}>Nhiếp Ảnh</Typography>
        </Col>
        <Col span={6} style={home.banner3.column}>
          <ReactSVG
            src="./icon/business.svg"
            beforeInjection={(svg) => {
              svg.setAttribute("width", "50");
              svg.setAttribute("height", "50");
            }}
          />
          <Typography style={home.banner3.text}>Kinh Doanh</Typography>
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default Banner1;
