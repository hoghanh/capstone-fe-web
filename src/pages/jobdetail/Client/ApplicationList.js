import { Layout } from 'antd';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { get } from 'utils/APICaller';
import { applicationListState } from 'recoil/atom';
import { useParams } from 'react-router-dom';
import ApplicationsTracking from './ApplicationsTracking';

const Applications = () => {
  const [applications, setApplications] = useRecoilState(applicationListState);
  const { id } = useParams();
  useEffect(() => {
    getApplications();
  }, []);
  const getApplications = () => {
    get({ endpoint: `/application/job/${id}` })
      .then((response) => {
        const data = response.data;
        setApplications(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Layout.Content className={'containerBody'} style={styles.containerBody}>
        <ApplicationsTracking />
      </Layout.Content>
    </>
  );
};

const styles = {
  containerBody: { maxWidth: 1080, margin: '40px auto 0' },
};

export default Applications;
