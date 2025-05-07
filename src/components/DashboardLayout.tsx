
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/authContext';
import Header from './Header';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  requiredRole?: 'admin' | 'staff' | 'patient';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ requiredRole }) => {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If authentication is required but user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If specific role is required and user doesn't have it
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Sidebar>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </Sidebar>
    </div>
  );
};

export default DashboardLayout;
