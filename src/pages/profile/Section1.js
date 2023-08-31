import { Col, Image, Row, Typography } from 'antd';
import { ButtonIcon, ButtonPrimary } from 'components/customize/GlobalCustomize';
import { CustomCard, CustomCol, CustomDivider, CustomRow } from 'components/customize/Layout';
import { MapMarkerAlt, Pen, Plus, Star } from 'components/icon/Icon';
import React from 'react';
import color from 'styles/color';

const Skill = ['Javascript', 'Html', 'NextJS', 'ReactJS'];

// Header section
const HeaderSection = ({name, address}) => {
  return (
    <Row justify={'space-between'} style={{ padding: 25 }}>
      <Col>
        <Row>
          <Col style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
            <Image
              width={72}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              alt="Apofoitisi logo"
              preview={false}
              style={{ borderRadius: '50%' }}
            />
            <div>{/* <CheckCircleFilled /> */}</div>
          </Col>
          <CustomCol>
            <Typography.Title level={2} style={styles.nameUser}>
              {name}
            </Typography.Title>
            <Row>
              <Col>
                <MapMarkerAlt size={16} color={'#656565'} />
              </Col>
              <Col>
                <Typography.Text style={styles.address}>{address}</Typography.Text>
              </Col>
            </Row>
          </CustomCol>
        </Row>
      </Col>
      <Col>
        <Row gutter={[20, 0]}>
          <Col>
            <ButtonPrimary $primary style={{ border: `1px solid ${color.colorDeactivate}` }}>
              Nộp CV/Resume
            </ButtonPrimary>
          </Col>
          <Col>
            <ButtonPrimary>Chỉnh sửa thông tin</ButtonPrimary>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

//Body Section Left
const BodySectionLeft = ({information}) => {
  return (
    <Col span={8} style={{ borderRight: '1px solid #656565', padding: '30px 20px' }}>
      <Row gutter={[0, 10]}>
        <Col>
          <Row gutter={[0, 10]}>
            {/* Left 1 */}
            <Col>
              <Row align={'middle'} gutter={30}>
                <Col>
                  <Typography.Title level={3} style={{ margin: 0 }}>
                    Thông tin cá nhân
                  </Typography.Title>
                </Col>
                <Col>
                  <ButtonIcon>
                    <Pen />
                  </ButtonIcon>
                </Col>
              </Row>
            </Col>
            <CustomCol span={24}>
              <Row gutter={[0, 15]}>
                <Col>
                  <Row align={'middle'} gutter={30}>
                    <Col span={24}>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Số điện thoại
                      </Typography.Title>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text>{information.phone}</Typography.Text>
                </Col>
              </Row>
            </CustomCol>
            {/* Left 2 */}
            <CustomCol span={24}>
              <Row gutter={[0, 15]}>
                <Col>
                  <Row align={'middle'} gutter={30}>
                    <Col span={24}>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Địa chỉ
                      </Typography.Title>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text>{information.address}</Typography.Text>
                </Col>
              </Row>
            </CustomCol>
          </Row>
        </Col>
        <Col>
          <Row gutter={[0, 10]}>
            <Col>
              <Row align={'middle'} gutter={30}>
                <Col>
                  <Typography.Title level={3} style={{ margin: 0 }}>
                    Thông tin công việc
                  </Typography.Title>
                </Col>
              </Row>
            </Col>
            <CustomCol>
              {/* Left 1 */}
              <Row gutter={[0, 15]}>
                <Col>
                  <Row align={'middle'} gutter={30}>
                    <Col>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Thời gian làm mỗi tuần
                      </Typography.Title>
                    </Col>
                    <Col>
                      <ButtonIcon>
                        <Pen />
                      </ButtonIcon>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Typography.Text>More than 30hrs/weeks</Typography.Text>
                </Col>
              </Row>
            </CustomCol>
            {/* Left 2 */}
            <CustomCol>
              <Row gutter={[0, 15]}>
                <Col>
                  <Row align={'middle'} gutter={30}>
                    <Col>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Ngôn ngữ
                      </Typography.Title>
                    </Col>
                    <Col>
                      <ButtonIcon>
                        <Plus />
                      </ButtonIcon>
                    </Col>
                    <Col>
                      <ButtonIcon>
                        <Pen />
                      </ButtonIcon>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Typography.Text>
                    <Typography.Text strong style={{ marginRight: 20 }}>
                      English:
                    </Typography.Text>
                    Conversational
                  </Typography.Text>
                </Col>
                <Col>
                  <Typography.Text>
                    <Typography.Text strong style={{ marginRight: 20 }}>
                      Japanese:
                    </Typography.Text>
                    Conversational
                  </Typography.Text>
                </Col>
              </Row>
            </CustomCol>
            {/* Left 3 */}
            <CustomCol>
              <Row gutter={[0, 15]}>
                <Col>
                  <Row align={'middle'} gutter={30}>
                    <Col>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Giáo dục
                      </Typography.Title>
                    </Col>
                    <Col>
                      <ButtonIcon>
                        <Plus />
                      </ButtonIcon>
                    </Col>
                    <Col>
                      <ButtonIcon>
                        <Pen />
                      </ButtonIcon>
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

//Body Section Right
const BodySectionRight = () => {
  return (
    <Col span={16}>
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
                <Col>
                  <ButtonIcon>
                    <Pen />
                  </ButtonIcon>
                </Col>
              </Row>
            </Col>
            <Col span={24} style={{ padding: 20 }}>
              <Row align={'middle'} gutter={30}>
                <Col span={21}>
                  <Typography.Text>
                    I’m a developer with experience in building websites for small and medium sized businesses. Whether
                    you’re trying to win work, list your services or even create a whole online store – I can help! I’m
                    experienced in HTML and CSS 3, JavaScipt, ReactJS and React Native Regular communication is really
                    important to me, so let’s keep in touch!
                  </Typography.Text>
                </Col>
                <Col span={3}>
                  <ButtonIcon>
                    <Pen />
                  </ButtonIcon>
                </Col>
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
                  <Typography.Title level={4} style={{ margin: 0, paddingRight: 30 }}>
                    Kỹ năng
                  </Typography.Title>
                </Col>
                <Col>
                  <ButtonIcon>
                    <Pen />
                  </ButtonIcon>
                </Col>
              </Row>
            </Col>
            <Col span={24} style={{ padding: 20 }}>
              <Row align={'middle'}>
                <CustomCol span={24} style={{ display: 'flex', gap: 15, flexDirection: 'row' }}>
                  {Skill.map((item) => {
                    return (
                      <Typography.Text
                        key={item}
                        style={{
                          fontWeight: 700,
                          fontSize: 14,
                          padding: '5px 10px',
                          backgroundColor: color.colorBluishCyan,
                          borderRadius: 25,
                        }}
                      >
                        {item}
                      </Typography.Text>
                    );
                  })}
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
                    <Col style={{ display: 'flex', direction: 'row', alignItems: 'center' }}>
                      <div
                        style={{ display: 'flex', direction: 'row', alignItems: 'center', padding: 5, marginRight: 5 }}
                      >
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                      </div>
                      <Typography.Text style={{ fontSize: 16, marginTop: 2 }}>5.00</Typography.Text>
                    </Col>
                    <Col>
                      <Typography.Text style={{ color: color.colorDeactivate }}>
                        Jul 8, 2020 - Mar 8, 2023
                      </Typography.Text>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text style={{ color: color.colorDeactivate, fontStyle: 'italic' }}>
                    “Great work!”
                  </Typography.Text>
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
                    <Col style={{ display: 'flex', direction: 'row', alignItems: 'center' }}>
                      <div
                        style={{ display: 'flex', direction: 'row', alignItems: 'center', padding: 5, marginRight: 5 }}
                      >
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                      </div>
                      <Typography.Text style={{ fontSize: 16, marginTop: 2 }}>5.00</Typography.Text>
                    </Col>
                    <Col>
                      <Typography.Text style={{ color: color.colorDeactivate }}>
                        Jul 8, 2020 - Mar 8, 2023
                      </Typography.Text>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text style={{ color: color.colorDeactivate, fontStyle: 'italic' }}>
                    “Great work!”
                  </Typography.Text>
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
                    <Col style={{ display: 'flex', direction: 'row', alignItems: 'center' }}>
                      <div
                        style={{ display: 'flex', direction: 'row', alignItems: 'center', padding: 5, marginRight: 5 }}
                      >
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                      </div>
                      <Typography.Text style={{ fontSize: 16, marginTop: 2 }}>5.00</Typography.Text>
                    </Col>
                    <Col>
                      <Typography.Text style={{ color: color.colorDeactivate }}>
                        Jul 8, 2020 - Mar 8, 2023
                      </Typography.Text>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text style={{ color: color.colorDeactivate, fontStyle: 'italic' }}>
                    “Great work!”
                  </Typography.Text>
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
const BodySection = ({information}) => {
  return (
    <Row>
      <BodySectionLeft information={information} />
      <BodySectionRight information={information} />
    </Row>
  );
};

const Section1 = (props) => {
  // console.log(props.information)
  
  return (
    <>
      <CustomCard style={{ padding: 0, marginBottom: 30 }}>
        {/* Header section */}
        <HeaderSection name={props.information.name} address={props.information.address} />
        <CustomDivider $primary />
        {/* Body Section */}
        <BodySection information={props.information} />
      </CustomCard>
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

export default Section1;
