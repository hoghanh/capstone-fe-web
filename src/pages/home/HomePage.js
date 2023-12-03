import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Button, Grid, Layout, Card, List, notification } from 'antd';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  LeftOutlined,
  RightOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { ReactSVG } from 'react-svg';

import theme from 'styles/theme';
import color from 'styles/color';
import { home } from 'styles/homepage';
import 'swiper/css';
import 'swiper/css/navigation';
import 'App.css';
import { get } from 'utils/APICaller';
import { Link } from 'react-router-dom';

const data = [
  {
    title: 'Phù hợp ngân sách của bạn',
    des: 'Tìm dịch vụ phù hợp với mọi mức giá. Không có giá theo giờ, chỉ có giá dựa trên dự án.',
  },
  {
    title: 'Hoàn thành chất lượng tốt',
    des: 'Bàn giao dự án của bạn cho freelancer tài năng chỉ trong vài phút, để có được một kết quả lâu dài.',
  },
  {
    title: 'Hỗ trợ khách hàng 24/7',
    des: 'Đội ngũ hỗ trợ khách hàng lun túc trực, sẵn sàng hỗ trợ mọi lúc mọi nơi.',
  },
];

const HomePage = () => {
  const { useBreakpoint } = Grid;
  const { sm, md, xl } = useBreakpoint();
  const [client, setClient] = useState();

  useEffect(() => {
    get({
      endpoint: `/client/`,
    })
      .then((res) => {
        const data = res.data.filter((i)=> i.status)
        data.sort((a, b) => b.currency - a.currency);
        setClient(data.slice(0, 6));
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  }, []);

  const CustomNextButton = ({ onClick }) => (
    <Button
      shape='circle'
      icon={<RightOutlined />}
      onClick={onClick}
      style={{ marginRight: 10, width: 44 }}
    />
  );

  const CustomPrevButton = ({ onClick }) => (
    <Button
      shape='circle'
      icon={<LeftOutlined />}
      onClick={onClick}
      style={{ marginLeft: 10 }}
    />
  );

  return (
    <>
      {/* Top banner for title about the page */}
      <Layout.Content
        style={{
          backgroundColor: color.colorBluishCyan,
        }}
      >
        <Row style={home.banner} align='middle'>
          <Col xs={24} md={14} lg={12}>
            <Typography.Title
              style={{ color: color.colorBlueWhale, fontSize: 32 }}
            >
              Tìm freelancer cho
              <br />
              dự án của bạn
            </Typography.Title>
            <Row
              style={{
                display: sm ? 'flex' : 'none',
                justifyContent: 'left',
                alignItems: 'center',
              }}
            >
              <Typography.Text strong style={home.topbanner.subtitle}>
                Phổ biến:
              </Typography.Text>

              <Button style={home.topbanner.button}>Thiết kế web</Button>

              <Button style={home.topbanner.button}>WordPress</Button>
              <Button style={home.topbanner.button}>Thiết kế logo</Button>
            </Row>
          </Col>
          <Col xs={0} md={10} lg={12} style={home.topbanner.bannerImg}></Col>
        </Row>
      </Layout.Content>
      <Layout.Content style={theme.responseWidth}>
        <Typography.Title level={3} style={{ margin: '20px 30px' }}>
          Doanh nghiệp nổi bật
        </Typography.Title>
        <Swiper
          style={{
            margin: 30,
            justifyContent: 'center',
          }}
          modules={[Navigation]}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            component: () => (
              <>
                <div className='swiper-button-next' />
                <div className='swiper-button-prev' />
              </>
            ),
          }}
          spaceBetween={30}
          slidesPerView={xl ? 5 : md ? 4 : 2}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
        >
          {client?.map((item) => (
            <SwiperSlide key={item.id} style={home.jobpopular.swipper}>
              <Link to={`/profile-client/${item.accounts?.id}`} state={{
                clientId: item.id,
              }}>
                <Card hoverable style={{ backgroundImage: `url('${item.accounts?.image}')`, ...home.jobpopular.card }} />
              </Link>
            </SwiperSlide>))}
          <Row style={{ display: sm ? 'flex' : 'none' }}>
            <div className='swiper-button-next'>
              <CustomNextButton />
            </div>
            <div className='swiper-button-prev'>
              <CustomPrevButton />
            </div>
          </Row>
        </Swiper>
      </Layout.Content>

      <Layout.Content style={{ backgroundColor: color.colorPaleBlueSky }}>
        <Row style={home.promotebanner} align='middle'>
          <Col xs={24} md={12}>
            <List
              itemLayout='horizontal'
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item style={home.promotebanner.des}>
                  <List.Item.Meta
                    title={
                      <span style={home.promotebanner.title}>
                        <CheckCircleOutlined /> {item.title}
                      </span>
                    }
                  />
                  {item.des}
                </List.Item>
              )}
            />
          </Col>
          <Col xs={24} md={12} style={home.promotebanner.bannerImg}></Col>
        </Row>
      </Layout.Content>

      {/* promote what you need */}
      <Layout.Content
        style={{ maxWidth: 1080, margin: '0 auto', padding: '10px 20px' }}
      >
        <Typography.Title level={3}>
          Bạn cần gì, chúng tôi đều có
        </Typography.Title>
        <Row gutter={[32, 16]} style={{ padding: 10, marginTop: 20 }}>
          <Col xs={12} sm={6} style={home.banner3.column}>
            <ReactSVG
              src='./icon/graphic.svg'
              beforeInjection={(svg) => {
                svg.setAttribute('width', '50');
                svg.setAttribute('height', '50');
              }}
            />
            <Typography.Text style={home.banner3.text}>
              Thiết Kế Đồ Hoạ
            </Typography.Text>
          </Col>
          <Col xs={12} sm={6} style={home.banner3.column}>
            <ReactSVG
              src='./icon/digitalmarketing.svg'
              beforeInjection={(svg) => {
                svg.setAttribute('width', '50');
                svg.setAttribute('height', '50');
              }}
            />
            <Typography.Text style={home.banner3.text}>
              Digital Marketing
            </Typography.Text>
          </Col>
          <Col xs={12} sm={6} style={home.banner3.column}>
            <ReactSVG
              src='./icon/writing.svg'
              beforeInjection={(svg) => {
                svg.setAttribute('width', '50');
                svg.setAttribute('height', '50');
              }}
            />
            <Typography.Text style={home.banner3.text}>
              Dịch Thuật
            </Typography.Text>
          </Col>
          <Col xs={12} sm={6} style={home.banner3.column}>
            <ReactSVG
              src='./icon/video.svg'
              beforeInjection={(svg) => {
                svg.setAttribute('width', '50');
                svg.setAttribute('height', '50');
              }}
            />
            <Typography.Text style={home.banner3.text}>
              Video & Hoạt Hình
            </Typography.Text>
          </Col>
          <Col xs={12} sm={6} style={home.banner3.column}>
            <ReactSVG
              src='./icon/tech.svg'
              beforeInjection={(svg) => {
                svg.setAttribute('width', '50');
                svg.setAttribute('height', '50');
              }}
            />
            <Typography.Text style={home.banner3.text}>
              Lập Trình & Công Nghệ
            </Typography.Text>
          </Col>
          <Col xs={12} sm={6} style={home.banner3.column}>
            <ReactSVG
              src='./icon/music.svg'
              beforeInjection={(svg) => {
                svg.setAttribute('width', '50');
                svg.setAttribute('height', '50');
              }}
            />{' '}
            <Typography.Text style={home.banner3.text}>Âm Nhạc</Typography.Text>
          </Col>

          <Col xs={12} sm={6} style={home.banner3.column}>
            <ReactSVG
              src='./icon/photo.svg'
              beforeInjection={(svg) => {
                svg.setAttribute('width', '50');
                svg.setAttribute('height', '50');
              }}
            />
            <Typography.Text style={home.banner3.text}>
              Nhiếp Ảnh
            </Typography.Text>
          </Col>
          <Col xs={12} sm={6} style={home.banner3.column}>
            <ReactSVG
              src='./icon/business.svg'
              beforeInjection={(svg) => {
                svg.setAttribute('width', '50');
                svg.setAttribute('height', '50');
              }}
            />
            <Typography.Text style={home.banner3.text}>
              Kinh Doanh
            </Typography.Text>
          </Col>
        </Row>
      </Layout.Content>
    </>
  );
};

export default HomePage;
