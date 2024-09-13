type CardProps = {
  text: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ text }) => {
  return (
    <div className="p-[50px] w-[539px] h-full md:h-auto lg:h-[264px] max-h-full rounded border border-solid border-white">
      <p className="text-xl font-open-sans leading-[30px] font-normal tracking-[0.4px] text-white">
        {text}
      </p>
    </div>
  );
};

export default Card;
