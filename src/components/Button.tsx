import React from 'react';

export type ButtonProps = {
  label: string;
};

const Button: React.FC<ButtonProps> = ({ label }) => {
  return (
    <button className="w-[130px] h-[40px] border-2 border-solid border-primary-blue hover:bg-primary-blue hover:text-white rounded-lg font-sans font-semibold text-base">
      {label}
    </button>
  );
};

export default Button;
