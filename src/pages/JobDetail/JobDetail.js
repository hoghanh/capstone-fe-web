import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import css from './jobDetail.module.css';
import Details from './Details';
import Proposal from './Proposal';
import { get } from 'utils/APICaller';

const JobDetail = () => {
  const [jobDetail, setJobDetail] = useState('');

  useEffect(() => {
    getJobDetail();
  }, [])
  
  const getJobDetail = async () => {
    await get({ endpoint: "/job/detail/3" })
      .then((response) => {
        const data = response.data;
        setJobDetail(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout.Content className={css.containerBody} style={styles.containerBody}>
      <Details jobDetail={jobDetail} />
      <Proposal />
    </Layout.Content>
  );
};

const styles = {
  //Toàn trang
  containerBody: { maxWidth: 1080, margin: '0 auto' },
};

export default JobDetail;
