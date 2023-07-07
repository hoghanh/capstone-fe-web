import React from "react";
import { Route } from "react-router-dom";

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} element={<Component />} />
);

export default PublicRoute;
