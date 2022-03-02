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
import StoresPage from './pages/dashboard/stores/index';
import CreateStorePage from './pages/dashboard/stores/create';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import StorePage from './pages/dashboard/stores/StorePage';
import StoreFrontPage from './pages/stores/StorePage';
import AnalyticsPage from './pages/dashboard/analytics';
import CalendarPage from './pages/dashboard/calendar';
import SettingsPage from './pages/settings/SettingsPage';
import ManageLayoutPage from './pages/dashboard/stores/ManageLayoutPage';
import ReviewsPage from './pages/stores/ReviewPage';

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
  {
    path: '/stores/:storeId',
    component: <StoreFrontPage />,
  },
  {
    path: '/stores/:storeId/reviews',
    component: <ReviewsPage />,
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
  {
    path: '/dashboard/stores',
    component: <StoresPage />,
  },
  {
    path: '/dashboard/stores/create',
    component: <CreateStorePage />,
  },
  {
    path: '/dashboard/analytics',
    component: <AnalyticsPage />,
  },
  {
    path: '/dashboard/calendar',
    component: <CalendarPage />,
  },
  {
    path: '/dashboard/stores/:storeId',
    component: <StorePage />,
  },
  {
    path: '/dashboard/stores/:storeId/layout',
    component: <ManageLayoutPage />,
  },
];

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <main className="main">
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
