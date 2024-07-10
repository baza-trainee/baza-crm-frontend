import { Link } from 'react-router-dom';
import logoIcon from '../../assets/common/logo.svg';
import discordIcon from '../../assets/common/discord.svg';
import linkedinIcon from '../../assets/common/linkedin.svg';

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
      <nav className="flex gap-[50px]">
        <Link
          to="https://discord.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={discordIcon} width={32} height={32} alt="Discord" />
        </Link>
        <Link
          to="https://www.linkedin.com/company/baza-trainee-ukraine/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={linkedinIcon} width={32} height={32} alt="LinkedIn" />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
