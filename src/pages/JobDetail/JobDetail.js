import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import Details from './Details';
import { get } from 'utils/APICaller';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState, jobDetailState } from 'recoil/atom';
import { useParams } from 'react-router-dom';

const JobDetail = () => {
  const [jobDetail, setJobDetail] = useRecoilState(jobDetailState);
  const auth = useRecoilValue(authState);
  console.log(auth.role)
  let { id } = useParams();
  useEffect(() => {
    getJobDetail();
  }, []);
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
    </Layout.Content>
  );
};

const styles = {
  //Toàn trang
  containerBody: { maxWidth: 1080, margin: '0 auto' },
};

export default JobDetail;
