import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';
import { OptionProps } from 'react-select';

export type OptionType = {
  value: string;
  label: string;
};

export const CustomOption = (props: OptionProps<OptionType>) => (
  <div
    {...props.innerProps}
    className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
  >
    <span className="mr-2">
      {props.isSelected ? (
        <FaCheckSquare size={20} color="#1E70EB" />
      ) : (
        <FaRegSquare size={20} fill="#1E70EB" />
      )}
    </span>
    {props.label}
  </div>
);
