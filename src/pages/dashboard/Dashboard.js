import React from 'react';
import { Typography, Card, Grid, Layout, Row, Col } from 'antd';
import Billing from 'pages/billing/Billing';
import MeetingCalendar from 'pages/schedule/MeetingCalendar';
import { Link, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const { useBreakpoint } = Grid;
  const { md } = useBreakpoint();
  const { pathname } = useLocation();
  const page = pathname.replace('/', '');

  return (
    <>
      <Layout.Content
        style={{
          maxWidth: 1080,
          margin: '0 auto',
        }}
        className='schedule-interview'
      >
        <Row>
          <Col sm={24} md={12}>
            <Card
              bodyStyle={{ padding: 'unset' }}
              style={{
                boxShadow: '2px 6px 4px 0px rgba(0, 0, 0, 0.25)',
                marginBottom: 30,
              }}
              className='card-jobs'
              headStyle={{ paddingLeft: 0 }}
              title={
                <div className='trackingJobs'>
                  <Typography.Title
                    level={md ? 3 : 5}
                    style={{ paddingLeft: 30 }}
                  >
                    Lịch phỏng vấn
                  </Typography.Title>
                </div>
              }
              extra={
                page === 'client/schedule' ? '' : <Link>Xem chi tiết</Link>
              }
            >
              <MeetingCalendar />
            </Card>
          </Col>
          <Col sm={24} md={12}>
            <Card
              style={{
                height: 595,
                overflowY: 'auto',
                background: 'none',
              }}
            >
              <Billing />
            </Card>
          </Col>
        </Row>
      </Layout.Content>
    </>
  );
};

export default Dashboard;
