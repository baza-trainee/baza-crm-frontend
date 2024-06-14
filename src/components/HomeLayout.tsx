import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';

const HomeLayout = () => {
  return (
    <main className="flex">
      <Sidebar />
      <div>
        <Outlet />{' '}
      </div>
    </main>
  );
};

export default HomeLayout;
