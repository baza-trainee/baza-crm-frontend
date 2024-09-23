export type ButtonProps = {
  label: string;
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ label, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`w-[130px] h-[40px] cursor-pointer border-2 border-solid border-primary-blue hover:bg-primary-blue hover:text-white rounded-lg font-sans font-semibold text-base ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
