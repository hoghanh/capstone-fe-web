import { Layout } from 'antd';
import React, { useEffect } from 'react';
import ApplicationsTracking from './ApplicationsTracking';
import { useRecoilState } from 'recoil';
import { get } from 'utils/APICaller';
import { applicationListState } from 'recoil/atom';
import LocalStorageUtils from 'utils/LocalStorageUtils';

const Applications = () => {
  const [, setApplications] = useRecoilState(applicationListState);
  const client= LocalStorageUtils.getItem('profile');

  useEffect(() => {
    getApplications();
  }, []);

  const getApplications = async () => {
    get({ endpoint: `/application/client/${client.id}` })
      .then((response) => {
        const data = response.data;
        let applications = data.filter((application) => application.jobId !== null && application.jobs !== null);
        setApplications(applications);
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