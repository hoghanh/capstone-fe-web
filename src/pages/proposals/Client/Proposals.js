import { Layout } from 'antd';
import React, { useEffect } from 'react';
import ProposalsTracking from './ProposalsTracking';
import { useRecoilState } from 'recoil';
import { get } from 'utils/APICaller';
import { proposalListState } from 'recoil/atom';
import LocalStorageUtils from 'utils/LocalStorageUtils';

const Proposals = () => {
  const [, setProposals] = useRecoilState(proposalListState);
  const client= LocalStorageUtils.getItem('profile');

  useEffect(() => {
    getProposals();
  }, []);

  const getProposals = async () => {
    get({ endpoint: `/proposal/client/${client.id}` })
      .then((response) => {
        const data = response.data;
        let proposals = data.filter((proposal) => proposal.jobId !== null && proposal.jobs !== null);
        setProposals(proposals);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Layout.Content className={'containerBody'} style={styles.containerBody}>
        <ProposalsTracking />
      </Layout.Content>
    </>
  );
};

const styles = {
  containerBody: { maxWidth: 1080, margin: '40px auto 0' },
};

export default Proposals;
