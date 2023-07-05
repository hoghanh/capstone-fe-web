import React from "react";
import { ConfigProvider } from "antd";

import Header from "./layout/header/Header";
import Footer from "./layout/footer/Footer";
import DefaultBanner from "./components/banner/DefaultBanner";

import "@fontsource/montserrat";
import "./App.css";

const App = () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#02ADFD",
        colorBlueWhale: "#013042",
        colorTurquoise: "#70DBFF",
        colorBluishCyan: "#89DBE9",
        colorPaleBlueSky: "#CDF1FD",
        colorAliceBlue: "#EDF6FF",
        fontFamily: "Montserrat",
      },
    }}
  >
    <Header />
    <DefaultBanner />
    <Footer />
  </ConfigProvider>
);

export default App;
