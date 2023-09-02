import React from 'react';
import { Layout } from 'antd';
import Section2 from './Section2';
import Section1 from './Section1';
import css from './jobDetail.module.css';

const JobDetail = () => {
  return (
    <Layout.Content className={css.containerBody} style={styles.containerBody}>
      <Section1 />
      {/* <Section2 /> */}
    </Layout.Content>
  );
};

const styles = {
  //Toàn trang
  containerBody: { maxWidth: 1080, margin: '0 auto' },
};

export default JobDetail;
