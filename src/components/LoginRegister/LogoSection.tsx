import Logo from '../Logo';

type LogoSectionProps = {
  title: string;
  width?: string;
};

const LogoSection: React.FC<LogoSectionProps> = ({
  title,
  width = '700px',
}) => {
  return (
    <div className="pt-[50px]">
      <div className="w-full mb-[30px] flex justify-center">
        <Logo size={150} />
      </div>
      <div className={`w-[${width}] text-center pt-[50px] mx-auto`}>
        <h1 className="font-Lato font-sans text-[40px] text-white">{title}</h1>
      </div>
    </div>
  );
};

export default LogoSection;
