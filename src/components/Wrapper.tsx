import { ReactNode } from 'react';

type WrapperProps = {
  children: ReactNode;
  isMenuOpen: boolean;
  height: string;
  maxHeight?: string;
  width: string;
};

const Wrapper: React.FC<WrapperProps> = ({
  isMenuOpen,
  children,
  height,
  // maxHeight,
  width,
}) => {
  return (
    <div
      className="px-5 pt-5 pb-10 mb-10 font-sans font-normal text-base bg-[#E9F3FE] border-card-border border-2 border-solid rounded-xl"
      style={{
        height: isMenuOpen ? height : 'auto',
        // maxHeight: maxHeight,
        // maxHeight: '258px',
        width: width,
        transition: 'height 0.3s ease',
      }}
    >
      {children}
    </div>
  );
};
export default Wrapper;
