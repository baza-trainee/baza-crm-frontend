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
        className="flex justify-center items-center bg-primary-blue border-2 border-primary-blue hover:bg-transparent w-[100px] duration-500 h-10 text-white rounded-[10px]"
      >
        Вийти
      </Link>
    </header>
  );
};

export default Header;
