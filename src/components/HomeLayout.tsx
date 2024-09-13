import { Outlet } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';

const HomeLayout = () => {
  return (
    <main>
      <Header />
      <Sidebar />
      <div className="ml-[150px] mt-[70px]">
        <Outlet />
      </div>
    </main>
  );
};

export default HomeLayout;
