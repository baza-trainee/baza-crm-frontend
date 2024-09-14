import { Link } from 'react-router-dom';
import logo from '../assets/common/client_login.svg';
import projects from '../assets/common/projects.svg';
import knowledge from '../assets/common/knowledge.svg';
import news from '../assets/common/news.svg';
import loyalty from '../assets/common/loyalty_programs.svg';
// import events from '../assets/common/events.svg';

const Sidebar = () => {
  return (
    <div className="w-[150px] h-screen bg-[#3B3E57] text-[#888888] p-6 fixed">
      {/* <h1>Sidebar</h1> */}
      <ul className="flex flex-col gap-5 place-content-center text-center font-['Open_Sans'] text-base">
        <Link to="/crm">
          <li className="opacity-50 hover:text-[#E4F1FF] hover:bg-[#788AA0] hover:opacity-100 duration-500 rounded-lg p-1">
            <div className="flex flex-col items-center">
              <img src={logo} width={50} height={50}></img>
              <h2>Портал учасника</h2>
            </div>
          </li>
        </Link>
        <Link to="projects">
          <li className="opacity-50 hover:text-[#E4F1FF] hover:bg-[#788AA0] hover:opacity-100 duration-500 rounded-lg p-1">
            <div className="flex flex-col items-center">
              <img src={projects} width={50} height={50}></img>
              <h2>Проєкти</h2>
            </div>
          </li>
        </Link>
        <Link to="knowledge">
          <li className="opacity-50 hover:text-[#E4F1FF] hover:bg-[#788AA0] hover:opacity-100 duration-500 rounded-lg p-1">
            <div className="flex flex-col items-center">
              <img src={knowledge} width={50} height={50}></img>
              <h2>База знань</h2>
            </div>
          </li>
        </Link>
        <Link to="communication">
          <li className="opacity-50 hover:text-[#E4F1FF] hover:bg-[#788AA0] hover:opacity-100 duration-500 rounded-lg p-1">
            <div className="flex flex-col items-center">
              <img src={news} width={50} height={50}></img>
              <h2>Новини</h2>
            </div>
          </li>
        </Link>
        <Link to="analytics">
          <li className="opacity-50 hover:text-[#E4F1FF] hover:bg-[#788AA0] hover:opacity-100 duration-500 rounded-lg p-1">
            <div className="flex flex-col items-center">
              <img src={logo} width={50} height={50}></img>
              <h2>Аналітика</h2>
            </div>
          </li>
        </Link>
        <Link to="questionnaires">
          <li className="opacity-50 hover:text-[#E4F1FF] hover:bg-[#788AA0] hover:opacity-100 duration-500 rounded-lg p-1">
            <div className="flex flex-col items-center">
              <img src={loyalty} width={50} height={50}></img>
              <h2>Анкети</h2>
            </div>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
