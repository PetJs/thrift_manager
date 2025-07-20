import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  isAuthorized: boolean;
  requiredRole?: string;
  userRole?: string;
  children?: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  isAuthorized, 
  requiredRole, 
  userRole, 
  children 
}) => {
  console.log("🚀 Debug: User Role:", userRole); // log user role
  console.log("🚀 Debug: Required Role:", requiredRole); // log required role

  console.log("🚀 Debug: User Role:", userRole, " | Required Role:", requiredRole);

  if (!isAuthorized) {
    console.log("🔴 Not Authorized: Redirecting to /signIn");
    return <Navigate to="/signIn" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    console.log("🔴 Role Mismatch: Redirecting to /signIn");
    return <Navigate to="/signIn" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
