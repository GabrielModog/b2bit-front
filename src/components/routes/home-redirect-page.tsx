import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth';

const HomeRedirect: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <Navigate to={isAuthenticated ? '/profile' : '/login'} replace />;
};

export default HomeRedirect;