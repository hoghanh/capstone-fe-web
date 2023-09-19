import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import Details from './Details';
import Proposal from './Proposal';
import { get } from 'utils/APICaller';
import { useRecoilState } from 'recoil';
import { jobDetailState } from 'recoil/atom';
import { useParams } from 'react-router-dom';

const JobDetail = () => {
  const [jobDetail, setJobDetail] = useRecoilState(jobDetailState);
  let { id } = useParams();
  useEffect(() => {
    getJobDetail();
  }, [])
  
  console.log(id)
  const getJobDetail = async () => {
    await get({ endpoint: `/job/detail/${id}` })
      .then((response) => {
        const data = response.data;
        setJobDetail(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout.Content className={'containerBody'} style={styles.containerBody}>
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
