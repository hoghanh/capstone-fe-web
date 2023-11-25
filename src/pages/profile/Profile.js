import { Layout } from "antd";
import React, { useEffect } from "react";
import { get } from "utils/APICaller";
import Certificates from "./Certificates";
import {  useRecoilValue, useSetRecoilState } from "recoil";
import {
  applicationListState,
  authState,
  freelancerState,
} from "recoil/atom";
import Overview from "./Overview";
import { useParams } from "react-router-dom";

const Profile = () => {
  const setFreelancer = useSetRecoilState(freelancerState);
  const setApplications = useSetRecoilState(applicationListState);
  const { id, profileId } = useParams();

  const auth = useRecoilValue(authState);

  useEffect(() => {
    let freelancerId = '';
    if (auth.role === 'freelancer' && auth.id === profileId) {
      freelancerId = auth.id;
    } else if (auth.role === 'freelancer' && auth.id !== profileId) {
      freelancerId = profileId;
    } else if (auth.role === 'client') {
      freelancerId = id;
    }
    getFreelancer(freelancerId);
  }, [profileId, auth]);

  const getFreelancer = (freelancerId) => {
    get({ endpoint: `/freelancer/profile/${freelancerId}` })
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
        let applications = data.filter(
          (application) => application.status === "approved"
        );
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
