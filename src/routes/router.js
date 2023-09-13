import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Route, Routes } from 'react-router-dom';
import { HomeFilled } from '@ant-design/icons';
import AdminLayout from 'layout/defaultLayout/AdminLayout';
import UserLayout from 'layout/defaultLayout/UserLayout';
import BreadcrumbAdmin from 'layout/breadcrumbLayout/BreadCrumbAdmin';
import BreadcrumbUser from 'layout/breadcrumbLayout/BreadCrumbUser';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { useRecoilValue } from 'recoil';
import authAtom from 'recoil/auth/atom';

export const routes = [
  {
    path: '/',
    element: lazy(() => import('pages/home/HomePage')),
    name: 'home',
    title: <HomeFilled />,
  },
  {
    path: '/jobs',
    element: lazy(() => import('pages/joblist/JobList')),
    name: 'jobs',
    layout: 'breadcrumb',
    title: 'Tìm công việc freelance',
  },
  {
    path: '/job-detail',
    element: lazy(() => import('pages/jobdetail/JobDetail')),
    name: 'jobdetail',
    layout: 'breadcrumb',
    title: 'Chi tiết dự án',
  },

  {
    path: '/profile',
    element: lazy(() => import('pages/profile/Profile')),
    name: 'profile',
    // role: ['user'],
  },
  {
    path: '/client',
    children: [
      {
        path: '/profile',
        element: lazy(() => import('pages/profile/Profile')),
        name: 'profile',
        role: ['client'],
      },
    ],
  },

  {
    path: '/job-management',
    element: lazy(() => import('pages/jobmanagement/JobManagement')),
    name: 'jobmanagement',
    // role: ['client'],
  },

  {
    path: '/proposals',
    element: lazy(() => import('pages/proposals/Proposals')),
    name: 'jobmanagement',
    // role: ['client'],
  },

];

const breadcrumbroutes = [
  {
    path: '/job-management',
    element: lazy(() => import('pages/jobmanagement/JobManagement')),
    name: 'jobmanagement',
    // role: ['client'],
  },
  
  {
    path: '/proposals',
    element: lazy(() => import('pages/proposals/Proposals')),
    name: 'jobmanagement',
    // role: ['client'],
  },
];

const Router = () => {
  const auth = useRecoilValue(authAtom);
  return (
    <Suspense fallback={<Spin />}>
      <Routes>
        {routes.map(({ path, element, name, role, layout }) => (
          <Route
            key={path}
            element={
              auth.role === 'client' || auth.role === 'admin' ? (
                layout === 'breadcrumb' ? (
                  <BreadcrumbAdmin />
                ) : (
                  <AdminLayout />
                )
              ) : layout === 'breadcrumb' ? (
                <BreadcrumbUser />
              ) : (
                <UserLayout />
              )
            }
          >
            <Route
              path={path}
              element={
                role ? (
                  <PrivateRoute element={element} allowedRoles={role} />
                ) : (
                  <PublicRoute element={element} />
                )
              }
            />
          </Route>
        ))}
      </Routes>
    </Suspense>
  );
};

export default Router;
