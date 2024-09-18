import Select, { MultiValue, StylesConfig } from 'react-select';
import { useState } from 'react';
import { CustomOption } from './CustomOption';
import Wrapper from './Wrapper';
import useMenuState from '../hooks';

type OptionType = {
  value: string;
  label: string;
};

const filterOptions: OptionType[] = [
  { value: 'team', label: 'Формується команда' },
  { value: 'development', label: 'В розробці' },
  { value: 'completed', label: 'Завершений' },
];

const sortOptions: OptionType[] = [
  { value: 'team', label: 'Free' },
  { value: 'development', label: 'Light' },
  { value: 'completed', label: 'Strong' },
];

const customStyles: StylesConfig<OptionType, true> = {
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
    height: '124px',
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
    // cursor: state.isDisabled ? 'not-allowed' : 'pointer',
    backgroundColor: state.isSelected ? '#D2E4FF' : 'white',
    color: 'black',
    '&:hover': {
      backgroundColor: '#D2E4FF',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    cursor: 'default',
  }),
};

const FilterProjects: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<MultiValue<OptionType>>(
    [],
  );
  const [selectedFormat, setSelectedFormat] = useState<MultiValue<OptionType>>(
    [],
  );
  const { isMenuOpen, handleMenuOpen, handleMenuClose } = useMenuState();

  const handleStatusChange = (selected: MultiValue<OptionType>) => {
    setSelectedStatus(selected);
  };
  const handleFormatChange = (selected: MultiValue<OptionType>) => {
    setSelectedFormat(selected);
  };

  return (
    <Wrapper isMenuOpen={isMenuOpen} height="432px" width="268px">
      <Select
        options={filterOptions}
        controlShouldRenderValue={false}
        hideSelectedOptions={false}
        isMulti
        closeMenuOnSelect={false}
        onChange={handleStatusChange}
        value={selectedStatus}
        placeholder="Статус"
        components={{
          Option: CustomOption,
        }}
        className="w-[228px] mb-4"
        // classNamePrefix="react-select"
        menuIsOpen={isMenuOpen}
        onMenuOpen={handleMenuOpen}
        onMenuClose={handleMenuClose}
        styles={customStyles}
      />
      <Select
        options={sortOptions}
        isMulti
        controlShouldRenderValue={false}
        hideSelectedOptions={false}
        closeMenuOnSelect={false}
        onChange={handleFormatChange}
        value={selectedFormat}
        placeholder="Формат"
        components={{
          Option: CustomOption,
        }}
        className="w-[228px] hover:border-card-border"
        // classNamePrefix="react-select"
        menuIsOpen={isMenuOpen}
        onMenuOpen={handleMenuOpen}
        onMenuClose={handleMenuClose}
      />
    </Wrapper>
  );
};
export default FilterProjects;
