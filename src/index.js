import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './App';
import AntProvider from 'config/AntProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AntProvider>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </AntProvider>
);
