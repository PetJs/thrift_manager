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
  userRole = "admin",
  parentRequiredRole?: string  // New parameter to carry down parent's requiredRole
) => {
  return routes.map(
    ({ element: Element, path, routes: nestedRoutes, name, requiredRole }, index) => {
      if (!Element || !path) return null;

      // If a nested route doesn't have its own requiredRole, inherit from the parent
      const effectiveRequiredRole = requiredRole || parentRequiredRole;

      // Check if route needs protection
      const needsProtection = parentLayout === DashboardLayout;
      const hasRequiredRole = !effectiveRequiredRole || effectiveRequiredRole === userRole;
      const isAccessible = isAuthorized && (!needsProtection || hasRequiredRole);

      if (nestedRoutes && nestedRoutes.length > 0) {
        return (
          <Route key={`${path}-${index}`} path={path} element={<Element />}>
            {renderRoutes(nestedRoutes, parentLayout, isAuthorized, userRole, effectiveRequiredRole)}
          </Route>
        );
      }

      return (
        <Route
          key={name || `route-${index}`}
          path={path}
          element={
            needsProtection ? (
              <ProtectedRoute
                isAuthorized={isAccessible}
                requiredRole={effectiveRequiredRole}
                userRole={userRole}
              >
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
    console.log("Authorized:", isAuthorized);
    console.log("Current Role:", currentRole);

    return (
      <ReactRoutes>
        {mainRoutes.map(({ layout: Layout, routes }, index) => (
          <Route key={`layout-${index}`} element={<Layout />}>
            {renderRoutes(routes, Layout, isAuthorized, currentRole ?? "", undefined)}
          </Route>
        ))}

        <Route
          path="/"
          element={
            !isAuthorized || !currentRole ? (
              <Navigate to="/signIn" replace />
            ) : currentRole === "admin" ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/users" replace />
            )
          }
        />

        {/* Restrict admin routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute isAuthorized={isAuthorized} requiredRole="admin" userRole={currentRole ?? ""}>
              <Outlet />
            </ProtectedRoute>
          }
        />

        {/* Restrict user routes */}
        <Route
          path="/users/*"
          element={
            <ProtectedRoute isAuthorized={isAuthorized} requiredRole="user" userRole={currentRole ?? ""}>
              <Outlet />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/signIn" replace />} />
      </ReactRoutes>
    );
  };

  return Routes;
};
