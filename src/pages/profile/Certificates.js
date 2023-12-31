import { Col, Image, Row, Typography } from 'antd';
import { ButtonIcon } from 'components/customize/GlobalCustomize';
import { CustomCard, CustomCol, CustomDivider, CustomRow } from 'components/customize/Layout';
import { Plus } from 'components/icon/Icon';
import React from 'react';
import css from './profile.module.css';

// Header section
const HeaderSection = () => {
  return (
    <Row justify={'space-between'} style={{ padding: 25 }}>
      <Col>
        <Row>
          <CustomCol>
            <Typography.Title level={3} style={styles.titleHeader}>
              Chứng chỉ
            </Typography.Title>
          </CustomCol>
        </Row>
      </Col>
      <Col>
        <ButtonIcon>
          <Plus />
        </ButtonIcon>
      </Col>
    </Row>
  );
};

//Body Section
const BodySection = () => {
  return (
    <Row style={{ marginRight: 30, marginLeft: 30 }}>
      <Col span={24}>
        <Row className={css.certificate} style={{ padding: '20px 30px' }} align={'middle'}>
          <Col span={0} sm={{span: 4}} style={{ paddingRight: 20 }}>
            <Image src="img/certificate-1.png" preview={false}></Image>
          </Col>
          <Col span={24} sm={{span: 20}}>
            <CustomRow>
              <Col span={24}>
                <Typography.Title level={3} style={{ margin: 0 }}>
                  UX (User Experience) Capstone
                </Typography.Title>
              </Col>
              <Col span={24}>
                <Typography.Text>Provider: Coursera and University of Michigan</Typography.Text>
              </Col>
              <Col span={24}>
                <Typography.Text>Issued: February 2020</Typography.Text>
              </Col>
            </CustomRow>
          </Col>
        </Row>
      </Col>
      <CustomDivider $primary />
      <Col span={24}>
        <Row className={css.certificate} style={{ padding: '20px 30px' }} align={'middle'}>
          <Col span={0} sm={{span: 4}} style={{ paddingRight: 20 }}>
            <Image src="img/certificate-1.png" preview={false}></Image>
          </Col>
          <Col span={24} sm={{span: 20}}>
            <CustomRow>
              <Col span={24}>
                <Typography.Title level={3} style={{ margin: 0 }}>
                  UX (User Experience) Capstone
                </Typography.Title>
              </Col>
              <Col span={24}>
                <Typography.Text>Provider: Coursera and University of Michigan</Typography.Text>
              </Col>
              <Col span={24}>
                <Typography.Text>Issued: February 2020</Typography.Text>
              </Col>
            </CustomRow>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const Certificates = () => {
  return (
    <>
      <CustomCard style={{ padding: 0 }}>
        {/* Header section */}
        <HeaderSection />
        {/* Body Section */}
        <BodySection />
      </CustomCard>
    </>
  );
};

const styles = {
  titleHeader: {
    margin: 0,
  },

  address: {
    color: '#656565',
    paddingLeft: 10,
    marginBottom: 20,
  },
};

export default Certificates;
