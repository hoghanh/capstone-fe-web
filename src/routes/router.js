import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AdminLayout from "../components/layout/adminLayout";
import PublicRoute from "./PublicRoute";
import HybridRoute from "./HybridRoute";
import PrivateRoute from "./PrivateRoute";
import { lazy } from "react";
import { Suspense } from "react";
import Loading from "../components/loading/loading";

const publicRoutes = [
  //   {
  //     path: "/login",
  //     component: lazy(() => import("../pages/login/Login")),
  //     name: "login",
  //     layout: false,
  //   },
];

const hybridRoutes = [];

const privateRoutes = [];

const Routes = (
  <Suspense fallback={<Loading />}>
    <Switch>
      {publicRoutes.map(
        ({ layout, ...route }) =>
          !layout && <PublicRoute key={route.name} exact={true} {...route} />
      )}
      {privateRoutes.map(
        ({ layout, ...route }) =>
          !layout && <PrivateRoute key={route.name} exact={true} {...route} />
      )}
      {hybridRoutes.map(
        ({ layout, ...route }) =>
          !layout && <HybridRoute key={route.name} exact={true} {...route} />
      )}
      <Route path="/admin">
        <AdminLayout>
          <Suspense fallback={<Loading />}>
            <Switch>
              {publicRoutes.map(
                ({ layout, ...route }) =>
                  layout === "admin" && (
                    <PublicRoute exact={true} {...route} key={route.name} />
                  )
              )}
              {privateRoutes.map(
                ({ layout, ...route }) =>
                  layout === "admin" && (
                    <PrivateRoute exact={true} {...route} key={route.name} />
                  )
              )}
              {hybridRoutes.map(
                ({ layout, ...route }) =>
                  layout === "admin" && (
                    <HybridRoute exact={true} {...route} key={route.name} />
                  )
              )}
              <Redirect to="/admin" />
            </Switch>
          </Suspense>
        </AdminLayout>
      </Route>
      <Route>
        {/* <HeaderFooter> */}
        <Suspense fallback={<Loading />}>
          <Switch>
            {publicRoutes.map(
              ({ layout, ...route }) =>
                layout === "user" && (
                  <PublicRoute exact={true} {...route} key={route.name} />
                )
            )}
            {privateRoutes.map(
              ({ layout, ...route }) =>
                layout === "user" && (
                  <PrivateRoute exact={true} {...route} key={route.name} />
                )
            )}
            {hybridRoutes.map(
              ({ layout, ...route }) =>
                layout === "user" && (
                  <HybridRoute exact={true} {...route} key={route.name} />
                )
            )}
            <Redirect to="/" />
          </Switch>
        </Suspense>
        {/* </HeaderFooter> */}
      </Route>
    </Switch>
  </Suspense>
);

export default Routes;
