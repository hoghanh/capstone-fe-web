import {  Layout } from 'antd'
import React, { useEffect } from 'react'
import ProposalsTracking from './ProposalsTracking'
import { useRecoilState, useRecoilValue } from 'recoil';
import { get } from 'utils/APICaller';
import { authState, proposalListState } from 'recoil/atom';




const Proposals = () => {
  const [, setProposals] = useRecoilState(proposalListState);
  const auth = useRecoilValue(authState);

  useEffect(() => {
    getFreelancer();
  },[]);

  const getFreelancer = async () => {
    await get({ endpoint: `/freelancer/profile/${auth.id}` })
      .then((response) => {
        const data = response.data;
        getProposals(data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProposals = async (freelancerId) => {
    await get({ endpoint: `/proposal/freelancer/${freelancerId}` })
      .then((response) => {
        const data = response.data;
        let proposals = data.filter(proposal => proposal.jobId !== null && proposal.jobs !== null)
        setProposals(proposals);
      })
      .catch((error) => {
        console.log(error);
      });
  };



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