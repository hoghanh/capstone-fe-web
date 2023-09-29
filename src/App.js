import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Router from './routes/router';
import useAuthActions from 'recoil/action';
import LocalStorageUtils from 'utils/LocalStorageUtils';
import './App.css';

function App() {
  const { autoLogin } = useAuthActions();
  const token = LocalStorageUtils.getToken;
  useEffect(() => {
    autoLogin();
  }, [token]);

  return (
    <React.Fragment>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
