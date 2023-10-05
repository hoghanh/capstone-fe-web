import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { get } from 'utils/APICaller';
import Overview from './Overview';
import Certificates from './Certificates';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState, freelancerState, profileState } from 'recoil/atom';

const Profile = () => {
  const [informationUser, setInformationUser] = useRecoilState(profileState);
  const [freelancer, setFreelancer] = useRecoilState(freelancerState);
  const auth = useRecoilValue(authState);
  
  useEffect(() => {
    fetchProfile();
    getFreelancer();
  }, []);


  const fetchProfile = async () => {
    await get({ endpoint: `/accounts/profile/${auth.id}` })
      .then((response) => {
        const data = response.data;
        setInformationUser(data);
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
    <>
      <Layout.Content className={'containerBody'} style={styles.containerBody}>
        <Overview />
        <Certificates />
      </Layout.Content>
    </>
  );
};

const styles = {
  containerBody: { maxWidth: 1080, margin: '40px auto 0' },
};

export default Profile;
