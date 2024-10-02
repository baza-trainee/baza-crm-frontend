import { Link } from 'react-router-dom';
import logo from '../assets/common/client_login.svg';
import projects from '../assets/common/projects.svg';
import questionnaires from '../assets/common/questionnaires.svg';
import technologies from '../assets/common/technologies.svg';
import analytics from '../assets/common/analytics.svg';
import { RootState } from '../types';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const user = useSelector((state: RootState) => state.userState.user);

  return (
    <div className="w-[150px] h-screen bg-[#1E252F] text-[#888888] p-6 fixed">
      {/* <h1>Sidebar</h1> */}
      <ul className="flex flex-col gap-5 place-content-center text-center bg-[#1E252F] font-['Open_Sans'] text-base">
        {!user?.user.isAdmin && (
          <Link to="/crm">
            <li className="w-[100px] h-[100px] opacity-50 active:text-[#E4F1FF] active:bg-[#2F4865] active:opacity-100 hover:text-[#E4F1FF] hover:bg-[#1F3145] hover:text-[#FFFFFF] hover:opacity-100 duration-500 rounded-lg p-1">
              <div className="flex flex-col items-center">
                <img src={logo} width={50} height={50}></img>
                <h2>Портал учасника</h2>
              </div>
            </li>
          </Link>
        )}
        <Link to="projects">
          <li className="w-[100px] h-[100px] opacity-50 active:text-[#E4F1FF] active:bg-[#2F4865] active:opacity-100 hover:text-[#E4F1FF] hover:bg-[#1F3145] hover:text-[#FFFFFF] hover:opacity-100 duration-500 rounded-lg p-1">
            <div className="flex flex-col items-center">
              <img src={projects} width={50} height={50}></img>
              <h2>Проєкти</h2>
            </div>
          </li>
        </Link>
        {user?.user.isAdmin && (
          <Link to="questionnaires">
            <li className="w-[100px] h-[100px] opacity-50 active:text-[#E4F1FF] active:bg-[#2F4865] active:opacity-100 hover:text-[#E4F1FF] hover:bg-[#1F3145] hover:text-[#FFFFFF] hover:opacity-100 duration-500 rounded-lg p-1">
              <div className="flex flex-col items-center">
                <img src={questionnaires} width={50} height={50}></img>
                <h2>Анкети</h2>
              </div>
            </li>
          </Link>
        )}
        {user?.user.isAdmin && (
          <Link to="analytics">
            <li className="w-[100px] h-[100px] opacity-50 active:text-[#E4F1FF] active:bg-[#2F4865] active:opacity-100 hover:text-[#E4F1FF] hover:bg-[#1F3145] hover:text-[#FFFFFF] hover:opacity-100 duration-500 rounded-lg p-1">
              <div className="flex flex-col items-center">
                <img src={analytics} width={50} height={50}></img>
                <h2>Аналітика</h2>
              </div>
            </li>
          </Link>
        )}
        {user?.user.isAdmin && (
          <Link to="technologies">
            <li className="w-[100px] h-[100px] opacity-50 active:text-[#E4F1FF] active:bg-[#2F4865] active:opacity-100 hover:text-[#E4F1FF] hover:bg-[#1F3145] hover:text-[#FFFFFF] hover:opacity-100 duration-500 rounded-lg p-1">
              <div className="flex flex-col items-center">
                <img src={technologies} width={50} height={50}></img>
                <h2>Спеціалізації та технології</h2>
              </div>
            </li>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
