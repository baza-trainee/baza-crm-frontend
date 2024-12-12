import { ReactNode } from 'react';

type WrapperProps = {
  children: ReactNode;
  classNames?: string;
};

const Wrapper: React.FC<WrapperProps> = ({ children, classNames }) => {
  return (
    <div
      className={`flex w-[200px] lg:w-[268px] h-auto flex-col gap-8 px-4 pt-5 pb-10 mb-10 font-sans font-normal text-base bg-[#E9F3FE] border-card-border border-2 border-solid rounded-xl ${classNames}`}
    >
      {children}
    </div>
  );
};
export default Wrapper;
