import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import config from '../config';

const PrivateRoute = ({ children, role }) => {
  const location = useLocation();
  const token = localStorage.getItem(config.AUTH_TOKEN_KEY);
  const user = JSON.parse(localStorage.getItem(config.USER_DATA_KEY));

  if (!token || !user) {
    // Rediriger vers la page de connexion en conservant l'URL de destination
    return <Navigate to={config.ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  if (user.role !== role) {
    // Rediriger vers le tableau de bord approprié
    return <Navigate to={`/${user.role}`} replace />;
  }

  return children;
};

export default PrivateRoute;