import React from "react";
import Header from "../layout/header/Header";
import Footer from "../layout/footer/Footer";
import Banner1 from "../components/banner/Banner1";
import Banner2 from "../components/banner/Banner2";

const LandingPage = () => {
  return (
    <>
      <Header />
      <Banner1 />
      <Banner2 />
      <Footer />
    </>
  );
};

export default LandingPage;
