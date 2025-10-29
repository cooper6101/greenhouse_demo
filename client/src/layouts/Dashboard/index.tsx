import { RedirectToLogin, useAuthInfo } from '@propelauth/react';
import { Route, Routes } from 'react-router-dom';
import Overlay from '@/components/Overlay';
import Dashboard from '../../scenes/Dashboard';

const DashboardLayout = () => {
  const { user, isLoggedIn, loading } = useAuthInfo();

  // User is not available yet, return loading
  if (loading) return <Overlay />;

  // User is not logged in, redirect to login page
  if (!isLoggedIn || !user) return <RedirectToLogin />;

  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
    </Routes>
  );
};

export default DashboardLayout;
