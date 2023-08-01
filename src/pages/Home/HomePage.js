import React from 'react';
import Banner1 from './Banner1';
import Banner2 from './Banner2';
import Banner3 from './Banner3';
import JobPopular from './JobPopular';
import { Layout } from 'antd';

const HomePage = () => {
  return (
    <>
      <Banner1 />
      <Layout.Content style={{ maxWidth: 1080, margin: '0 auto' }}>
        <JobPopular />
      </Layout.Content>
      <Banner2 />
      <Banner3 />
    </>
  );
};

export default HomePage;
