import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button, Card, Typography, Row, Layout } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { home } from "../../styles/homepage";

import "../../App.css";

const JobPopular = () => {
  const CustomNextButton = ({ onClick }) => (
    <Button
      shape="circle"
      icon={<RightOutlined />}
      onClick={onClick}
      style={{ marginRight: 10, width: 44 }}
    />
  );

  const CustomPrevButton = ({ onClick }) => (
    <Button
      shape="circle"
      icon={<LeftOutlined />}
      onClick={onClick}
      style={{ marginLeft: 10 }}
    />
  );
  return (
    <Layout.Content style={{ margin: "30px 0" }}>
      <Typography.Title level={3} style={{ margin: "20px 30px" }}>
        Công việc được thuê nhiều nhất
      </Typography.Title>
      <Swiper
        style={{
          margin: 30,
          paddingLeft: 100,
          justifyContent: "center",
        }}
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          component: () => (
            <>
              <div className="swiper-button-next" />
              <div className="swiper-button-prev" />
            </>
          ),
        }}
        spaceBetween={30}
        slidesPerView={5}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide style={home.jobpopular.swipper}>
          <Card hoverable style={home.jobpopular.card}></Card>
        </SwiperSlide>
        <SwiperSlide style={home.jobpopular.swipper}>
          <Card hoverable style={home.jobpopular.card}></Card>
        </SwiperSlide>
        <SwiperSlide style={home.jobpopular.swipper}>
          <Card hoverable style={home.jobpopular.card}></Card>
        </SwiperSlide>
        <SwiperSlide style={home.jobpopular.swipper}>
          <Card hoverable style={home.jobpopular.card}></Card>
        </SwiperSlide>
        <SwiperSlide style={home.jobpopular.swipper}>
          <Card hoverable style={home.jobpopular.card}></Card>
        </SwiperSlide>
        <SwiperSlide style={home.jobpopular.swipper}>
          <Card hoverable style={home.jobpopular.card}></Card>
        </SwiperSlide>
        <SwiperSlide style={home.jobpopular.swipper}>
          <Card hoverable style={home.jobpopular.card}></Card>
        </SwiperSlide>
        <SwiperSlide style={home.jobpopular.swipper}>
          <Card hoverable style={home.jobpopular.card}></Card>
        </SwiperSlide>
        <SwiperSlide style={home.jobpopular.swipper}>
          <Card hoverable style={home.jobpopular.card}></Card>
        </SwiperSlide>
        <SwiperSlide style={home.jobpopular.swipper}>
          <Card hoverable style={home.jobpopular.card}></Card>
        </SwiperSlide>
        <SwiperSlide style={home.jobpopular.swipper}>
          <Card hoverable style={home.jobpopular.card}></Card>
        </SwiperSlide>
        <Row>
          <div className="swiper-button-next">
            <CustomNextButton />
          </div>
          <div className="swiper-button-prev">
            <CustomPrevButton />
          </div>
        </Row>
      </Swiper>
    </Layout.Content>
  );
};
export default JobPopular;
