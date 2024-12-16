import { Outlet } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

const HomeLayout: React.FC = () => {
  const location = useLocation();
  return (
    <main>
      {location.pathname === '/crm/bot-linking' ? (
        <Outlet />
      ) : (
        <>
          <Header />
          <Sidebar />
          <div className="ml-[150px] mt-[70px]">
            <Outlet />
          </div>
        </>
      )}
    </main>
  );
};

export default HomeLayout;
