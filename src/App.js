import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { gapi } from 'gapi-script';

import Router from './routes/router';
import useAuthActions from 'recoil/action';
import LocalStorageUtils from 'utils/LocalStorageUtils';
import './App.css';
import { CLIENTID } from 'config';

function App() {
  const { autoLogin } = useAuthActions();
  const token = LocalStorageUtils.getToken;
  useEffect(() => {
    autoLogin();
    function start() {
      gapi.auth2
        .init({
          client_id: CLIENTID,
          scope: '',
        })
        .then(() => {
          gapi.auth2.getAuthInstance();
        })
        .catch((error) => {
          console.error('Không thể khởi tạo gapi.auth2:', error);
        });
    }

    gapi.load('client:auth2', start);
  }, []);

  return (
    <React.Fragment>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
