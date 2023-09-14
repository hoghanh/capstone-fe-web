import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Router from './routes/router';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
