import { Link } from 'react-router-dom';
import logoheader from '../assets/common/logo-header.svg';

const Header = () => {
  return (
    <div className="h-[70px] w-screen z-50 bg-[#0A1321] text-[#888888] top-0 fixed px-10">
      <ul className="flex flex-row justify-between items-center font-['Open_Sans'] text-base">
        <Link to="https://baza-trainee.tech/ua">
          <li className="hover:text-[#E4F1FF] hover:bg-[#788AA0] duration-500 my-2.5">
            <img src={logoheader} width={50} height={50}></img>
          </li>
        </Link>
        <Link to="/">
          <li>
            {/* <div className="flex flex-col items-center">
              <img src={projects} width={50} height={50}></img>
              <h2>Проєкти</h2>
            </div> */}
            <button className="w-[100px] h-[40px] bg-[#1E70EB] text-white rounded-lg">
              Вийти
            </button>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Header;
