import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import HeaderFooter from 'layout/defaultLayout/HeaderFooter';
import Loading from 'components/loading/loading';

const routes = [
  {
    path: '/',
    component: lazy(() => import('pages/home/HomePage')),
    name: 'home',
  },
  {
    path: "/jobs",
    component: lazy(() => import("pages/joblist/JobList")),
    name: "jobs",
  },

  {
    path: "/job-detail",
    component: lazy(() => import("pages/jobdetail/JobDetail")),
    name: "jobDetail",
  },

  {
    path: "/profile",
    component: lazy(() => import("pages/profile/Profile")),
    name: "jobDetail",
  },

];

const breadcrumbroutes = [
  {
    path: "/jobs",
    component: lazy(() => import("pages/joblist/JobList")),
    name: "jobs",
  },
  {
    path: "/jobDetail",
    component: lazy(() => import("pages/jobdetail/JobDetail")),
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
