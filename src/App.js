import React from "react";
import { ConfigProvider } from "antd";
import "@fontsource/montserrat";
import "./App.css";
import Router from "./routes/router";
import { BrowserRouter } from "react-router-dom";

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
        fontFamily: "Montserrat, sans-serif",
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
