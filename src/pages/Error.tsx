import { Link } from 'react-router-dom';

import Socials from '../components/Socials';
import errorImage from '../assets/images/error.webp';
import logo from '../assets/common/logo.svg';

const Error: React.FC = () => {
  return (
    <main
      style={{
        backgroundImage: `url(${errorImage})`,
        backgroundPosition: '0% 20%',
      }}
      className="flex flex-col justify-between h-screen bg-cover"
    >
      <div className="flex items-center justify-between px-32 py-8">
        <div>
          <a
            href="http://baza-trainee.tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={logo}
              alt="Baza Trainee logo"
              className="duration-500 rounded-full hover:bg-primary-blue"
            />
          </a>
        </div>
        <Socials />
      </div>
      <Link
        to="/"
        className="border-2 border-primary-blue rounded-[10px] duration-500 bg-primary-blue text-white hover:bg-transparent font-semibold flex justify-center items-center w-[268px] h-10 mx-auto mb-5 lg:mt-10"
      >
        На головну
      </Link>
      <div></div>
      <div></div>
    </main>
  );
};

export default Error;
