import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';

const HomeLayout = () => {
  return (
    <main className="min-h-screen">
      <Sidebar />
      <div className="ml-[150px]">
        <Outlet />
      </div>
    </main>
  );
};

export default HomeLayout;
