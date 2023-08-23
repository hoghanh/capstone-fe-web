import React from "react";
import { ConfigProvider } from "antd";
import "@fontsource/montserrat";
import "@fontsource/montserrat/700.css";
import "./App.css";
import Router from "./routes/router";
import { BrowserRouter } from "react-router-dom";

const App = () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#02ADFD",
        fontFamily: "Montserrat, sans-serif",
        fontSizeHeading1: 32,
        fontSizeHeading2: 24,
        fontSizeHeading3: 20,
        fontSizeHeading4: 18,
        fontSizeHeading5: 16,
        // size Screen
        screenSM: 576,
        screenMD: 768,
        screenLG: 992,
        screenXL: 1200,
        screenXXL: 1600,
      },
    }}
  >
    <React.Fragment>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </React.Fragment>
  </ConfigProvider>
);

export default App;
