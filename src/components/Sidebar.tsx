import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import analytics from '../assets/common/analytics.svg';
import logo from '../assets/common/client_login.svg';
import projects from '../assets/common/projects.svg';
import questionnaires from '../assets/common/questionnaires.svg';
import technologies from '../assets/common/technologies.svg';
import { RootState } from '../types';

const Sidebar = () => {
  const user = useSelector((state: RootState) => state.userState.user);

  return (
    <div className="w-[150px] h-screen bg-[#1E252F] text-[#888888] fixed pt-20">
      <nav
        className="flex flex-col justify-center items-center text-center bg-[#1E252F] font-['Open_Sans'] text-base"
        id="sidebar"
      >
        {!user?.user.isAdmin && (
          <NavLink
            to="/crm/portal"
            className="w-[130px] h-[130px] hover:text-[#E4F1FF] hover:bg-[#1F3145] duration-500 rounded-lg group justify-center items-center flex"
          >
            <div className="flex flex-col items-center">
              <img
                src={logo}
                className="duration-500 opacity-50 group-hover:opacity-100"
              ></img>
              <h2>Портал учасника</h2>
            </div>
          </NavLink>
        )}
        <NavLink
          to="projects"
          className="w-[130px] h-[130px] hover:text-[#E4F1FF] hover:bg-[#1F3145] duration-500 rounded-lg group justify-center items-center flex"
        >
          <div className="flex flex-col items-center">
            <img
              src={projects}
              className="duration-500 opacity-50 group-hover:opacity-100"
            ></img>
            <h2>Проєкти</h2>
          </div>
        </NavLink>
        {user?.user.isAdmin && (
          <NavLink
            to="questionnaires"
            className="w-[130px] h-[130px] hover:text-[#E4F1FF] hover:bg-[#1F3145] duration-500 rounded-lg group justify-center items-center flex"
          >
            <div className="flex flex-col items-center">
              <img
                src={questionnaires}
                className="duration-500 opacity-50 group-hover:opacity-100"
              ></img>
              <h2>Анкети</h2>
            </div>
          </NavLink>
        )}
        {user?.user.isAdmin && (
          <NavLink
            to="analytics"
            className="w-[130px] h-[130px] hover:text-[#E4F1FF] hover:bg-[#1F3145] duration-500 rounded-lg group justify-center items-center flex"
          >
            <div className="flex flex-col items-center">
              <img
                src={analytics}
                className="duration-500 opacity-50 group-hover:opacity-100"
              ></img>
              <h2>Аналітика</h2>
            </div>
          </NavLink>
        )}
        {user?.user.isAdmin && (
          <NavLink
            to="technologies"
            className="w-[130px] h-[130px] hover:text-[#E4F1FF] hover:bg-[#1F3145] duration-500 rounded-lg group justify-center items-center flex"
          >
            <div className="flex flex-col items-center">
              <img
                src={technologies}
                className="duration-500 opacity-50 group-hover:opacity-100"
              ></img>
              <h2>
                Спеціалізації<br></br> та технології
              </h2>
            </div>
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
