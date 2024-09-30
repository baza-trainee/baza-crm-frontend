import { Link } from 'react-router-dom';

import discordIcon from '../../assets/common/discord.svg';
import linkedinIcon from '../../assets/common/linkedin.svg';

const Footer: React.FC = () => {
  return (
    <footer className="px-[120px] py-[50px] bg-sidebar-bg flex flex-col items-center gap-[50px] ">
      <div className="flex gap-[100px] justify-center items-center">
        <div className="flex gap-[50px]">
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
        </div>
        <Link
          to="/rules.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-light-grey text-sm font-open-sans font-normal leading-[22px] underline duration-500 hover:text-primary-blue"
        >
          Правила користування сайтом
        </Link>
        <Link
          to="/privacy-policy.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-light-grey text-base font-open-sans font-normal leading-[26px] underline duration-500 hover:text-primary-blue"
        >
          Політика конфіденційності
        </Link>
      </div>
      <p className="inline-flex text-light-grey text-sm font-open-sans font-normal leading-[22px]">
        Розробка Baza Trainee Ukraine 2024 © Усі права захищені
      </p>
    </footer>
  );
};

export default Footer;
