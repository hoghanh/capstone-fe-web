import {  Layout } from 'antd'
import React, { useEffect, useState } from 'react'
import { get } from 'utils/APICaller';
import Overview from './Overview';
import Certificates from './Certificates';



const Profile = () => {

  return (
    <>
    <Layout.Content className={'containerBody'} style={styles.containerBody}>
      <Overview/>
      <Certificates/>
    </Layout.Content>
  </>
  )
}

const styles = {
  containerBody:  { maxWidth: 1080, margin: '40px auto 0', },
}



export default Profile