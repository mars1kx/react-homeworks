import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/login' 
}) => {
  const { currentUser } = useAppSelector(state => state.auth);
  
  if (!currentUser) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default ProtectedRoute; 