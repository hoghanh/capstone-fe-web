import React from 'react';
import Header from '../layout/header/Header';
import Footer from '../layout/footer/Footer';
import { Breadcrumb, Layout, Row, Col, Typography, Divider } from 'antd';
import { HomeOutlined, ClockCircleFilled } from '@ant-design/icons';
import { CustomCard, CustomCol, CustomDivider, CustomRow } from '../components/customize/Layout';
import { BookMarkOutlined, PaperClipOutlined } from '../components/icon/Icon';
import color from '../styles/color';

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const Skill = ['Javascript', 'Html', 'NextJS', 'ReactJS'];

const JobDetail = ({ props }) => {
  console.log(props);
  return (
    <>
      <Header />
      <Layout.Content style={styles.containerBody}>
        <Breadcrumb
          style={{ padding: '10px 20px' }}
          items={[
            {
              href: '',
              title: <HomeOutlined />,
            },
            {
              href: '',
              title: (
                <>
                  {/* <UserOutlined /> */}
                  <span>Graphics & Design</span>
                </>
              ),
            },
            {
              title: 'Logo Design',
            },
          ]}
        />
        <Typography.Title style={{ padding: '10px 30px', margin: '20px 0', fontSize: 24 }} level={3}>
          Javascript expert with Next.js and React.js expertise
        </Typography.Title>
        <CustomCard>
          <CustomRow>
            <Col span={18}>
              {/* Header Body right  */}
              <CustomRow>
                <CustomCol span={11} style={styles.headerRight}>
                  <Typography.Title style={styles.headerTitleRight}>Project Detail</Typography.Title>
                  <Typography.Text style={styles.headerTextRight}>5 Freelancer had applied</Typography.Text>
                </CustomCol>
                <CustomCol
                  span={11}
                  style={{
                    ...styles.headerRight,
                    alignItems: 'flex-end',
                  }}
                >
                  <Typography.Title style={styles.headerTitleRight}>000.000VND - 000.000VND</Typography.Title>
                  <div>
                    <ClockCircleFilled />
                    <Typography.Text style={{ ...styles.headerTextRight, marginLeft: 10 }}>
                      Apply time end in 4 days
                    </Typography.Text>
                  </div>
                </CustomCol>
                <Col span={2} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <BookMarkOutlined />
                </Col>
              </CustomRow>
              <CustomDivider />
              {/* Description */}
              <Row>
                <CustomCol span={24}>
                  <Row gutter={[0, 20]}>
                    <Col span={24}>
                      <Typography.Text style={{ fontSize: 14, fontWeight: 400 }}>
                        Lorem ipsum dolor sit amet consectetur. Malesuada viverra risus condimentum integer tortor.
                        Tempus cursus risus commodo lorem elit id. Sed et dolor dictum faucibus. Enim tellus et egestas
                        nisi maecenas turpis nunc. Turpis eu fermentum pretium purus sapien purus. Mi sollicitudin lacus
                        mauris eu pellentesque amet iaculis dignissim sit. Neque morbi in nec viverra id integer. Donec
                        id gravida elementum arcu in aliquam nullam nibh sit.
                      </Typography.Text>
                    </Col>
                    <Col span={24}>
                      <Typography.Text style={{ fontSize: 14, fontWeight: 400 }}>
                        Cursus diam natoque orci pulvinar elit. Suspendisse sit nunc velit mauris interdum laoreet
                        faucibus nunc ut. Diam posuere elementum justo tristique neque at in nisl aliquam. Vitae mi at
                        morbi pretium. Facilisis at egestas facilisis cras. Praesent at dolor lectus vivamus ipsum at
                        platea ut ornare.
                      </Typography.Text>
                    </Col>
                    <Col span={24}>
                      <Typography.Text style={{ fontSize: 14, fontWeight: 400 }}>
                        Urna molestie lobortis integer adipiscing pretium. Gravida adipiscing elementum ac quam.
                        Porttitor odio viverra convallis egestas sit. Est porttitor mauris commodo parturient pharetra.
                        Mauris sem netus vitae volutpat orci. Malesuada amet mi bibendum nulla in diam. Ipsum odio et
                        dignissim molestie commodo adipiscing feugiat aliquam. Donec facilisis ac viverra in mattis
                        ultrices. Malesuada turpis ultrices lobortis aliquam malesuada. Urna duis sed sit pellentesque
                        facilisi id mauris id. Cursus proin tortor eu vitae pellentesque quam ut et blandit. Pulvinar
                        sed mattis nulla eget ipsum nam facilisi venenatis. Rhoncus massa elementum vitae eget non
                        consectetur nec eget. Feugiat eu ac egestas dui. Cursus purus pulvinar nisl nulla et tristique
                        dictum.
                      </Typography.Text>
                    </Col>
                    <Col span={24}>
                      <Typography.Text style={{ fontSize: 14, fontWeight: 400 }}>
                        Urna molestie lobortis integer adipiscing pretium. Gravida adipiscing elementum ac quam.
                        Porttitor odio viverra convallis egestas sit. Est porttitor mauris commodo parturient pharetra.
                        Mauris sem netus vitae volutpat orci. Malesuada amet mi bibendum nulla in diam. Ipsum odio et
                        dignissim molestie commodo adipiscing feugiat aliquam. Donec facilisis ac viverra in mattis
                        ultrices. Malesuada turpis ultrices lobortis aliquam malesuada. Urna duis sed sit pellentesque
                        facilisi id mauris id. Cursus proin tortor eu vitae pellentesque quam ut et blandit. Pulvinar
                        sed mattis nulla eget ipsum nam facilisi venenatis. Rhoncus massa elementum vitae eget non
                        consectetur nec eget. Feugiat eu ac egestas dui. Cursus purus pulvinar nisl nulla et tristique
                        dictum.
                      </Typography.Text>
                    </Col>
                  </Row>
                </CustomCol>
              </Row>
              <CustomDivider />
              {/* Attachment */}
              <CustomRow>
                <Col span={24}>
                  <Typography.Title
                    style={{ fontSize: '16px', fontStyle: 'normal', fontWeight: 700, margin: '0 0 10px 0' }}
                  >
                    Tập tin đính kèm
                  </Typography.Title>
                </Col>
                <CustomCol span={24} style={{ display: 'flex' }}>
                  <PaperClipOutlined />
                  <Typography.Text underline={true} style={{ fontWeight: 700, fontSize: 14, marginLeft: 5 }}>
                    fileAttachName.doc
                  </Typography.Text>
                </CustomCol>
              </CustomRow>
              <CustomDivider />
              {/* Skill Require */}
              <CustomRow gutter={[15, 10]}>
                <Col span={24}>
                  <Typography.Title
                    style={{ fontSize: '16px', fontStyle: 'normal', fontWeight: 700, margin: 0 }}
                  >
                    Yêu cầu kỹ năng
                  </Typography.Title>
                </Col>
                <CustomCol span={24} style={{ display: 'flex' }}>
                  {Skill.map((item) => {
                    return (
                      <Typography.Text
                        key={item}
                        style={{ fontWeight: 700, fontSize: 14, padding: '5px 10px', backgroundColor: color.colorBluishCyan  }}
                      >
                        {item}
                      </Typography.Text>
                    );
                  })}
                </CustomCol>
              </CustomRow>
              <Row>
                <Col span={24}></Col>
              </Row>
            </Col>
            <Col span={6}>col</Col>
          </CustomRow>
        </CustomCard>
      </Layout.Content>
      <Footer />
    </>
  );
};
//styles
const styles = {
  containerBody: { maxWidth: 1400, margin: '30px 180px 80px' },

  //Body Right
  headerRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  headerTitleRight: {
    color: '#000',
    fontFamily: 'Montserrat',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
    margin: '0 0 10px 0',
  },

  headerTextRight: {
    color: '#000',
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 400,
  },

  iconBookmark: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default JobDetail;
