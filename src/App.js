import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { gapi } from 'gapi-script';
import { io } from 'socket.io-client';

import Router from './routes/router';
import useAuthActions from 'recoil/action';
import './App.css';
import { CLIENTID, FPTSEP } from 'config';
import Loading from 'components/loading/loading';
import { useRecoilValue } from 'recoil';
import { authState } from 'recoil/atom';
import socket from 'config';

function App() {
  const { autoLogin } = useAuthActions();
  const [isLoading, setIsLoading] = useState(true);

  const auth = useRecoilValue(authState);

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
    if (auth.email) {
      socket?.emit('newUser', auth.email);
      socket.on('getNotification', (data) => {
        console.log('Received notification:', data.notification);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [auth]);

  return (
    <React.Fragment>
      <BrowserRouter>{isLoading ? <Loading /> : <Router />}</BrowserRouter>
    </React.Fragment>
  );
}

export default App;
