import Logo from '../Logo';
import Socials from '../Socials';

const Header: React.FC = () => {
  return (
    <header className="w-full px-[120px] py-[30px] flex justify-between items-center ">
      <Logo size={100} />
      <Socials />
    </header>
  );
};

export default Header;
