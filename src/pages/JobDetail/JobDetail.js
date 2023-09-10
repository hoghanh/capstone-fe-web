import React from 'react';
import { Layout } from 'antd';
import css from './jobDetail.module.css';
import Details from './Details';
import Proposal from './Proposal';

const JobDetail = () => {
  return (
    <Layout.Content className={css.containerBody} style={styles.containerBody}>
      <Details />
      <Proposal />
    </Layout.Content>
  );
};

const styles = {
  //Toàn trang
  containerBody: { maxWidth: 1080, margin: '0 auto' },
};

export default JobDetail;
