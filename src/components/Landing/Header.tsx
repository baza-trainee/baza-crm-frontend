import { Link } from 'react-router-dom';

import Socials from '../Socials';
import logoIcon from '../../assets/common/logo.svg';

const Header: React.FC = () => {
  return (
    <header className="w-full px-[120px] py-[30px] flex justify-between items-center ">
      <Link
        to="https://baza-trainee.tech/ua"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={logoIcon} width={100} height={100} alt="Logo" />
      </Link>
      <Socials />
    </header>
  );
};

export default Header;
