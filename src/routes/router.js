import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Route, Routes } from 'react-router-dom';
import { HomeFilled } from '@ant-design/icons';
import UserLayout from 'layout/defaultLayout/UserLayout';
import ClientLayout from 'layout/defaultLayout/ClientLayout';
import BreadcrumbUser from 'layout/breadcrumbLayout/BreadCrumbUser';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { useRecoilValue } from 'recoil';
import { authState } from 'recoil/atom';

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
    path: '/jobs/:subCateId/:subCateName',
    element: lazy(() => import('pages/joblist/JobList')),
    name: 'jobs',
    layout: 'breadcrumb',
  },
  {
    path: '/jobs/job-detail',
    element: lazy(() => import('pages/jobdetail/JobDetail')),
    name: 'jobdetail',
    layout: 'breadcrumb',
    title: 'Chi tiết dự án',
  }, 
  {
    path: '/jobs/job-detail/:id',
    element: lazy(() => import('pages/jobdetail/JobDetail')),
    name: 'jobdetail',
    layout: 'breadcrumb',
  },

  {
    path: '/profile',
    element: lazy(() => import('pages/profile/Profile')),
    name: 'profile',
    // role: ['user'],
  },
  {
    path: '/client',
    element: lazy(() => import('layout/defaultLayout/ClientLayout')),
    name: 'client',
    role: ['client'],
  },
  {
    path: '/client/profile',
    element: lazy(() => import('pages/profile/ClientProfile')),
    name: 'profile',
    title: 'Hồ sơ cá nhân',
    role: ['client'],
  },
  {
    path: '/proposals',
    element: lazy(() => import('pages/proposals/Proposals')),
    name: 'proposals',
    // role: ['freelancer'],s
  },

  {
    path: '/job-management',
    element: lazy(() => import('pages/jobmanagement/JobManagement')),
    name: 'jobmanagement',
    // role: ['client'],
  },
  {
    path: '/client/proposals/freelancer-profile',
    element: lazy(() => import('pages/profile/Client/FreelancerProfile')),
    name: 'freelancerProfile',
    title: 'Hồ sơ ứng cử viên',
    // role: ['client'],

  },
  {
    path: '/client/proposals',
    element: lazy(() => import('pages/proposals/Client/Proposals')),
    name: 'proposals',
    title: 'Danh sách ứng tuyển',
    // role: ['client'],
  },
];

const Router = () => {
  const auth = useRecoilValue(authState);

  return (
    <Suspense fallback={<Spin />}>
      <Routes>
        {routes.map(({ path, element, name, role, layout }) => (
          <Route
            key={path}
            path={path}
            element={
              auth.role === 'client' ? (
                <ClientLayout />
              ) : layout === 'breadcrumb' ? (
                <BreadcrumbUser />
              ) : (
                <UserLayout />
              )
            }
            exact
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
              exact
            />
          </Route>
        ))}
      </Routes>
    </Suspense>
  );
};

export default Router;
