/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route, Routes as ReactRoutes, Navigate } from "react-router-dom";
import ProtectedRoute from "../protected-routes";
import DashboardLayout from "@/layouts/dashboard-layout";

type RouteConfig = {
  name?: string;
  path: string;
  element?: React.ComponentType<any>;
  title?: string;
  routes?: RouteConfig[];
}

type LayoutConfig = {
  layout: React.ComponentType<any>;
  routes: RouteConfig[];
}

const flattenRoutes = (routes: RouteConfig[]): RouteConfig[] => {
    const result: RouteConfig[] = [];
    const stack = [...routes];
  
    while (stack.length) {
      const route = stack.pop();
      if (!route) continue;
      
      const { routes: subRoutes, ...rest } = route;
      result.push(rest);
      
      if (subRoutes) stack.push(...subRoutes);
    }
  
    return result;
  };

export const generateRoutes = (mainRoutes: LayoutConfig[]) => {
  const Routes = () => {
    const isAuthorized = true;

    return (
      <ReactRoutes>
        {mainRoutes.map(({ layout: Layout, routes }, index) => {
          const flatRoutes = flattenRoutes(routes);

          return (
            <Route key={`layout-${index}`} element={<Layout />}>
              {flatRoutes.map(({ element: Element, path, name }) =>
                Element && path ? (
                  <Route
                    key={name || `route-${path}`}
                    element={
                      Layout === DashboardLayout ? (
                        <ProtectedRoute isAuthorized={isAuthorized}>
                          <Element />
                        </ProtectedRoute>
                      ) : (
                        <Element />
                      )
                    }
                    path={path}
                  />
                ) : null
              )}
            </Route>
          );
        })}
        <Route
          path="/"
          element={<Navigate to={isAuthorized ? "/home" : "/login"} />}
        />
      </ReactRoutes>
    );
  };

  return Routes;
};
