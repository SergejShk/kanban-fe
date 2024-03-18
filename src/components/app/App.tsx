import { Navigate, createBrowserRouter } from 'react-router-dom';

import SharedLayout from '../common/SharedLayout';

import Public from '../routes/Public';
import Private from '../routes/Private';

import { Home, Login, SignUp } from './pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SharedLayout />,
    errorElement: <Navigate to="/" />,
    children: [
      {
        index: true,
        element: <Public component={Login} />,
      },
      {
        path: 'sign-up',
        element: <Public component={SignUp} />,
      },
      {
        path: 'home',
        element: <Private component={Home} />,
      },
    ],
  },
]);
