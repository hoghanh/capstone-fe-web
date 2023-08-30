import {  Layout } from 'antd'
import React, { useEffect, useState } from 'react'
import Section1 from './Section1'
import Section2 from './Section2'
import { get } from 'utils/APICaller';



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
      <Section1 information={information}/>
      <Section2/>
    </Layout.Content>
  </>
  )
}

const styles = {
  container:  { maxWidth: 1080, margin: '40px auto 0', },
}



export default Profile