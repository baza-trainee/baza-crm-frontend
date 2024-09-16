import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Communication from './pages/Communication';
import Email from './pages/Email';
import Error from './pages/Error';
import Evaluating from './pages/Evaluating';
import Events from './pages/Events';
import ForgottenPassword from './pages/ForgottenPassword';
import HomeLayout from './components/HomeLayout';
import Knowledge from './pages/Knowledge';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Loyalty from './pages/Loyalty';
import Portal from './pages/Portal';
import ProjectDetails from './pages/ProjectDetails';
import Projects from './pages/Projects';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import { ProjectCreate } from './pages/ProjectCreate';
import { ProjectEdit } from './pages/ProjectEdit';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <Error />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'forgotten-password',
    element: <ForgottenPassword />,
  },
  {
    path: 'reset-password',
    element: <ResetPassword />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'evaluating',
    element: <Evaluating />,
  },
  {
    path: 'email',
    element: <Email />,
  },
  {
    path: 'crm',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Portal />,
      },
      {
        path: 'projects',
        element: <Projects />,
      },
      {
        path: 'projects/:id',
        element: <ProjectDetails />,
      },
      {
        path: 'projects/:id/edit',
        element: <ProjectEdit />,
      },
      {
        path: 'projects/create',
        element: <ProjectCreate />,
      },
      {
        path: 'knowledge',
        element: <Knowledge />,
      },
      {
        path: 'communication',
        element: <Communication />,
      },
      {
        path: 'loyalty',
        element: <Loyalty />,
      },
      {
        path: 'events',
        element: <Events />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
