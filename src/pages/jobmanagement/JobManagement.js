import {  Layout } from 'antd'
import React, { useEffect, useState } from 'react'
import JobStatus from './JobStatus'
import ApplicationsStatus from './ApplicationsStatus'




const JobManagement = () => {
  
  return (
    <>
    <Layout.Content className={'containerBody'} style={styles.containerBody}>
      <JobStatus/>
      <ApplicationsStatus/>
    </Layout.Content>
  </>
  )
}

const styles = {
  containerBody:  { maxWidth: 1080, margin: '40px auto 0', },
}



export default JobManagement;