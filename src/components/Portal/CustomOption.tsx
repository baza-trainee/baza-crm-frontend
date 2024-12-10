import type { SelectOption } from '../../types';
import { components, OptionProps } from 'react-select';
import checkIcon from '../../assets/common/checkbox_select.svg';

const CustomOption = (props: OptionProps<SelectOption>) => {
  const { isSelected, label } = props;
  return (
    <components.Option {...props}>
      <div className="flex items-center">
        <div className="relative flex-shrink-0 w-5 h-5 mr-[10px] border-2 rounded-px[] border-primary-blue">
          {isSelected && (
            <img
              src={checkIcon}
              alt="checked"
              className="absolute inset-0 w-5 h-5 m-auto"
            />
          )}
        </div>
        <span>{label}</span>
      </div>
    </components.Option>
  );
};

export default CustomOption;
