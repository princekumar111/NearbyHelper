import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn, getUserFromToken } from '../utils/auth';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  const user = getUserFromToken();
  if (allowedRoles.length && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};





export default PrivateRoute;
