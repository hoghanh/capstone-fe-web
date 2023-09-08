import {  Layout } from 'antd'
import React, { useEffect, useState } from 'react'
import { get } from 'utils/APICaller';
import Overview from './Overview';
import Certificates from './Certificates';



const Profile = () => {

  return (
    <>
    <Layout.Content style={styles.container}>
      <Overview/>
      <Certificates/>
    </Layout.Content>
  </>
  )
}

const styles = {
  container:  { maxWidth: 1080, margin: '40px auto 0', },
}



export default Profile