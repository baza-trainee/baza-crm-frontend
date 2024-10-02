import { Link } from 'react-router-dom';

import Logo from './Logo';

const Header = () => {
  return (
    <header className="h-[70px] w-full z-50 bg-top-menu-dark top-0 fixed px-10 flex justify-between items-center">
      <Logo size={40} />
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
