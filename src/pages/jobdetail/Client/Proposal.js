import { Card, Col, Row, Typography } from 'antd';
import { CustomCard, CustomCol, CustomRow } from 'components/customize/Layout';
import { File, User } from 'components/icon/Icon';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import color from 'styles/color';
import { get } from 'utils/APICaller';


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
        <Link to={'/client/proposals'}>
          <Typography.Title level={3} style={{ color: color.colorPrimary, margin: 0  }}>
            Coi chi tiết
          </Typography.Title>
        </Link>
      </CustomCol>
    </Row>
  );
};

//Body Section
const BodySection = () => {
  const [countTotal, setCountTotal] = useState(0);
  const [countSent, setCountSent] = useState(0);
  const [countApproved, setCountApproved] = useState(0);
  const [countDeclined, setCountDeclined] = useState(0);
  useEffect(() => {
    getProposals();
  }, [])
  
  console.log(countTotal)
  const getProposals = async () => {
    await get({ endpoint: `/proposal/freelancer/1` })
      .then((response) => {
        const data = response.data;
        let proposals = data.filter(proposal => proposal.jobId !== null && proposal.jobs !== null)
        setCountTotal(proposals.length);
        let listSent = proposals.filter(proposal => proposal.status !== null && proposal.status ==='Sent')
        setCountSent(listSent.length);
        let listApproved = proposals.filter(proposal => proposal.status !== null && proposal.status ==='approved')
        setCountApproved(listApproved.length);
        let listDeclined = proposals.filter(proposal => proposal.status !== null && proposal.status ==='declined')
        setCountDeclined(listDeclined.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Row justify={'space-between'} gutter={[40,40]} style={{ padding: '5px 20px 20px' }}>
      <Col span={24} sm={{span: 6}}>
       <Card style={{ padding: 20, borderRadius: 20, backgroundColor: color.colorLightGray, minHeight: 155 }}>
          <Row align={'middle'} gutter={[0,10]} style={{ flexDirection: 'column'}}>
            <Col>
              <User color={color.colorBlack} size={'50'} />
            </Col>
            <Col>
              <Typography.Title level={5} style={{margin: 0, textAlign:'center'}}>{countTotal} người phù hợp với mô tả công việc</Typography.Title>
            </Col>
          </Row>
       </Card>
      </Col>
      <Col span={24} sm={{span: 6}}>
        <Card style={{ padding: 20, borderRadius: 20, backgroundColor: color.colorLightGray, minHeight: 155 }}>
          <Row align={'middle'} gutter={[0,10]} style={{ flexDirection: 'column' }}>
            <Col>
              <User color={color.colorBlack} size={'50'} />
            </Col>
            <Col>
              <Typography.Title level={5} style={{margin: 0, textAlign:'center'}}>{countSent} người đã ứng tuyển</Typography.Title>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24} sm={{span: 6}}>
        <Card style={{ padding: 20, borderRadius: 20, backgroundColor: color.colorLightGray, minHeight: 155 }}>
          <Row align={'middle'} gutter={[0,10]} style={{ flexDirection: 'column' }}>
            <Col>
              <User color={color.colorBlack} size={'50'} />
            </Col>
            <Col>
              <Typography.Title level={5} style={{margin: 0, textAlign:'center'}}>{countDeclined} người được phỏng vấn</Typography.Title>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24} sm={{span: 6}}>
        <Card style={{ padding: 20, borderRadius: 20, backgroundColor: color.colorLightGray, minHeight: 155 }}>
          <Row align={'middle'} gutter={[0,10]} style={{ flexDirection: 'column' }}>
            <Col>
              <User color={color.colorBlack} size={'50'} />
            </Col>
            <Col>
              <Typography.Title level={5} style={{margin: 0, textAlign:'center'}}>{countApproved} người được nhận việc</Typography.Title>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

const Proposals = () => {
  return (
    <>
      <CustomCard style={{ padding: 0, marginBottom: 20 }}>
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

export default Proposals;
