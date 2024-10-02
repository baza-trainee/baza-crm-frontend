import { Link } from 'react-router-dom';

import Socials from '../Socials';

const Footer: React.FC = () => {
  return (
    <footer className="px-[120px] py-[50px] bg-sidebar-bg flex flex-col items-center gap-[50px] ">
      <div className="flex gap-[100px] justify-center items-center">
        <Socials />
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
