import {  Layout } from 'antd'
import React, { useEffect, useState } from 'react'
import { get } from 'utils/APICaller';
import Overview from './Overview';
import Certificates from './Certificates';



const Profile = () => {
  const [information, setInformation] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    await get({ endpoint: "/accounts/profile/1" })
      .then((response) => {
        const data = response.data;
        // console.log(data);
        setInformation(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
  return (
    <>
    <Layout.Content style={styles.container}>
      <Overview information={information}/>
      <Certificates/>
    </Layout.Content>
  </>
  )
}

const styles = {
  container:  { maxWidth: 1080, margin: '40px auto 0', },
}



export default Profile