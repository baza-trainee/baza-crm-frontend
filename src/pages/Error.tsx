import { Link } from 'react-router-dom';

import Logo from '../components/Logo';
import Socials from '../components/Socials';
import errorImage from '../assets/images/error.webp';

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
        <Logo size={100} />
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
