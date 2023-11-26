import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { gapi } from 'gapi-script';
import { notification } from 'antd';

import Router from './routes/router';
import useAuthActions from 'recoil/action';
import Loading from 'components/loading/loading';
import { get } from 'utils/APICaller';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authState, clientProfile } from 'recoil/atom';
import socket, { CLIENTID } from 'config';

import './App.css';

function App() {
  const { autoLogin } = useAuthActions();
  const [isLoading, setIsLoading] = useState(true);

  const auth = useRecoilValue(authState);
  const setUser = useSetRecoilState(clientProfile);

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
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (auth.id) {
      fetchProfile();
    }
  }, [auth]);

  function fetchProfile() {
    get({ endpoint: `/client/profile/${auth.id}` })
      .then((response) => {
        setUser(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <React.Fragment>
      <BrowserRouter>{isLoading ? <Loading /> : <Router />}</BrowserRouter>
    </React.Fragment>
  );
}

export default App;
