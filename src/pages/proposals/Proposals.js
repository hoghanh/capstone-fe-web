import {  Layout } from 'antd'
import React from 'react'
import ProposalsTracking from './ProposalsTracking'




const Proposals = () => {
  return (
    <>
    <Layout.Content className={'containerBody'} style={styles.containerBody}>
      <ProposalsTracking/>
    </Layout.Content>
  </>
  )
}

const styles = {
  containerBody:  { maxWidth: 1080, margin: '40px auto 0', },
}



export default Proposals;