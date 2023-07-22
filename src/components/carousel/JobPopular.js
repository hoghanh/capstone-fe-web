import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button, Card, Typography, Row } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

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
    <>
      <Typography.Title level={3} style={{ margin: "20px 30px" }}>
        Công việc được thuê nhiều nhất
      </Typography.Title>
      <Swiper
        style={{ margin: 30, paddingLeft: 100, paddingRight: 10 }}
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
        slidesPerView={4}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <Card
            hoverable
            style={{
              width: 265,
            }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Card.Meta
              title="Europe Street beat"
              description="www.instagram.com"
            />
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card
            hoverable
            style={{
              width: 265,
            }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Card.Meta
              title="Europe Street beat"
              description="www.instagram.com"
            />
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card
            hoverable
            style={{
              width: 265,
            }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Card.Meta
              title="Europe Street beat"
              description="www.instagram.com"
            />
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card
            hoverable
            style={{
              width: 265,
            }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Card.Meta
              title="Europe Street beat"
              description="www.instagram.com"
            />
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card
            hoverable
            style={{
              width: 265,
            }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Card.Meta
              title="Europe Street beat"
              description="www.instagram.com"
            />
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card
            hoverable
            style={{
              width: 265,
            }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Card.Meta
              title="Europe Street beat"
              description="www.instagram.com"
            />
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card
            hoverable
            style={{
              width: 265,
            }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Card.Meta
              title="Europe Street beat"
              description="www.instagram.com"
            />
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card
            hoverable
            style={{
              width: 265,
            }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Card.Meta
              title="Europe Street beat"
              description="www.instagram.com"
            />
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card
            hoverable
            style={{
              width: 265,
            }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Card.Meta
              title="Europe Street beat"
              description="www.instagram.com"
            />
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card
            hoverable
            style={{
              width: 265,
            }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Card.Meta
              title="Europe Street beat"
              description="www.instagram.com"
            />
          </Card>
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
    </>
  );
};
export default JobPopular;
