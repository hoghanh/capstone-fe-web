import {  Layout } from 'antd'
import React, { useEffect } from 'react'
import ApplicationsTracking from './ApplicationsTracking'
import { useRecoilState, useRecoilValue } from 'recoil';
import { get } from 'utils/APICaller';
import { authState, applicationListState } from 'recoil/atom';




const Applications = () => {
  const [, setApplications] = useRecoilState(applicationListState);
  const auth = useRecoilValue(authState);

  useEffect(() => {
    getFreelancer();
  },[]);

  const getFreelancer = async () => {
    await get({ endpoint: `/freelancer/profile/${auth.id}` })
      .then((response) => {
        const data = response.data;
        getApplications(data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getApplications = async (freelancerId) => {
    await get({ endpoint: `/application/freelancer/${freelancerId}` })
      .then((response) => {
        const data = response.data;
        let applications = data.filter(application => application.jobId !== null && application.jobs !== null)
        setApplications(applications);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  return (
    <>
    <Layout.Content className={'containerBody'} style={styles.containerBody}>
      <ApplicationsTracking/>
    </Layout.Content>
  </>
  )
}

const styles = {
  containerBody:  { maxWidth: 1080, margin: '40px auto 0', },
}



export default Applications;