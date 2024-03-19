import { lazy } from 'react';

export const Login = lazy(() => import('../auth/Login'));
export const SignUp = lazy(() => import('../auth/SignUp'));
export const WorkSpaces = lazy(() => import('../work-spaces/WorkSpaces'));
export const Boards = lazy(() => import('../boards/Boards'));
