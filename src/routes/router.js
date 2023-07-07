import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "../components/loading/loading";

const publicRoutes = [
  {
    path: "/",
    component: lazy(() => import("../pages/LandingPage")),
    name: "home",
    layout: false,
  },
];

const Router = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      {publicRoutes.map(({ path, component: Component }) => (
        <Route key={path} path={path} element={<Component />} exact />
      ))}
    </Routes>
  </Suspense>
);

export default Router;
