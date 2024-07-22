import React from 'react';

interface TooltipProps {
  text: string;
  link?: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, link }) => {
  return (
    <div className="absolute top-[30px] w-[333px] font-semibold text-[16px] p-[20px] bg-[#d2e4ff] rounded-[10px]">
      {text}
      {link && <span>{link}</span>}
    </div>
  );
};

export default Tooltip;
