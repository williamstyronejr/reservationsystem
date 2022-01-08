import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './context/auth';
import HomePage from './pages/Homepage';
import FeaturesPage from './pages/Features';
import SigninPage from './pages/auth/SigninPage';
import SignupPage from './pages/auth/SignupPage';
import RecoveryPage from './pages/auth/RecoveryPage';
import LandingLayout from './layouts/LandingLayout';
import MissingPage from './pages/MissingPage';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import SettingsPage from './pages/settings/SettingsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 846000,
    },
  },
});

const LandingPages = [
  {
    path: '/',
    component: <HomePage />,
  },
  {
    path: '/features',
    component: <FeaturesPage />,
  },
  {
    path: '/recovery',
    component: <RecoveryPage />,
  },
  {
    path: '/signup',
    component: <SignupPage />,
  },
  {
    path: '/signin',
    component: <SigninPage />,
  },
];

const DashboardPages = [
  {
    path: '/settings',
    component: <SettingsPage />,
  },
  {
    path: '/dashboard',
    component: <DashboardPage />,
  },
];

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <main className="page__main">
        <BrowserRouter>
          <Routes>
            {LandingPages.map((elem) => (
              <Route
                key={elem.path}
                path={elem.path}
                element={<LandingLayout>{elem.component}</LandingLayout>}
              />
            ))}

            {DashboardPages.map((elem) => (
              <Route
                key={elem.path}
                path={elem.path}
                element={<DashboardLayout>{elem.component}</DashboardLayout>}
              />
            ))}

            <Route path="*" element={<MissingPage />} />
          </Routes>
        </BrowserRouter>
      </main>
    </AuthProvider>
  </QueryClientProvider>
);

export default Root;
