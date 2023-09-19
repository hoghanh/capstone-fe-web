import { Col, Grid, Image, Row, Typography } from 'antd';
// import confirm from 'antd/es/modal/confirm';
import { CustomCard, CustomCol } from 'components/customize/Layout';
import React from 'react';



const Overview = () => {
  const { useBreakpoint } = Grid;
  const { sm } = useBreakpoint();

  return (
    <>
      <CustomCard style={{ padding: 0, marginBottom: 30 }}>
        <Row justify={'space-between'}>
          <Col span={24} lg={{span: 14}} sm={{span: 13}}  style={{ padding: 25 }}>
            <Row>
              <Col span={24}>
                <Row>
                  <Col span={4} style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
                    <Image
                      width={100}
                      src={'https://th.bing.com/th/id/OIP.9EKw0r3H0j1waXZU8GC2YAAAAA?pid=ImgDet&rs=1'}
                      alt="Apofoitisi logo"
                      preview={true}
                      style={{ borderRadius: '50%'}}
                    />
                  </Col>
                  <CustomCol span={19} style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography.Title level={2} style={styles.name}>
                      Cong ty Viet Nam
                    </Typography.Title>
                  </CustomCol>
                </Row>
              </Col>
              <Col span={24}>
                <Typography.Title level={3} style={{margin: 0, padding: 20}}>
                  Giới thiệu
                </Typography.Title>
              </Col>
              <Col span={24}>
                <Typography.Paragraph style={{margin: 0, padding: 20}}>
                  Được xây dựng từ giữa năm 2012 tại TP. HCM, Việt Nam, Foody là cộng đồng tin cậy cho mọi người có thể
                  tìm kiếm, đánh giá, bình luận các địa điểm ăn uống: nhà hàng, quán ăn, cafe, bar, karaoke, tiệm bánh,
                  khu du lịch... tại Việt Nam - từ website hoặc ứng dụng di động. Tất cả thành viên từ Bắc đến Nam,
                  Foody kết nối những thực khách đến với các địa điểm ăn uống lớn nhỏ cả đất nước.
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>
          <Col span={24} lg={{span: 10}} sm={{span: 11}}  style={{ borderLeft: sm ? '1px solid #656565' : '', padding: '30px 20px' }}>
            <Row gutter={[0, 10]}>
              <Col>
                <Row gutter={[0, 10]}>
                  <Col>
                    <Row align={'middle'} gutter={[30, 10]}>
                      <Col>
                        <Typography.Title level={3} style={{ margin: 0 }}>
                          Thông tin cá nhân
                        </Typography.Title>
                      </Col>
                    </Row>
                  </Col>
                  <CustomCol span={24}>
                    <Row gutter={[15, 15]}>
                      <Col>
                        <Row align={'middle'} gutter={[30, 10]}>
                          <Col >
                            <Typography.Title level={4} style={{ margin: 0 }}>
                              Email
                            </Typography.Title>
                          </Col>
                        </Row>
                      </Col>
                      <Col >
                        <Typography.Text style={{ letterSpacing: 1 }}>foody@gmail.com</Typography.Text>
                      </Col>
                    </Row>
                  </CustomCol>
                  <CustomCol span={24}>
                    <Row gutter={[15, 15]}>
                      <Col>
                        <Row align={'middle'} gutter={[30, 10]}>
                          <Col>
                            <Typography.Title level={4} style={{ margin: 0 }}>
                              Số điện thoại
                            </Typography.Title>
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <Typography.Text style={{ letterSpacing: 1 }}>0865644162</Typography.Text>
                      </Col>
                    </Row>
                  </CustomCol>
                  <CustomCol span={24}>
                    <Row gutter={[15, 15]}>
                      <Col>
                        <Row align={'middle'} gutter={[30, 10]}>
                          <Col>
                            <Typography.Title level={4} style={{ margin: 0 }}>
                              Website
                            </Typography.Title>
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <Typography.Text style={{ letterSpacing: 1 }}>foody.com.vn</Typography.Text>
                      </Col>
                    </Row>
                  </CustomCol>
                  <CustomCol span={24}>
                    <Row gutter={[15, 15]}>
                      <Col>
                        <Row align={'middle'} gutter={[30, 10]}>
                          <Col span={24}>
                            <Typography.Title level={4} style={{ margin: 0 }}>
                              Địa chỉ
                            </Typography.Title>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={24}>
                        <Typography.Text>Lầu G, Tòa nhà Jabes 1, số 244 đường Cống Quỳnh, Phường Phạm Ngũ Lão, Quận 1, Thành phố Hồ Chí Minh, Việt Nam</Typography.Text>
                      </Col>
                    </Row>
                  </CustomCol>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </CustomCard>
    </>
  );
};

const styles = {
  name: {
    margin: 0,
  },

  address: {
    color: '#656565',
    paddingLeft: 10,
    marginBottom: 20,
  },
};

export default Overview;
