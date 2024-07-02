import { Link } from 'react-router-dom';
import logoIcon from '../../assets/common/logo.svg';
import discordIcon from '../../assets/common/discord.svg';
import linkedinIcon from '../../assets/common/linkedin.svg';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-screen">
      <Link to="/">
        <img src={logoIcon} width={100} height={100} alt="Logo" />
      </Link>
      <nav className="flex space-x-4">
        <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
          <img src={discordIcon} width={32} height={32} alt="Discord" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={linkedinIcon} width={32} height={32} alt="LinkedIn" />
        </a>
      </nav>
    </header>
  );
};

export default Header;
