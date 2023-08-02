import React, { lazy } from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { HomeFilled } from '@ant-design/icons';
import { ReactSVG } from 'react-svg';

// const AppBreadcrumb = () => {
const routes = [
  {
    path: '/',
    component: lazy(() => import('../pages/home/HomePage')),
    name: 'home',
    title: <HomeFilled />,
  },
  {
    path: '/jobs',
    component: lazy(() => import('../pages/joblist/JobList')),
    name: 'List Jobs',
    title: 'Find Freelance Work',
  },

  {
    path: '/jobDetail',
    component: lazy(() => import('../pages/JobDetail/JobDetail')),
    name: 'Job Detail',
    title: 'Chi tiết dự án',
  },
];

function itemRender(route, params, routes, paths) {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <span>{route.title}</span>
  ) : (
    <Link to={paths.join('/')}>{route.title}</Link>
  );
}

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname;

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname);
    return currentRoute ? currentRoute.title : false;
  };
  const getBreadcrumbs = (location) => {
    const breadcrumbs = [
      {
        path: '/',
        component: lazy(() => import('../pages/home/HomePage')),
        name: 'Home',
        title: <HomeFilled />,
      },
    ];
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`;
      const routeName = getRouteName(currentPathname, routes);
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          title: routeName,
          active: index + 1 === array.length ? true : false,
        });
      return currentPathname;
    });
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs(currentLocation);

  return (
    <Breadcrumb
      style={{ padding: '10px 20px', margin: ' 20px 0 30px 0' }}
      itemRender={itemRender}
      items={breadcrumbs}
      separator={
        <ReactSVG
          src='./icon/right.svg'
          beforeInjection={(svg) => {
            svg.setAttribute('width', '16');
            svg.setAttribute('height', '6');
          }}
        />
      }
    />
  );
};

export default React.memo(AppBreadcrumb);
