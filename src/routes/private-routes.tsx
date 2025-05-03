import React, { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context-";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const context = useContext(AuthContext);
  
  if (!context) {
    return <Navigate to="/" />;
  }
  
  const { authenticated } = context;
  
  // First check if user is authenticated
  if (!authenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default PrivateRoute;