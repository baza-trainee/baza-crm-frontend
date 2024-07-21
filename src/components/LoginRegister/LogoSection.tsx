import React from 'react';
import logo from '../../assets/common/logo.svg';

type LogoSectionProps = {
  title: string;
  width?: string;
};

const LogoSection: React.FC<LogoSectionProps> = ({
  title,
  width = '700px',
}) => {
  return (
    <div>
      <div className="w-full mb-[30px]">
        <img
          src={logo}
          alt="Logo-baza-trainee"
          className="w-[150px] h-[150px] mx-auto"
        />
      </div>
      <div className={`w-[${width}] text-center pt-[50px] mx-auto`}>
        <h1 className="font-Lato font-sans text-[40px] text-white">{title}</h1>
      </div>
    </div>
  );
};

export default LogoSection;
