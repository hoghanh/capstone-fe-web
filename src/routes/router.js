import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import HeaderFooter from 'layout/defaultLayout/HeaderFooter';
import Loading from 'components/loading/loading';

const routes = [
  {
    path: '/',
    component: lazy(() => import('pages/Home/HomePage')),
    name: 'home',
  },
  {
    path: "/jobs",
    component: lazy(() => import("pages/joblist/JobList")),
    name: "jobs",
  },

  {
    path: "/job-detail",
    component: lazy(() => import("pages/JobDetail/JobDetail")),
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
    path: "/job-detail",
    component: lazy(() => import("pages/JobDetail/JobDetail")),
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
