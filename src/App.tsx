import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Analytics from './pages/Analytics';
import Email from './pages/Email';
import Error from './pages/Error';
import Evaluating from './pages/Evaluating';
import ForgottenPassword from './pages/ForgottenPassword';
import HomeLayout from './components/HomeLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Portal from './pages/Portal';
import ProjectDetails from './pages/ProjectDetails';
import Projects from './pages/Projects';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import Technologies from './pages/Technologies';
import { ProjectCreate } from './pages/ProjectCreate';
import { ProjectEdit } from './pages/ProjectEdit';
import { Questionnaires } from './pages/Questionnaires';

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
        path: 'questionnaires',
        element: <Questionnaires />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'technologies',
        element: <Technologies />,
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
