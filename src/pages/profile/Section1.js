import { Col, Image, Row, Typography } from 'antd';
import { ButtonIcon, ButtonPrimary } from 'components/button/GlobalButton';
import { CustomCard, CustomCol, CustomDivider } from 'components/customize/Layout';
import { MapMarkerAlt, Pen, Plus } from 'components/icon/Icon';
import {CheckCircleFilled} from '@ant-design/icons';
import React from 'react';

// Header section
const HeaderSection = () => {
  return (
    <Row justify={'space-between'} style={{ padding: 25 }}>
      <Col>
        <Row>
          <Col style={{ display: 'flex', alignItems: 'center', marginRight: 10, position: 'absolute' }}>
            <Image
              width={72}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              alt="Apofoitisi logo"
              preview={false}
              style={{ borderRadius: '50%' }}
            />
            <div>
            {/* <CheckCircleFilled /> */}
            </div>
          </Col>
          <CustomCol>
            <Typography.Title level={2} style={styles.nameUser}>
              Nguyen Van A
            </Typography.Title>
            <Row>
              <Col>
                <MapMarkerAlt size={16} color={'#656565'} />
              </Col>
              <Col>
                <Typography.Text style={styles.address}>Ho Chi Minh, FPTU HCM</Typography.Text>
              </Col>
            </Row>
          </CustomCol>
        </Row>
      </Col>
      <Col>
        <Row gutter={[20, 0]}>
          <Col>
            <ButtonPrimary $primary>Nộp CV/Resume</ButtonPrimary>
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
const BodySectionLeft = () => {
  return (
    <Col span={8} style={{ borderRight: '1px solid #656565', padding: '30px 20px' }}>
      <Row gutter={[0, 10]}>
        <CustomCol>
          {/* Left 1 */}
          <Row gutter={[0, 15]}>
            <Col>
              <Row align={'middle'} gutter={30}>
                <Col>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    Hours per weeks
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
                    Languages
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
                    Education
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
  );
};

//Body Section Right
const BodySectionRight = () => {
  return (
    <Col>
      <Typography.Text>Hello</Typography.Text>
    </Col>
  );
};

//Body Section
const BodySection = () => {
  return (
    <Row>
      <BodySectionLeft/>
      <BodySectionRight/>
    </Row>
  );
};

const Section1 = () => {
  return (
    <>
      <CustomCard style={{ padding: 0 }}>
        {/* Header section */}
        <HeaderSection />
        <CustomDivider $primary />
        {/* Body Section */}
        <BodySection />
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
