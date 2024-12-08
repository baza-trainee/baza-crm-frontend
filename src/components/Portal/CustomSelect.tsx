import React from 'react';
import Select, {
  components,
  MultiValue,
  DropdownIndicatorProps,
  ActionMeta,
  StylesConfig,
  OptionProps,
} from 'react-select';
import chevronDown from '../../assets/common/chevron-down.svg';
import CustomOption from './CustomOption';
import { SelectOption } from '../../types';

const DropdownIndicator = (
  props: DropdownIndicatorProps<SelectOption, true>,
) => {
  return (
    <components.DropdownIndicator {...props}>
      <img src={chevronDown} alt="chevronDownIcon" width={24} height={24} />
    </components.DropdownIndicator>
  );
};

type CustomSelectProps = {
  options: SelectOption[];
  value: SelectOption[];
  onChange: (
    newValue: MultiValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>,
  ) => void;
  label: string;
  components?: {
    Option?: React.ComponentType<OptionProps<SelectOption>>;
  };
};

const customStyles: StylesConfig<SelectOption, true> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#E8F2FF' : '#F8F9FD',
    borderRadius: '10px',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'lightgray',
    boxShadow: 'none',
    '&:hover': {
      borderColor: 'gray',
    },
    minHeight: '40px',
  }),
  multiValue: () => ({
    display: 'none',
  }),
  multiValueLabel: () => ({
    display: 'none',
  }),
  multiValueRemove: () => ({
    display: 'none',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  label,
}) => {
  return (
    <div>
      <label className="text-text-black font-open-sans text-[20px] font-normal leading-[28px] tracking-[0.4px]">
        {label}
      </label>
      <Select
        closeMenuOnSelect={false}
        components={{ DropdownIndicator, Option: CustomOption }}
        isMulti
        options={options}
        value={value}
        onChange={onChange}
        className="basic-single"
        classNamePrefix="select"
        placeholder=""
        styles={customStyles}
        hideSelectedOptions={false}
      />
    </div>
  );
};

export default CustomSelect;
