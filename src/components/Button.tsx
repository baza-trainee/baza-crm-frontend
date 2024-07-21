import React from 'react';

type ButtonProps = {
  label: string;
  onClick?: () => void;
  additionalClass?: string;
};

const Button: React.FC<ButtonProps> = ({ label, onClick, additionalClass }) => {
  return (
    <button
      className={`w-[254px] duration-500 h-10 text-white rounded ${additionalClass}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
