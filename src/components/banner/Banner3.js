import React from "react";
import { Row, Col, Typography, Grid, Layout } from "antd";
import { ReactSVG } from "react-svg";

const Banner1 = () => {
  const { useBreakpoint } = Grid;
  const { xs } = useBreakpoint();
  if (xs) {
    return <Row></Row>;
  }

  const styles = {
    column: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
    },
  };

  return (
    <Layout.Content style={{ height: 300, maxWidth: 1400, margin: "0 auto" }}>
      <Typography.Title level={3} style={{ fontWeight: 700 }}>
        Bạn cần gì, chúng tôi đều có
      </Typography.Title>
      <Row gutter={[32, 16]} style={{ padding: 10, marginTop: 20 }}>
        <Col span={6} style={styles.column}>
          <ReactSVG
            src="./icon/graphic.svg"
            beforeInjection={(svg) => {
              svg.setAttribute("width", "50");
              svg.setAttribute("height", "50");
            }}
          />
          <Typography style={{ marginTop: 10 }}>Thiết Kế Đồ Hoạ</Typography>
        </Col>
        <Col span={6} style={styles.column}>
          <ReactSVG
            src="./icon/digitalmarketing.svg"
            beforeInjection={(svg) => {
              svg.setAttribute("width", "50");
              svg.setAttribute("height", "50");
            }}
          />
          <Typography style={{ marginTop: 10 }}>Digital Marketing</Typography>
        </Col>
        <Col span={6} style={styles.column}>
          <ReactSVG
            src="./icon/writing.svg"
            beforeInjection={(svg) => {
              svg.setAttribute("width", "50");
              svg.setAttribute("height", "50");
            }}
          />
          <Typography style={{ marginTop: 10 }}>Dịch Thuật</Typography>
        </Col>
        <Col span={6} style={styles.column}>
          <ReactSVG
            src="./icon/video.svg"
            beforeInjection={(svg) => {
              svg.setAttribute("width", "50");
              svg.setAttribute("height", "50");
            }}
          />
          <Typography style={{ marginTop: 10 }}>Video & Hoạt Hình</Typography>
        </Col>
        <Col span={6} style={styles.column}>
          <ReactSVG
            src="./icon/tech.svg"
            beforeInjection={(svg) => {
              svg.setAttribute("width", "50");
              svg.setAttribute("height", "50");
            }}
          />
          <Typography style={{ marginTop: 10 }}>
            Lập Trình & Công Nghệ
          </Typography>
        </Col>
        <Col span={6} style={styles.column}>
          <ReactSVG
            src="./icon/music.svg"
            beforeInjection={(svg) => {
              svg.setAttribute("width", "50");
              svg.setAttribute("height", "50");
            }}
          />{" "}
          <Typography style={{ marginTop: 10 }}>Âm Nhạc</Typography>
        </Col>

        <Col span={6} style={styles.column}>
          <ReactSVG
            src="./icon/photo.svg"
            beforeInjection={(svg) => {
              svg.setAttribute("width", "50");
              svg.setAttribute("height", "50");
            }}
          />
          <Typography style={{ marginTop: 10 }}>Nhiếp Ảnh</Typography>
        </Col>
        <Col span={6} style={styles.column}>
          <ReactSVG
            src="./icon/business.svg"
            beforeInjection={(svg) => {
              svg.setAttribute("width", "50");
              svg.setAttribute("height", "50");
            }}
          />
          <Typography style={{ marginTop: 10 }}>Kinh Doanh</Typography>
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default Banner1;
