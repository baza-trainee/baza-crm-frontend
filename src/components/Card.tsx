import React from 'react';

type CardProps = {
  text: string;
};

const Card: React.FC<CardProps> = ({ text }) => {
  return (
    <div className="">
      <p> {text}</p>
    </div>
  );
};

export default Card;
