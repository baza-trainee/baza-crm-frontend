import { UseFormRegister } from 'react-hook-form';
import { UserData } from '../../types';
import { useState } from 'react';

interface CustomInputProps {
  id: keyof UserData;
  label: string;
  type?: string;
  placeholder?: string;
  icon?: string;
  className?: string;
  register: UseFormRegister<UserData>;
}

const CustomInput: React.FC<CustomInputProps> = ({
  id,
  label,
  type,
  placeholder,
  icon,
  register,
}) => {
  const [isEditable, setIsEditable] = useState(false);

  const handleEditClick = () => {
    setIsEditable(true);
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="text-text-black font-open-sans text-[20px] font-normal leading-[28px] tracking-[0.4px]"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          className={`mt-2 mb-2 rounded-[10px] border-2 border-solid border-input-normal-state bg-light-blue-bg hover:bg-hover-blue px-4 h-10 w-full font-open-sans text-base font-normal leading-[26px] hover:outline-none focus:outline-none ${
            isEditable ? 'cursor-text' : 'cursor-default'
          }`}
          id={id}
          placeholder={placeholder}
          readOnly={!isEditable}
          {...register(id)}
        />
        {icon && (
          <button
            type="button"
            onClick={handleEditClick}
            className="absolute right-4 bottom top-4"
          >
            <img src={icon} alt={icon} width={24} height={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomInput;
