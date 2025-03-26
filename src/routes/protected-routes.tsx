import { Navigate } from "react-router-dom";

type Props = {
  isAuthorized: boolean;
  children: React.ReactNode;
};

const ProtectedRoute = ({ isAuthorized, children }: Props) => {
  if (!isAuthorized) {
    return (
      <Navigate
        to={`/signin`}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
