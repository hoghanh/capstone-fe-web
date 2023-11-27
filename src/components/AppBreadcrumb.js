import React, { lazy } from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { HomeFilled } from '@ant-design/icons';
import { ReactSVG } from 'react-svg';
import theme from 'styles/theme';
import { routes } from 'routes/router';

function itemRender(route, params, routes, paths) {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <span>{route.title}</span>
  ) : (
    <Link to={route.path}>{route.title}</Link>
  );
}

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname;

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname);
    return currentRoute ? currentRoute.title : false;
  };

  const getBreadcrumbs = (location) => {
    const breadcrumbs = [];
    if (!location.includes('/client')) {
      breadcrumbs.push({
        path: '/home',
        element: lazy(() => import('../pages/joblist/RecommendJobs')),
        name: 'Home',
        title: <HomeFilled />,
      });
    }
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`;
      const routeName = getRouteName(currentPathname, routes);
      routeName &&
        breadcrumbs.push({
          path: currentPathname,
          title: routeName,
          active: index + 1 === array.length ? true : false,
        });
      return currentPathname;
    });
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs(currentLocation);

  return (
    <div style={theme.responseWidth}>
      <Breadcrumb
        itemRender={itemRender}
        items={breadcrumbs}
        separator={
          <ReactSVG
            src='/icon/right.svg'
            beforeInjection={(svg) => {
              svg.setAttribute('width', '16');
              svg.setAttribute('height', '6');
            }}
          />
        }
      />
    </div>
  );
};

export default React.memo(AppBreadcrumb);
