import React, { useEffect } from 'react';
import { Layout, notification } from 'antd';
import Details from './Details';
import { get } from 'utils/APICaller';
import { useSetRecoilState } from 'recoil';
import { jobDetailState } from 'recoil/atom';
import { useParams } from 'react-router-dom';
import Application from './Application';

const JobDetail = () => {
  const setJobDetail = useSetRecoilState(jobDetailState);
  let { id } = useParams();
  
  useEffect(() => {
    if(id){ getJobDetail(id); }
  }, [id]);

  const getJobDetail = (id) => {
    get({ endpoint: `/job/detail/${id}` })
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
