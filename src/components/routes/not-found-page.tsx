import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth';

const NotFoundPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="mt-4 text-lg text-gray-600">Route not found</p>
      <Link to="/login" className="mt-6 text-primary hover:underline">Back to Login</Link>
    </div>
  );
};

export default NotFoundPage;