import { Card, Col, Row, Typography } from 'antd';
import { CustomCard, CustomCol, CustomRow } from 'components/customize/Layout';
import { File } from 'components/icon/Icon';
import React from 'react';
import color from 'styles/color';


// Header section
const HeaderSection = () => {
  return (
    <Row justify={'space-between'} style={{ padding: 25 }}>
      <CustomCol>
        <Typography.Title level={3} style={styles.titleHeader}>
          Đề xuất
        </Typography.Title>
      </CustomCol>
      <CustomCol>
        <Typography.Title level={3} style={{ color: color.colorPrimary, margin: 0  }}>
          Coi chi tiết
        </Typography.Title>
      </CustomCol>
    </Row>
  );
};

//Body Section
const BodySection = () => {
  return (
    <Row justify={'space-between'} gutter={[40,40]} style={{ padding: '5px 20px 20px' }}>
      <Col span={24} sm={{span: 8}}>
       <Card style={{ padding: 20, borderRadius: 20, backgroundColor: color.colorLightGray }}>
          <Row align={'middle'} gutter={[0,10]} style={{ flexDirection: 'column'}}>
            <Col>
              <File />
            </Col>
            <Col>
              <Typography.Title level={5} style={{margin: 0, textAlign:'center'}}>Đề xuất bị từ chối</Typography.Title>
            </Col>
          </Row>
       </Card>
      </Col>
      <Col span={24} sm={{span: 8}}>
        <Card style={{ padding: 20, borderRadius: 20, backgroundColor: color.colorLightGray }}>
          <Row align={'middle'} gutter={[0,10]} style={{ flexDirection: 'column' }}>
            <Col>
              <File />
            </Col>
            <Col>
              <Typography.Title level={5} style={{margin: 0, textAlign:'center'}}>6 đề xuất đã được gửi đi</Typography.Title>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24} sm={{span: 8}}>
        <Card style={{ padding: 20, borderRadius: 20, backgroundColor: color.colorLightGray }}>
          <Row align={'middle'} gutter={[0,10]} style={{ flexDirection: 'column' }}>
            <Col>
              <File />
            </Col>
            <Col>
              <Typography.Title level={5} style={{margin: 0, textAlign:'center'}}>3 đề xuất vào phòng phỏng vấn</Typography.Title>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

const ProposalsStatus = () => {
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

export default ProposalsStatus;
