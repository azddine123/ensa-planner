import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token || !user) {
    // Rediriger vers la page de connexion en conservant l'URL de destination
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (user.role !== role) {
    // Rediriger vers le tableau de bord approprié
    return <Navigate to={`/${user.role}`} replace />;
  }

  return children;
};

export default PrivateRoute;