import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { get } from 'utils/APICaller';
import Overview from './Overview';
import Certificates from './Certificates';
import { useRecoilState } from 'recoil';
import { profileState } from 'recoil/atom';

const Profile = () => {
  const [informationUser, setInformationUser] = useRecoilState(profileState);
  useEffect(() => {
    fetchProfile();
  }, []);
  const fetchProfile = async () => {
    await get({ endpoint: '/accounts/profile/8' })
      .then((response) => {
        const data = response.data;
        setInformationUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(informationUser);
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
