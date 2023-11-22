import React, { useEffect } from 'react';
import { Layout } from 'antd';
import Details from './Details';
import { get } from 'utils/APICaller';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authState, freelancerState, jobDetailState } from 'recoil/atom';
import { useParams } from 'react-router-dom';

const JobDetail = () => {
  const setJobDetail = useSetRecoilState(jobDetailState);
  const setFreelancer = useSetRecoilState(freelancerState);
  const auth = useRecoilValue(authState);
  let { id } = useParams();
  useEffect(() => {
    getJobDetail();
    getFreelancer();
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

  const getFreelancer = async () => {
    await get({ endpoint: `/freelancer/profile/${auth.id}` })
      .then((response) => {
        const data = response.data;
        setFreelancer(data);
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
  containerBody: { maxWidth: 1080, margin: '0 auto' },
};

export default JobDetail;
