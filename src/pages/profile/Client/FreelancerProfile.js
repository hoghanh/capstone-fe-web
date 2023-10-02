import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { profileState } from 'recoil/atom';
import Overview from './Overview';
import Certificates from './Certificates';
import { get } from 'utils/APICaller';

const FreelancerProfile = () => {
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
  return (
    <>
      <div className={'containerBody'} style={styles.containerBody}>
        <Overview />
        <Certificates />
      </div>
    </>
  );
};

const styles = {
  containerBody: { maxWidth: 1080, margin: '40px auto 0' },
};
  

export default FreelancerProfile