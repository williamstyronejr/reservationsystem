import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './context/auth';
import HomePage from './pages/Homepage';
import RecoveryPage from './pages/auth/RecoveryPage';

const queryClient = new QueryClient();

const Root = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recovery" element={<RecoveryPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </AuthProvider>
);

export default Root;
