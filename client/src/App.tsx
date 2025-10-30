import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import './input.css';
import { AuthProvider } from '@propelauth/react';
import AuthLayout from './layouts/Auth';
import DashboardLayout from './layouts/Dashboard';
import Logout from './scenes/Auth/Logout';
import ErrorBoundary from './scenes/ErrorBoundary';
import { env } from './util/env';

// Import Auth URL
const AUTH_URL = env.VITE_AUTH_URL;

if (!AUTH_URL) {
  throw new Error('Missing Auth URL');
}

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={5000}
      preventDuplicate={true}
    >
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AuthProvider authUrl={AUTH_URL}>
            <Router>
              <Routes>
                <Route path='/*' element={<DashboardLayout />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/auth/*' element={<AuthLayout />} />
                <Route path='/dashboard/*' element={<DashboardLayout />} />
              </Routes>
            </Router>
          </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </SnackbarProvider>
  );
};

export default App;
