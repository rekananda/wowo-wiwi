import { createBrowserRouter } from 'react-router-dom';

import Error404Page from '@Organisme/ErrorPages/404.page';
import MainLayout from './Layout';
import ErrorBoundary from './Layout/ErrorBoundary';
import LandingPage from './Pages/Landing.page';
import LobbyPage from './Pages/Lobby.page';
import PlayPage from './Pages/Play.page';
import PrivateRoute from './Components/Organisme/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <LandingPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'lobby/:roomCode',
        element: (
          <PrivateRoute>
            <LobbyPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'play/:roomCode',
        element: (
          <PrivateRoute>
            <PlayPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Error404Page />,
  },
]);

export default router;