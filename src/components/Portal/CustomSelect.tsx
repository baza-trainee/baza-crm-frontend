import React from 'react';
import Select, {
  components,
  MultiValue,
  DropdownIndicatorProps,
  ActionMeta,
} from 'react-select';
import chevronDown from '../../assets/common/chevron-down.svg';

export interface SelectOption {
  readonly value: string;
  readonly label: string;
}

const DropdownIndicator = (
  props: DropdownIndicatorProps<SelectOption, true>,
) => {
  return (
    <components.DropdownIndicator {...props}>
      <img src={chevronDown} alt="chevronDownIcon" width={24} height={24} />
    </components.DropdownIndicator>
  );
};

interface CustomSelectProps {
  options: SelectOption[];
  value: SelectOption[];
  onChange: (
    newValue: MultiValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>,
  ) => void;
  label: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  label,
}) => {
  const customStyles = {
    //     control: (provided: any, state: any) => ({
    //       ...provided,
    //       backgroundColor: 'transparent',
    //       borderColor: 'lightgray',
    //       borderWidth: '2px',
    //       borderRadius: '10px',
    //       boxShadow: 'none',
    //       '&:hover': {
    //         borderColor: 'gray',
    //       },
    //       minHeight: '40px',
    //     }),
    //     multiValue: (provided: any) => ({
    //       ...provided,
    //       backgroundColor: '#f0f0f0',
    //       borderRadius: '5px',
    //     }),
    //     multiValueLabel: (provided: any) => ({
    //       ...provided,
    //       color: '#333',
    //     }),
    //     multiValueRemove: (provided: any) => ({
    //       ...provided,
    //       color: '#999',
    //       ':hover': {
    //         backgroundColor: '#eee',
    //         color: '#666',
    //       },
    //     }),
    //     dropdownIndicator: (provided: any) => ({
    //       ...provided,
    //       padding: '0',
    //     }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    //     placeholder: () => ({
    //       display: 'none',
    //     }),
  };
  return (
    <div>
      <label className="text-text-black font-open-sans text-[20px] font-normal leading-[28px] tracking-[0.4px]">
        {label}
      </label>
      <Select
        closeMenuOnSelect={false}
        components={{ DropdownIndicator }}
        isMulti
        options={options}
        value={value}
        onChange={onChange}
        className="basic-single"
        classNamePrefix="select"
        placeholder=""
        styles={customStyles}
      />
    </div>
  );
};

export default CustomSelect;
