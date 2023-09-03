import {  Layout } from 'antd'
import React from 'react'
import ProposalsTracking from './ProposalsTracking'




const Proposals = () => {
  return (
    <>
    <Layout.Content style={styles.container}>
      <ProposalsTracking/>
    </Layout.Content>
  </>
  )
}

const styles = {
  container:  { maxWidth: 1080, margin: '40px auto 0', },
}



export default Proposals;