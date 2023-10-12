import { Layout } from 'antd';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { get } from 'utils/APICaller';
import { proposalListState } from 'recoil/atom';
import { useParams } from 'react-router-dom';
import ProposalsTracking from './ProposalsTracking';

const Proposals = () => {
  const [proposals, setProposals] = useRecoilState(proposalListState);
  const { id } = useParams();
  useEffect(() => {
    getProposals();
  }, []);

  const getProposals = async () => {
    get({ endpoint: `/proposal/job/${id}` })
      .then((response) => {
        const data = response.data;
        // let proposals = data.filter((proposal) => proposal.jobId !== null && proposal.jobs !== null);
        console.log(data)
        setProposals(data);
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
