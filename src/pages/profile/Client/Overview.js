import { Col, Image, List, Row, Typography } from 'antd';
// import confirm from 'antd/es/modal/confirm';
import { ButtonPrimary } from 'components/customize/GlobalCustomize';
import { CustomCard, CustomCol, CustomDivider, CustomRow } from 'components/customize/Layout';
import { Checking,  MapMarkerAlt} from 'components/icon/Icon';
import React from 'react';
import color from 'styles/color';
import css from '../profile.module.css';
import { useRecoilValue } from 'recoil';
import { profileState } from 'recoil/atom';

const Skill = [
  {
    title: 'Javascript',
  },
  {
    title: 'Html',
  },
  {
    title: 'NextJS',
  },
  {
    title: 'ReactJS',
  },
  {
    title: 'Javascript',
  },
  {
    title: 'Html',
  },
  {
    title: 'NextJS',
  },
  {
    title: 'ReactJS',
  },
  {
    title: 'Javascript',
  },
  {
    title: 'Html',
  },
  {
    title: 'NextJS',
  },
  {
    title: 'ReactJS',
  },
];


// Header section
const HeaderSection = () => {
  const informationUser = useRecoilValue(profileState);

  console.log('informations', informationUser);

  return (
    <Row justify={'space-between'} style={{ padding: 25 }}>
      <Col>
        <Row>
          <Col style={{ display: 'flex', alignItems: 'center', marginRight: 10, position: 'relative' }}>
            <Image
              width={72}
              src={informationUser.image}
              alt='Apofoitisi logo'
              preview={true}
              style={{ borderRadius: '50%' }}
            />
            <div style={{ position: 'absolute', right: 2, bottom: 2 }}>
              <Checking />
            </div>
          </Col>
          <CustomCol>
            <Row gutter={10}>
              <Col>
                <Typography.Title level={2} style={styles.nameUser}>
                  {informationUser.name}
                </Typography.Title>
              </Col>
            </Row>
            <Row>
              <Col>
                <MapMarkerAlt size={16} color={'#656565'} />
              </Col>
              <Col>
                <Typography.Text style={styles.address}>TP. Hồ Chí Minh, Việt Nam</Typography.Text>
              </Col>
            </Row>
          </CustomCol>
        </Row>
      </Col>
      <Col className={css.btnSubmitCV}>
        <Row gutter={[20, 0]}>
          <Col>
            <ButtonPrimary $primary style={{ border: `1px solid ${color.colorDeactivate}` }}>
              Nộp CV/Resume
            </ButtonPrimary>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

//Body Section Left
const BodySectionLeft = () => {
  const informationUser = useRecoilValue(profileState);

  return (
    <Col span={0} sm={{ span: 8 }} style={{ borderRight: '1px solid #656565', padding: '30px 20px' }}>
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
              <Row gutter={[0, 15]}>
                <Col>
                  <Row align={'middle'} gutter={[30, 10]}>
                    <Col span={24}>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Số điện thoại
                      </Typography.Title>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text style={{ letterSpacing: 1 }}>{informationUser.phone}</Typography.Text>
                </Col>
              </Row>
            </CustomCol>
            <CustomCol span={24}>
              <Row gutter={[0, 15]}>
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
                  <Typography.Text>{informationUser.address}</Typography.Text>
                </Col>
              </Row>
            </CustomCol>
          </Row>
        </Col>
        <Col>
          <Row gutter={[0, 10]}>
            <Col>
              <Row align={'middle'} gutter={[30, 10]}>
                <Col>
                  <Typography.Title level={3} style={{ margin: 0 }}>
                    Thông tin công việc
                  </Typography.Title>
                </Col>
              </Row>
            </Col>
            <CustomCol>
              <Row gutter={[0, 15]}>
                <Col>
                  <Row align={'middle'} gutter={[30, 10]}>
                    <Col>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Thời gian làm mỗi tuần
                      </Typography.Title>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Typography.Text>More than 30hrs/weeks</Typography.Text>
                </Col>
              </Row>
            </CustomCol>
            <CustomCol>
              <Row gutter={[0, 15]}>
                <Col span={24}>
                  <Row align={'middle'} gutter={[30, 10]}>
                    <Col>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Ngôn ngữ
                      </Typography.Title>
                    </Col>
  
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text>
                    <Typography.Text strong style={{ marginRight: 20 }}>
                      Tiếng Anh:
                    </Typography.Text>
                    Giao tiếp
                  </Typography.Text>
                </Col>
                <Col span={24}>
                  <Typography.Text>
                    <Typography.Text strong style={{ marginRight: 20 }}>
                      Tiếng Nhật:
                    </Typography.Text>
                    Giao tiếp
                  </Typography.Text>
                </Col>
              </Row>
            </CustomCol>
            {/* Left 3 */}
            <CustomCol>
              <Row gutter={[0, 15]}>
                <Col>
                  <Row align={'middle'} gutter={[30, 10]}>
                    <Col>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Giáo dục
                      </Typography.Title>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Typography.Text strong style={{ display: 'block', marginBottom: 10 }}>
                    FPT University
                  </Typography.Text>
                  <Typography.Text>Computer Software Engineering · (2019 - 2023)</Typography.Text>
                </Col>
              </Row>
            </CustomCol>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

//Body Section Left Responsive
const BodySectionLeftResponsive = () => {
  const informationUser = useRecoilValue(profileState);

  return (
    <Col
      span={24}
      sm={{ span: 0 }}
      style={{
        borderRight: '1px solid #656565',
        padding: '30px 20px',
        boxShadow: '2px 6px 4px 0px rgba(0, 0, 0, 0.25)',
        borderRadius: 20,
        backgroundColor: color.colorWhite,
        marginBottom: 30,
      }}
    >
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
              <Row gutter={[0, 15]}>
                <Col>
                  <Row align={'middle'} gutter={[30, 10]}>
                    <Col span={24}>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Số điện thoại
                      </Typography.Title>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text style={{ letterSpacing: 1 }}>{informationUser.phone}</Typography.Text>
                </Col>
              </Row>
            </CustomCol>
            <CustomCol span={24}>
              <Row gutter={[0, 15]}>
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
                  <Typography.Text>{informationUser.address}</Typography.Text>
                </Col>
              </Row>
            </CustomCol>
          </Row>
        </Col>
        <Col>
          <Row gutter={[0, 10]}>
            <Col>
              <Row align={'middle'} gutter={[30, 10]}>
                <Col>
                  <Typography.Title level={3} style={{ margin: 0 }}>
                    Thông tin công việc
                  </Typography.Title>
                </Col>
              </Row>
            </Col>
            <CustomCol>
              <Row gutter={[0, 15]}>
                <Col span={24}>
                  <Row align={'middle'} gutter={[30, 10]}>
                    <Col>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Thời gian làm mỗi tuần
                      </Typography.Title>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text>More than 30hrs/weeks</Typography.Text>
                </Col>
              </Row>
            </CustomCol>
            <CustomCol>
              <Row gutter={[0, 15]}>
                <Col span={24}>
                  <Row align={'middle'} gutter={[30, 10]}>
                    <Col>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Ngôn ngữ
                      </Typography.Title>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text>
                    <Typography.Text strong style={{ marginRight: 20 }}>
                      Tiếng Anh:
                    </Typography.Text>
                    Giao tiếp
                  </Typography.Text>
                </Col>
                <Col>
                  <Typography.Text>
                    <Typography.Text strong style={{ marginRight: 20 }}>
                      Tiếng Nhật:
                    </Typography.Text>
                    Giao tiếp
                  </Typography.Text>
                </Col>
              </Row>
            </CustomCol>
            {/* Left 3 */}
            <CustomCol>
              <Row gutter={[0, 15]}>
                <Col span={24}>
                  <Row align={'middle'} gutter={[30, 10]}>
                    <Col>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Chuyên ngành
                      </Typography.Title>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text>Kỹ thuật phần mềm · (2019 - 2023)</Typography.Text>
                </Col>
              </Row>
            </CustomCol>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

//Body Section Right
const BodySectionRight = () => {
  return (
    <Col span={24} sm={{ span: 16 }}>
      <Row>
        <Col span={24}>
          <Row>
            <Col span={24} style={{ padding: 20 }}>
              <Row align={'middle'}>
                <Col>
                  <Typography.Title level={3} style={{ margin: 0, paddingRight: 30 }}>
                    Software Engineer | Javascript
                  </Typography.Title>
                </Col>
              </Row>
            </Col>
            <Col span={24} style={{ padding: 20 }}>
              <Typography.Text>
                I’m a developer with experience in building websites for small and medium sized businesses. Whether
                you’re trying to win work, list your services or even create a whole online store – I can help! I’m
                experienced in HTML and CSS 3, JavaScipt, ReactJS and React Native Regular communication is really
                important to me, so let’s keep in touch!
              </Typography.Text>
            </Col>
          </Row>
        </Col>
        <CustomDivider $primary />
        <Col span={24}>
          <Row>
            <Col span={24} style={{ padding: 20 }}>
              <Row align={'middle'}>
                <Col>
                  <Typography.Title level={4} style={{ margin: 0, paddingRight: 30 }}>
                    Kỹ năng
                  </Typography.Title>
                </Col>
      
              </Row>
            </Col>
            <Col span={24} style={{ padding: 20 }}>
              <Row className='skillArticle' gutter={[0, 10]}>
                <CustomCol span={24}>
                  <List
                    style={{ overflowX: 'auto' }}
                    grid={{
                      gutter: 15,
                    }}
                    dataSource={Skill}
                    renderItem={(item, index) => (
                      <List.Item
                        style={{
                          fontWeight: 700,
                          fontSize: 14,
                          padding: '5px 10px',
                          backgroundColor: color.colorBluishCyan,
                          borderRadius: 25,
                        }}
                      >
                        {item.title}
                      </List.Item>
                    )}
                  />
                </CustomCol>
              </Row>
            </Col>
          </Row>
        </Col>
        <CustomDivider $primary />
        <Col span={24}>
          <Row>
            <Col span={24} style={{ padding: 20 }}>
              <Row align={'middle'}>
                <Col>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    Dự án từng làm
                  </Typography.Title>
                </Col>
              </Row>
            </Col>

            <Col span={24}>
              <CustomRow gutter={[0, 10]} style={{ paddingRight: 30, paddingLeft: 30 }}>
                <Col span={24}>
                  <Typography.Title level={5} style={{ margin: 0, paddingTop: 10, paddingBottom: 10 }}>
                    Javascript expert with Next.js and React.js expertise
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Row gutter={10} align={'middle'}>
                    <Col>
                      <Typography.Text style={{ color: color.colorDeactivate }}>
                        Jul 8, 2020 - Mar 8, 2023
                      </Typography.Text>
                    </Col>
                  </Row>
                </Col>
              </CustomRow>
            </Col>
            <CustomDivider $primary />
            <Col span={24}>
              <CustomRow gutter={[0, 10]} style={{ paddingRight: 30, paddingLeft: 30 }}>
                <Col span={24}>
                  <Typography.Title level={5} style={{ margin: 0, paddingTop: 10, paddingBottom: 10 }}>
                    Javascript expert with Next.js and React.js expertise
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Row gutter={10} align={'middle'}>
                    <Col>
                      <Typography.Text style={{ color: color.colorDeactivate }}>
                        Jul 8, 2020 - Mar 8, 2023
                      </Typography.Text>
                    </Col>
                  </Row>
                </Col>
              </CustomRow>
            </Col>
            <CustomDivider $primary />
            <Col span={24}>
              <CustomRow gutter={[0, 10]} style={{ paddingRight: 30, paddingLeft: 30 }}>
                <Col span={24}>
                  <Typography.Title level={5} style={{ margin: 0, paddingTop: 10, paddingBottom: 10 }}>
                    Javascript expert with Next.js and React.js expertise
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Row gutter={10} align={'middle'}>
                    <Col>
                      <Typography.Text style={{ color: color.colorDeactivate }}>
                        Jul 8, 2020 - Mar 8, 2023
                      </Typography.Text>
                    </Col>
                  </Row>
                </Col>
              </CustomRow>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

//Body Section
const BodySection = ({ information }) => {
  return (
    <Row>
      <BodySectionLeft information={information} />
      <BodySectionRight information={information} />
    </Row>
  );
};

const Overview = () => {
  return (
    <>
      <CustomCard style={{ padding: 0, marginBottom: 30 }}>
        {/* Header section */}
        <HeaderSection />
        <CustomDivider $primary />
        {/* Body Section */}
        <BodySection />
      </CustomCard>

        <BodySectionLeftResponsive />
    </>
  );
};

const styles = {
  nameUser: {
    margin: 0,
    paddingBottom: 10,
  },

  address: {
    color: '#656565',
    paddingLeft: 10,
    marginBottom: 20,
  },
};

export default Overview;
