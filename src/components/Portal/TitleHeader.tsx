type TitleHeaderProps = {
  title: string;
};

const TitleHeader: React.FC<TitleHeaderProps> = ({ title }) => {
  return (
    <div className="h-[60px] flex justify-center items-center text-2xl font-bold text-text-black bg-white rounded-xl border-card-border border">
      <h1>{title}</h1>
    </div>
  );
};

export default TitleHeader;
