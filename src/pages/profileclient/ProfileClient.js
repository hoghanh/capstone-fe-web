import {  Layout } from 'antd'
import React from 'react'
import Overview from './Overview';
import ListPosts from './ListPosts.js';

const ProfileClient = () => {

  return (
    <>
    <Layout.Content className={'containerBody'} style={styles.containerBody}>
      <Overview/>
      <ListPosts/>
    </Layout.Content>
  </>
  )
}

const styles = {
  containerBody:  { maxWidth: 1080, margin: '40px auto 0', },
}



export default ProfileClient;