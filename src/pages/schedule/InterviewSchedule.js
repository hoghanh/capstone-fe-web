import {
  Badge,
  Calendar,
  Card,
  Col,
  Grid,
  Layout,
  Row,
  Typography,
} from 'antd';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import joblist from 'styles/joblist';
import LocalStorageUtils from 'utils/LocalStorageUtils';

const InterviewSchedule = () => {
  const { useBreakpoint } = Grid;
  const { sm, md, lg, xl } = useBreakpoint();

  const clientId = LocalStorageUtils.getItem('profile').id;

  const { pathname } = useLocation();
  const page = pathname.replace('/', '');

  return (
    <>
      <Layout.Content style={{ maxWidth: 1080, margin: '0 auto' }}>
        <Card
          bodyStyle={{ padding: 'unset' }}
          style={joblist.card}
          className='card-jobs'
          headStyle={{ paddingLeft: 0 }}
          title={
            <div className='trackingJobs'>
              <Typography.Title level={md ? 3 : 5} style={{ paddingLeft: 30 }}>
                Lịch phỏng vấn
              </Typography.Title>
            </div>
          }
          extra={page === 'client/schedule' ? '' : <Link>Xem chi tiết</Link>}
        >
          <Row>
            <Col xs={24} md={12}>
              <Calendar mode='month' />;
            </Col>
            <Col xs={24} md={12}></Col>
          </Row>
        </Card>
      </Layout.Content>
    </>
  );
};

export default InterviewSchedule;
