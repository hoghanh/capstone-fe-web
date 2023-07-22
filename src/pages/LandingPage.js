import React from "react";
import Header from "../layout/header/Header";
import Footer from "../layout/footer/Footer";
import Banner1 from "../components/banner/Banner1";
import Banner2 from "../components/banner/Banner2";
import Banner3 from "../components/banner/Banner3";
import JobPopular from "../components/carousel/JobPopular";
import { Layout } from "antd";

const LandingPage = () => {
  return (
    <>
      <Header />
      <Layout.Content style={{ maxWidth: 1400, margin: "0 auto" }}>
        <Banner1 />
        <JobPopular />
        <Banner2 />
        <Banner3 />
      </Layout.Content>
      <Footer />
    </>
  );
};

export default LandingPage;
