import React from 'react';
import InterviewSchedule from '../schedule/InterviewSchedule';
import { Row, Col } from 'antd';
import Billing from 'pages/billing/Billing';

const Dashboard = () => {
  return (
    <Row>
      <Col span={12}>
        <InterviewSchedule />
      </Col>
      <Col span={12}>
        <Billing />
      </Col>
    </Row>
  );
};

export default Dashboard;
