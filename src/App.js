import React from 'react';
import AntProvider from 'config/AntProvider';
import './App.css';
import Router from './routes/router';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { notification } from 'antd';

const App = () => {
  const [api, contextHolder] = notification.useNotification();
  return (
    <AntProvider>
      <React.Fragment>
        <RecoilRoot>
          <BrowserRouter>
            {contextHolder}
            <Router />
          </BrowserRouter>
        </RecoilRoot>
      </React.Fragment>
    </AntProvider>
  );
};

export default App;
