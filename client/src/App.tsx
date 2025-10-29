import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import './input.css';
import Dashboard from './scenes/Dashboard';
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
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path='/*' element={<Dashboard />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </SnackbarProvider>
  );
};

export default App;
