import {  Layout } from 'antd'
import React, { useEffect } from 'react'
import ApplicationsTracking from './ApplicationsTracking'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { get } from 'utils/APICaller';
import { authState, applicationListState, freelancerState } from 'recoil/atom';




const Applications = () => {
  const setApplications = useSetRecoilState(applicationListState);
  const setFreelancer = useSetRecoilState(freelancerState);
  const auth = useRecoilValue(authState);

  useEffect(() => {
    getFreelancer();
  },[]);

  const getFreelancer = () => {
    get({ endpoint: `/freelancer/profile/${auth.id}` })
      .then((response) => {
        const data = response.data;
        setFreelancer(data)
        getApplications(data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getApplications = (freelancerId) => {
    get({ endpoint: `/application/freelancer/${freelancerId}` })
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