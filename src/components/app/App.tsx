import { Navigate, createBrowserRouter } from 'react-router-dom';

import SharedLayout from '../common/SharedLayout';

import Public from '../routes/Public';
import Private from '../routes/Private';

import { WorkSpaces, Boards, Login, SignUp } from './pages';

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
        path: 'work-spaces',
        element: <Private component={WorkSpaces} />,
      },
      {
        path: 'work-spaces/:workSpaceId',
        element: <Private component={Boards} />,
      },
    ],
  },
]);
