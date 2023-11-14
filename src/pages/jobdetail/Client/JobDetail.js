import React, { useEffect } from 'react';
import { Layout, notification } from 'antd';
import Details from './Details';
import { get } from 'utils/APICaller';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState, clientProfile, jobDetailState } from 'recoil/atom';
import { useParams } from 'react-router-dom';
import Application from './Application';

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
        notification.error({
          message: error.response.data.message,
        });
      });
  };

  const getClient = async () => {
    await get({ endpoint: `/client/profile/${auth.id}` })
      .then((response) => {
        const data = response.data;
        setClient(data);
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  };

  return (
    <Layout.Content className={'containerBody'} style={styles.containerBody}>
      <Details />
      <Application/>
    </Layout.Content>
  );
};

const styles = {
  //Toàn trang
  containerBody: { maxWidth: 1080, margin: '0 auto' },
};

export default JobDetail;
