import { Layout } from 'antd';
import React, { useEffect } from 'react';
import { get } from 'utils/APICaller';
import Overview from './Overview';
import Certificates from './Certificates';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState, freelancerState, listSkillsState, profileState } from 'recoil/atom';

const Profile = () => {
  const [ ,setInformationUser] = useRecoilState(profileState);
  const [ ,setFreelancer] = useRecoilState(freelancerState);
  const [listSkills, setListSkill] = useRecoilState(listSkillsState);
  const auth = useRecoilValue(authState);
  
  console.log(listSkills)
  useEffect(() => {
    fetchProfile();
    getFreelancer();
    fetchSkills();
  },[]);


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

  const fetchSkills = async () => {
    await get({ endpoint: `/skill/` })
      .then((response) => {
        const data = response.data;
        setListSkill(data);
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
