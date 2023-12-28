
import React from 'react';
import { Suspense, lazy } from 'react';
import type { RouteObject } from 'react-router';
// import LoadingScreen from './components/LoadingScreen';

const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense fallback={ ""}>
      <Component {...props} />
    </Suspense>
  );

// *  AUTHENTICATION PAGES
const Login = Loadable(lazy(() => import('./pages/Login')));
const Register = Loadable(
  lazy(() => import('./pages/Register'))
);

//  * DashBoard PAGE
const DashBoard = Loadable(lazy(() => import('./pages/DashBoard')));

const routes: RouteObject[] = [
  {
    path: 'authentication',
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },

  {
    path: '*',
    children: [
      {
        index: true,
        path:'dashBoard',
        element: (
            <DashBoard />
        ),
      },
    ],
  },
];

export default routes;