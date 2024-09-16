import { Link } from 'react-router-dom';

import logoHeader from '../assets/common/logo-header.svg';

const Header = () => {
  return (
    <header className="h-[70px] w-full z-50 bg-top-menu-dark top-0 fixed px-10 flex justify-between items-center">
      <a
        href="http://baza-trainee.tech"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center"
      >
        <img
          src={logoHeader}
          alt="Baza Trainee logo"
          className="duration-500 rounded-full hover:bg-primary-blue"
        />
      </a>
      <Link
        to="/"
        className="w-[100px] h-[40px] border-2 border-primary-blue rounded-[10px] duration-500 hover:bg-white hover:text-black font-semibold flex justify-center items-center bg-primary-blue text-white"
      >
        Вийти
      </Link>
    </header>
  );
};

export default Header;
