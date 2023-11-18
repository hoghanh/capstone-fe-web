import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomeFilled } from '@ant-design/icons';
import UserLayout from 'layout/defaultLayout/UserLayout';
import ClientLayout from 'layout/defaultLayout/ClientLayout';
import BreadcrumbUser from 'layout/breadcrumbLayout/BreadCrumbUser';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { useRecoilValue } from 'recoil';
import { authState } from 'recoil/atom';
import Loading from 'components/loading/loading';
import PageNotFound from 'pages/404/PageNotFound';

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
    path: '/favorite',
    element: lazy(() => import('pages/joblist/FavoriteList')),
    name: 'favorite list',
    layout: 'breadcrumb',
    title: 'Danh sách yêu thích',
    role: ['freelancer'],
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
    role: ['freelancer'],
  },
  {
    path: '/profile-client/:id',
    element: lazy(() => import('pages/profileclient/ProfileClient')),
    name: 'profile-client',
    role: ['freelancer'],
  },
  {
    path: '/client',
    element: lazy(() => import('pages/dashboard/Dashboard')),
    name: 'client',
    title: <HomeFilled />,
    role: ['client'],
  },
  {
    path: '/client/schedule',
    element: lazy(() => import('pages/schedule/InterviewSchedule')),
    name: 'schedule',
    title: 'Lịch phỏng vấn',
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
    path: '/client/profile/edit',
    element: lazy(() => import('pages/profile/Client/EditProfileClient')),
    name: 'edit-profile',
    title: 'Sửa hồ sơ cá nhân',
    // role: ['client'],
  },
  {
    path: '/client/jobs-management',
    element: lazy(() => import('pages/jobmanagement/ClientJobManagement')),
    name: 'job-post-managment',
    title: 'Bài viết',
    // role: ['client'],
  },
  {
    path: '/client/jobs-management/post-job',
    element: lazy(() => import('pages/job/PostJob')),
    name: 'post-job',
    title: 'Đăng bài viết',
    // role: ['client'],
  },
  {
    path: '/client/jobs-management/edit-job',
    element: lazy(() => import('pages/job/EditJob')),
    name: 'edit-job',
    title: 'Chỉnh sửa bài viết',
    // role: ['client'],
  },
  {
    path: '/client/jobs-management/edit-job/:id',
    element: lazy(() => import('pages/job/EditJob')),
    name: 'edit-job',
    // role: ['client'],
  },
  {
    path: '/client/jobs-management/job-detail',
    element: lazy(() => import('pages/jobdetail/JobDetail')),
    name: 'jobdetail',
    title: 'Chi tiết dự án',
    // role: ['client'],
  },
  {
    path: '/client/jobs-management/job-detail/:id',
    element: lazy(() => import('pages/jobdetail/Client/JobDetail')),
    name: 'jobdetail',
    // role: ['client'],
  },
  {
    path: '/client/jobs-management/job-detail/:id/applications',
    element: lazy(() => import('pages/jobdetail/Client/ApplicationList')),
    name: 'applications',
    // role: ['client'],
  },
  {
    path: '/applications',
    element: lazy(() => import('pages/applications/Applications')),
    name: 'applications',
    // role: ['freelancer'],
  },

  {
    path: '/job-management',
    element: lazy(() => import('pages/jobmanagement/JobManagement')),
    name: 'jobmanagement',
    // role: ['client'],
  },
  
  {
    path: '/client/applications/freelancer-profile/:id',
    element: lazy(() => import('pages/profile/Profile')),
    name: 'freelancerProfile',
    title: 'Hồ sơ ứng cử viên',
    role: ['client'],
  },
  {
    path: '/client/applications',
    element: lazy(() => import('pages/applications/Client/Applications')),
    name: 'applications',
    title: 'Danh sách ứng tuyển',
  },
  {
    path: '/client/billing',
    element: lazy(() => import('pages/billing/Billing')),
    name: 'billing',
    title: 'Hoá đơn',
    // role: ['client'],
  },
];

const Router = () => {
  const auth = useRecoilValue(authState);

  return (
    <Suspense fallback={<Loading />}>
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
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
