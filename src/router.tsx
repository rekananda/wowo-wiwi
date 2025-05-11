import { createBrowserRouter } from 'react-router-dom';

import Error404Page from '@Organisme/ErrorPages/404.page';
import MainLayout from './Layout';
import ErrorBoundary from './Layout/ErrorBoundary';
import LandingPage from './Pages/Landing.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Error404Page />,
  },
]);

export default router;