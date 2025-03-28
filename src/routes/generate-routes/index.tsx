/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route, Routes as ReactRoutes, Navigate, Outlet } from "react-router-dom";
import ProtectedRoute from "../protected-routes";
import DashboardLayout from "@/layouts/dashboard-layout";
import useUserStore from "@/store/user-store";

type RouteConfig = {
  name?: string;
  path: string;
  element?: React.ComponentType<any>;
  title?: string;
  routes?: RouteConfig[]; // Nested routes
  requiredRole?: string;
};

type LayoutConfig = {
  layout: React.ComponentType<any>;
  routes: RouteConfig[];
};

const renderRoutes = (
  routes: RouteConfig[],
  parentLayout?: React.ComponentType<any>,
  isAuthorized = true,
  userRole = "admin"
) => {
  return routes.map(
    ({ element: Element, path, routes: nestedRoutes, name, requiredRole }, index) => {
      if (!Element || !path) return null;

       // Check if route needs protection based on layout
       const needsProtection = parentLayout === DashboardLayout;
      
       // Check if this route requires a specific role
       const hasRequiredRole = !requiredRole || requiredRole === userRole;
       
       // Combined authorization check
       const isAccessible = isAuthorized && (!needsProtection || (needsProtection && hasRequiredRole));
 
       // If there are nested routes, render them recursively
       if (nestedRoutes && nestedRoutes.length > 0) {
         const WrappedElement = needsProtection ? (
           <ProtectedRoute isAuthorized={isAccessible}>
             <Element />
           </ProtectedRoute>
         ) : (
           <Element />
         );
 
         return (
           <Route key={`${path}-${index}`} path={path} element={WrappedElement}>
             {/* Pass all necessary context to nested routes */}
             {renderRoutes(nestedRoutes, parentLayout, isAuthorized, userRole)}
           </Route>
         );
       }

      return (
        <Route
          key={name || `route-${index}`}
          path={path}
          element={
            parentLayout === DashboardLayout ? (
              <ProtectedRoute isAuthorized={isAccessible}>
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
    const { authorized: isAuthorized, currentRole } = useUserStore();
    return (
      <ReactRoutes>
        {mainRoutes.map(({ layout: Layout, routes }, index) => (
          <Route key={`layout-${index}`} element={<Layout />}>
            {renderRoutes(routes, Layout, isAuthorized, currentRole!)}
          </Route>
        ))}
        <Route
          path="/"
          element={<Navigate to={isAuthorized ? "/users" : "/signin"} />}
        />
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute isAuthorized={isAuthorized && currentRole === "admin"}>
              <Outlet />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </ReactRoutes>
    );
  };

  return Routes;
};
