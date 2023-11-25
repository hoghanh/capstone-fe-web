import React from 'react';
import InterviewSchedule from '../schedule/InterviewSchedule';
import { Row, Col } from 'antd';
import Billing from 'pages/billing/Billing';

const Dashboard = () => {
  return (
    <>
      <InterviewSchedule />
      <Billing />
    </>
  );
};

export default Dashboard;
