import React from 'react';

type CardProps = {
  text: string;
};

const Card: React.FC<CardProps> = ({ text }) => {
  return (
    <div className="p-[50px] w-[539px] h-[264px] rounded border border-solid border-white">
      <p className="text-xl font-open-sans leading-[30px] font-normal tracking-[0.4px] text-white">
        {' '}
        {text}
      </p>
    </div>
  );
};

export default Card;
