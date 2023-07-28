import React from "react";
import Header from "../layout/header/Header";
import Footer from "../layout/footer/Footer";
import Banner1 from "../components/banner/Banner1";
import Banner2 from "../components/banner/Banner2";
import Banner3 from "../components/banner/Banner3";
import JobPopular from "../components/carousel/JobPopular";
import { Layout } from "antd";

const HomePage = () => {
  return (
    <>
      <Header />
      <Banner1 />
      <Layout.Content style={{ maxWidth: 1080, margin: "0 auto" }}>
        <JobPopular />
      </Layout.Content>

      <Banner2 />
      <Banner3 />
      <Footer />
    </>
  );
};

export default HomePage;
