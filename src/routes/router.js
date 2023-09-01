import React, { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HeaderFooter from 'layout/defaultLayout/HeaderFooter';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { Spin } from 'antd';

const routes = [
  {
    path: '/',
    element: lazy(() => import('pages/home/HomePage')),
    name: 'home',
  },
  {
    path: '/jobs',
    element: lazy(() => import('pages/joblist/JobList')),
    name: 'jobs',
  },

  {
    path: '/job-detail',
    element: lazy(() => import('pages/jobdetail/JobDetail')),
    name: 'jobdetail',
  },

  {
    path: '/profile',
    element: lazy(() => import('pages/profile/Profile')),
    name: 'profile',
    role: ['client', 'admin', 'user'],
  },

  {
    path: '/job-management',
    element: lazy(() => import('pages/jobmanagement/JobManagement')),
    name: 'jobmanagement',
    role: ['client'],
  },
];

const Router = () => (
  <Suspense fallback={<Spin />}>
    <HeaderFooter>
      <Routes>
        {routes.map(({ path, element, name, role }) => (
          <Route
            key={path}
            path={path}
            element={
              role ? (
                <PrivateRoute element={element} allowedRoles={role} />
              ) : (
                <PublicRoute element={element} />
              )
            }
          />
        ))}
      </Routes>
    </HeaderFooter>
  </Suspense>
);

export default Router;
