import React from 'react';
import { ConfigProvider } from 'antd';
import '@fontsource/montserrat';
import '@fontsource/montserrat/700.css';
import './App.css';
import Router from './routes/router';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

const App = () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#02ADFD',
        fontFamily: 'Montserrat, sans-serif',
        fontSizeHeading1: 32,
        fontSizeHeading2: 24,
        fontSizeHeading3: 20,
        fontSizeHeading4: 18,
        fontSizeHeading5: 16,
      },
    }}
  >
    <React.Fragment>
      <RecoilRoot>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </RecoilRoot>
    </React.Fragment>
  </ConfigProvider>
);

export default App;
