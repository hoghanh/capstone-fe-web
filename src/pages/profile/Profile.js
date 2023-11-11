import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { get } from "utils/APICaller";
import Overview from "./Overview";
import Certificates from "./Certificates";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  applicationListState,
  authState,
  freelancerState,
} from "recoil/atom";

const Profile = () => {
  const [, setFreelancer] = useRecoilState(freelancerState);
  const [, setApplications] = useRecoilState(applicationListState);

  const auth = useRecoilValue(authState);

  useEffect(() => {
    getFreelancer();
  }, []);

  const getFreelancer = () => {
    get({ endpoint: `/freelancer/profile/${auth.id}` })
      .then((response) => {
        const data = response.data;
        setFreelancer(data);
        getApplications(data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getApplications = (freelancerId) => {
    get({ endpoint: `/application/freelancer/${freelancerId}` })
      .then((response) => {
        const data = response.data;
        let applications = data.filter(application => application.status === 'approved')
        setApplications(applications);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Layout.Content className={"containerBody"} style={styles.containerBody}>
        <Overview />
        <Certificates />
      </Layout.Content>
    </>
  );
};

const styles = {
  containerBody: { maxWidth: 1080, margin: "40px auto 0" },
};

export default Profile;
