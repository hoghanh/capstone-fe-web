import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loading from '../components/loading/loading';
import HeaderFooter from '../layout/defaultLayout/HeaderFooter';

const routes = [
  {
    path: '/',
    component: lazy(() => import('../pages/Home/HomePage')),
    name: 'home',
  },
  {
    path: '/jobs',
    component: lazy(() => import('../pages/JobList')),
    name: 'jobs',
  },
  {
    path: "/jobDetail",
    component: lazy(() => import("../pages/JobDetail")),
    name: "jobDetail",
  },
];

const Router = () => (
  <Suspense fallback={<Loading />}>
    <HeaderFooter>
      <Routes>
        {routes.map(({ path, component: Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}
      </Routes>
    </HeaderFooter>
  </Suspense>
);

export default Router;
