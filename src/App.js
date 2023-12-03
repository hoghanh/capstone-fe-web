import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { gapi } from 'gapi-script';

import Router from './routes/router';
import useAuthActions from 'recoil/action';
import Loading from 'components/loading/loading';
import { get } from 'utils/APICaller';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authState, clientProfile } from 'recoil/atom';
import { CLIENTID } from 'config';

import './App.css';

function App() {
  const { autoLogin } = useAuthActions();
  const [isLoading, setIsLoading] = useState(true);

  const auth = useRecoilValue(authState);
  const setUser = useSetRecoilState(clientProfile);

  useEffect(() => {
    setIsLoading(true);
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
    if (auth.id) {
      fetchProfile(auth);
    }
    setIsLoading(false);
    gapi.load('client:auth2', start);
  }, []);

  useEffect(() => {
    if (auth.id) {
      fetchProfile(auth);
    }
  }, [auth]);

  function fetchProfile(auth) {
    setIsLoading(true);
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
