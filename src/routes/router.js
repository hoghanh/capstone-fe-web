import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loading from '../components/loading/loading';

const routes = [
  {
    path: '/',
    component: lazy(() => import('../pages/HomePage')),
    name: 'home',
  },
  {
    path: '/jobs',
    component: lazy(() => import('../pages/JobList')),
    name: 'jobs',
  },
];

const Router = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      {routes.map(({ path, component: Component }) => (
        <Route key={path} path={path} element={<Component />} exact />
      ))}
    </Routes>
  </Suspense>
);

export default Router;
