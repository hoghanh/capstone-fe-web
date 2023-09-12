import React, { useEffect } from 'react';
import Router from './routes/router';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { notification } from 'antd';
import { gapi } from 'gapi-script';

import AntProvider from 'config/AntProvider';
import { AppProvider } from 'context/AppContext';
import { useAuthActions } from './recoil/auth';

import './App.css';
import { CLIENTID } from 'config';

function App() {
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    function start() {
      gapi.client.init({
        client_id: CLIENTID,
        scope: '',
      });
    }

    gapi.load('client:auth2', start);
  });

  // const { autoLogin } = useAuthActions();
  // autoLogin();

  return (
    <AntProvider>
      <RecoilRoot>
        <React.Fragment>
          <AppProvider>
            <BrowserRouter>
              {contextHolder}
              <Router />
            </BrowserRouter>
          </AppProvider>
        </React.Fragment>
      </RecoilRoot>
    </AntProvider>
  );
}

export default App;
