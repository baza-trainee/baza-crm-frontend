import Select, { MultiValue, StylesConfig } from 'react-select';
import { Controller, Control } from 'react-hook-form';
import { CustomOption } from './CustomOption';
import useMenuState from '../hooks';
import { FormData } from './AnalyticsForm';
import { SelectOptionType } from '../types';

const customStyles: StylesConfig<SelectOptionType, true> = {
  control: (base) => ({
    ...base,
    border: '2px solid #579DFF',
    cursor: 'pointer',
    '&:hover': {
      cursor: 'pointer',
      borderColor: '#007bff',
    },
  }),
  menu: (base) => ({
    ...base,
    border: '2px solid #BCD7FF',
    borderRadius: '10px',
    height: 'auto',
    fontSize: '16px',
    lineHeight: '24px',
    position: 'relative',
  }),
  option: (base, state) => ({
    ...base,
    cursor: 'pointer',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '10px',
    backgroundColor: state.isSelected ? '#D2E4FF' : 'white',
    color: 'black',
    '&:hover': {
      backgroundColor: '#D2E4FF',
    },
  }),
  singleValue: (base) => ({
    ...base,
    cursor: 'default',
  }),
};

type MultiSelectProps = {
  placeholder: string;
  options: SelectOptionType[];
  // selectedValue: MultiValue<SelectOptionType>;
  // setSelectedValue: (data: MultiValue<SelectOptionType>) => void;
  control: Control<FormData>;
  className: string;
  name: keyof FormData;
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  placeholder,
  control,
  className,
  name,
}) => {
  const { isMenuOpen, handleMenuOpen, handleMenuClose } = useMenuState();

  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={{ required: 'This field is required' }}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            isMulti
            controlShouldRenderValue={false}
            hideSelectedOptions={false}
            closeMenuOnSelect={false}
            onChange={(selectedValue: MultiValue<SelectOptionType>) => {
              field.onChange(selectedValue);
            }}
            value={field.value}
            placeholder={placeholder}
            components={{
              Option: CustomOption,
            }}
            className={className}
            menuIsOpen={isMenuOpen}
            onMenuOpen={handleMenuOpen}
            onMenuClose={handleMenuClose}
            styles={customStyles}
          />
        )}
      />
    </div>
  );
};

export default MultiSelect;
