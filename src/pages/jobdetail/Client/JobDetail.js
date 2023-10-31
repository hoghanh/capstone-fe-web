import React, { useEffect } from 'react';
import { Layout } from 'antd';
import Details from './Details';
import { get } from 'utils/APICaller';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState, clientProfile, jobDetailState } from 'recoil/atom';
import { useParams } from 'react-router-dom';
import Proposal from './Proposal';

const JobDetail = () => {
  const [, setJobDetail] = useRecoilState(jobDetailState);
  const [, setClient] = useRecoilState(clientProfile);
  const auth = useRecoilValue(authState);
  let { id } = useParams();
  useEffect(() => {
    getJobDetail();
    getClient();
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

  const getClient = async () => {
    await get({ endpoint: `/client/profile/${auth.id}` })
      .then((response) => {
        const data = response.data;
        setClient(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout.Content className={'containerBody'} style={styles.containerBody}>
      <Details />
      <Proposal/>
    </Layout.Content>
  );
};

const styles = {
  //Toàn trang
  containerBody: { maxWidth: 1080, margin: '0 auto' },
};

export default JobDetail;
