import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import Details from "./Details";
import { get } from "utils/APICaller";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState, freelancerState, jobDetailState } from "recoil/atom";
import { useParams } from "react-router-dom";

const JobDetail = () => {
  const [, setJobDetail] = useRecoilState(jobDetailState);
  const [, setFreelancer] = useRecoilState(freelancerState);
  const [ status, setStatus] = useState(false);
  const auth = useRecoilValue(authState);
  let { id } = useParams();

  useEffect(() => {
    getJobDetail();
    getFreelancer();
  }, []);

  const getJobDetail = () => {
    get({ endpoint: `/job/detail/${id}` })
      .then((response) => {
        const data = response.data;
        setJobDetail(data);
        let item = data.applications.find((item) => item.freelancers.accountId === auth.id);
        if (!data.applications.length) {
          item = false;
        }
        return setStatus(item ? true : false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFreelancer = () => {
    get({ endpoint: `/freelancer/profile/${auth.id}` })
      .then((response) => {
        const data = response.data;
        setFreelancer(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout.Content className={"containerBody"} style={styles.containerBody}>
      <Details status={status}  setStatus={setStatus}/>
    </Layout.Content>
  );
};

const styles = {
  containerBody: { maxWidth: 1080, margin: "0 auto" },
};

export default JobDetail;
