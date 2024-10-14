type ButtonLoginProps = {
  label: string;
  additionalClass?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

const ButtonLogin: React.FC<ButtonLoginProps> = ({
  label,
  additionalClass = '',
  type = 'button',
  disabled,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`block w-[254px] h-[40px] mx-auto font-Open Sans font-sans text-[16px] font-semibold text-white bg-[#1e70eb] border-primary-blue border-2 border-solid hover:bg-transparent rounded-[10px] ${additionalClass}`}
    >
      {label}
    </button>
  );
};

export default ButtonLogin;
