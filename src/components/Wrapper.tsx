import { ReactNode } from 'react';

type WrapperProps = {
  children: ReactNode;
  isMenuOpen: boolean;
};

const Wrapper: React.FC<WrapperProps> = ({ isMenuOpen, children }) => {
  return (
    <div
      className="w-[268px]  px-5 pt-5 pb-10 mb-10 font-sans font-normal text-base bg-[#E9F3FE] border-card-border border-2 border-solid rounded-xl"
      style={{
        height: isMenuOpen ? '258px' : 'auto',
        transition: 'height 0.3s ease',
      }}
    >
      {children}
    </div>
  );
};
export default Wrapper;
