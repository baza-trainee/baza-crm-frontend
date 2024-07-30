import { UseFormRegister } from 'react-hook-form';
import { UserData } from './PortalUserForm';

interface CustomInputProps {
  name: keyof UserData;
  label: string;
  type?: string;
  placeholder?: string;
  icon?: string;
  register: UseFormRegister<UserData>;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type,
  placeholder,
  icon,
  register,
  name,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-text-black font-open-sans text-[20px] font-normal leading-[28px] tracking-[0.4px]"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          className="rounded-[10px] border-2 border-solid border-input-normal-state bg-light-blue-bg hover:bg-hover-blue px-4 h-10 w-full font-open-sans text-base font-normal leading-[26px]"
          id={name}
          placeholder={placeholder}
          {...register(name)}
        />
        {icon && (
          <button type="button" className="absolute right-4 bottom top-2">
            <img src={icon} alt={icon} width={24} height={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomInput;
