import {  Layout } from 'antd'
import React, { useEffect, useState } from 'react'
import Section1 from './Section1'




const Proposals = () => {
  
  return (
    <>
    <Layout.Content style={styles.container}>
      <Section1/>
    </Layout.Content>
  </>
  )
}

const styles = {
  container:  { maxWidth: 1080, margin: '40px auto 0', },
}



export default Proposals;