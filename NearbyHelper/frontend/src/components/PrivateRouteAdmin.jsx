import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn, getUserFromToken } from '../utils/auth';

const PrivateRouteAdmin = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }

  const user = getUserFromToken();

  if (user?.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRouteAdmin;
