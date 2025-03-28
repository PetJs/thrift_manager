/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route, Routes as ReactRoutes, Navigate } from "react-router-dom";
import ProtectedRoute from "../protected-routes";
import DashboardLayout from "@/layouts/dashboard-layout";
import useUserStore from "@/store/user-store";

type RouteConfig = {
  name?: string;
  path: string;
  element?: React.ComponentType<any>;
  title?: string;
  routes?: RouteConfig[]; // Nested routes
};

type LayoutConfig = {
  layout: React.ComponentType<any>;
  routes: RouteConfig[];
};

const renderRoutes = (
  routes: RouteConfig[],
  parentLayout?: React.ComponentType<any>,
  isAuthorized = true
) => {
  return routes.map(
    ({ element: Element, path, routes: nestedRoutes, name }, index) => {
      if (!Element || !path) return null;

      // If there are nested routes, render them recursively
      if (nestedRoutes && nestedRoutes.length > 0) {
        return (
          <Route key={`${path}-${index}`} path={path} element={<Element />}>
            {renderRoutes(nestedRoutes, undefined, isAuthorized)}
          </Route>
        );
      }

      return (
        <Route
          key={name || `route-${index}`}
          path={path}
          element={
            parentLayout === DashboardLayout ? (
              <ProtectedRoute isAuthorized={isAuthorized}>
                <Element />
              </ProtectedRoute>
            ) : (
              <Element />
            )
          }
        />
      );
    }
  );
};

export const generateRoutes = (mainRoutes: LayoutConfig[]) => {
  const Routes = () => {
    const { authorized: isAuthorized } = useUserStore();

    return (
      <ReactRoutes>
        {mainRoutes.map(({ layout: Layout, routes }, index) => (
          <Route key={`layout-${index}`} element={<Layout />}>
            {renderRoutes(routes, Layout, isAuthorized)}
          </Route>
        ))}
        <Route
          path="/"
          element={<Navigate to={isAuthorized ? "/users" : "/signin"} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </ReactRoutes>
    );
  };

  return Routes;
};
