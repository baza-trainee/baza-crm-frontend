import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../types';

const RouteWrapper = () => {
  const user = useSelector((state: RootState) => state.userState.user);
  const role = user?.user?.isAdmin ? 'admin' : 'user';

  return (
    <Navigate to={role === 'admin' ? '/crm/projects' : '/crm/portal'} replace />
  );
};

export default RouteWrapper;
