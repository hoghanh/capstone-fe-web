import {  Layout } from 'antd'
import React from 'react'
import Section1 from './Section1'
import Section2 from './Section2'

const Profile = () => {
  return (
    <>
    <Layout.Content style={styles.container}>
      <Section1/>
      <Section2/>
    </Layout.Content>
  </>
  )
}

const styles = {
  container:  { maxWidth: 1080, margin: '40px auto 0', },
}



export default Profile