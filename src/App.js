import React from 'react';
import AntProvider from 'config/AntProvider';
import './App.css';
import Router from './routes/router';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { notification } from 'antd';

function App() {
  const [api, contextHolder] = notification.useNotification();
  return (
    <AntProvider>
      <RecoilRoot>
        <React.Fragment>
          <BrowserRouter>
            {contextHolder}
            <Router />
          </BrowserRouter>
        </React.Fragment>
      </RecoilRoot>
    </AntProvider>
  );
}

export default App;
