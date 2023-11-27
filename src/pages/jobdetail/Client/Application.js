import { Card, Col, Row, Typography } from 'antd';
import { CustomCard, CustomCol, CustomRow } from 'components/customize/Layout';
import { User } from 'components/icon/Icon';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import color from 'styles/color';
import { get } from 'utils/APICaller';

// Header section
const HeaderSection = () => {
  const { id } = useParams();
  return (
    <Row justify={'space-between'} style={{ padding: 25 }}>
      <CustomCol>
        <Typography.Title level={3} style={styles.titleHeader}>
          Danh sách ứng tuyển
        </Typography.Title>
      </CustomCol>
      <CustomCol>
        <Link to={`/client/jobs-management/job-detail/${id}/applications`}>
          <Typography.Title
            level={3}
            style={{ color: color.colorPrimary, margin: 0 }}
          >
            Xem chi tiết
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
  const [countInterview, setInterview] = useState(0);
  const [countApproved, setCountApproved] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    getApplications(id);
    console.log(id)
  }, [id]);

  const getApplications = (id) => {
    get({ endpoint: `/application/job/${id}` })
      .then((response) => {
        let applications = response.data;
        setCountTotal(applications.length);
        let listSent = applications.filter(
          (application) =>
            application.freelancers.applications[0].status !== null && application.freelancers.applications[0].status === 'sent'
        );
        setCountSent(listSent.length);
        let listInterview = applications.filter(
          (application) =>
          application.freelancers.applications[0].status !== null && application.freelancers.applications[0].status === 'interview'
        );
        setInterview(listInterview.length);
        let listApproved = applications.filter(
          (application) =>
          application.freelancers.applications[0].status !== null && application.freelancers.applications[0].status === 'approved'
        );
        setCountApproved(listApproved.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Row
      justify={'space-between'}
      gutter={[40, 40]}
      style={{ padding: '5px 20px 20px' }}
    >
      <Col span={24} sm={{ span: 8 }}>
        <Card
          style={{
            padding: 20,
            borderRadius: 20,
            backgroundColor: color.colorLightGray,
            minHeight: 155,
          }}
        >
          <Row
            align={'middle'}
            gutter={[0, 10]}
            style={{ flexDirection: 'column' }}
          >
            <Col>
              <User color={color.colorBlack} size={'50'} />
            </Col>
            <Col>
              <Typography.Title
                level={5}
                style={{ margin: 0, textAlign: 'center' }}
              >
                Ứng tuyển: {countSent}
              </Typography.Title>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24} sm={{ span: 8 }}>
        <Card
          style={{
            padding: 20,
            borderRadius: 20,
            backgroundColor: color.colorLightGray,
            minHeight: 155,
          }}
        >
          <Row
            align={'middle'}
            gutter={[0, 10]}
            style={{ flexDirection: 'column' }}
          >
            <Col>
              <User color={color.colorBlack} size={'50'} />
            </Col>
            <Col>
              <Typography.Title
                level={5}
                style={{ margin: 0, textAlign: 'center' }}
              >
                Phỏng vấn: {countInterview}
              </Typography.Title>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24} sm={{ span: 8 }}>
        <Card
          style={{
            padding: 20,
            borderRadius: 20,
            backgroundColor: color.colorLightGray,
            minHeight: 155,
          }}
        >
          <Row
            align={'middle'}
            gutter={[0, 10]}
            style={{ flexDirection: 'column' }}
          >
            <Col>
              <User color={color.colorBlack} size={'50'} />
            </Col>
            <Col>
              <Typography.Title
                level={5}
                style={{ margin: 0, textAlign: 'center' }}
              >
                Nhận việc: {countApproved}
              </Typography.Title>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

const Applications = () => {
  return (
    <>
      <CustomCard style={{ padding: 0, marginBottom: 20 }}>
        <HeaderSection />
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

export default Applications;
