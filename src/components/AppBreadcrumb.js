import React, { lazy } from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { HomeFilled, RightOutlined } from '@ant-design/icons';

const AppBreadcrumb = () => {
  const routes = [
    {
      path: '/',
      component: lazy(() => import('../pages/Home/HomePage')),
      name: 'home',
    },
    {
      path: '/jobs',
      component: lazy(() => import('../pages/JobList')),
      name: 'List Jobs',
    },
    {
      path: '/jobs/trung',
      component: lazy(() => import('../pages/JobList')),
      name: 'List Jobs',
    },
  ];
  const currentLocation = useLocation().pathname;

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname);
    return currentRoute ? currentRoute.name : false;
  };

  const getBreadcrumbs = (location) => {
    const breadcrumbs = [];
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`;
      const routeName = getRouteName(currentPathname, routes);
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        });
      return currentPathname;
    });
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs(currentLocation);

  return (
    <Breadcrumb className='m-0 ms-2' separator={<RightOutlined />}>
      <Breadcrumb.Item>
        <Link to='/'>
          <HomeFilled />
        </Link>
      </Breadcrumb.Item>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <Breadcrumb.Item
            key={index}
            {...(breadcrumb.active ? { className: 'ant-breadcrumb-link' } : {})}
          >
            {breadcrumb.active ? (
              breadcrumb.name
            ) : (
              <Link to={breadcrumb.pathname}>{breadcrumb.name}</Link>
            )}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default React.memo(AppBreadcrumb);
