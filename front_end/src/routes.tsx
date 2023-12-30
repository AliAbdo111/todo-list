
import React from 'react';
import { Suspense, lazy } from 'react';
import type { RouteObject } from 'react-router';
import Navigate, { useNavigate } from 'react-router-dom'
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

const NavigateToLogin = () => {
  const navigate = useNavigate();
  navigate('/auth/login');
  return null; // or any loading indicator if needed
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Login />, // Redirect to '/auth/login' by default
  },
  {
    path: '/auth',
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