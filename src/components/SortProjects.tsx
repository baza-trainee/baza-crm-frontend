import Select, { StylesConfig, SingleValue } from 'react-select';
import { useState } from 'react';
import Wrapper from './Wrapper';
import useMenuState from '../hooks';

type OptionType = {
  value: string;
  label: string;
};

const sortOptions: OptionType[] = [
  { value: 'status from А до Я', label: 'Статус від А до Я' },
  { value: 'status from Я до А', label: 'Статус від Я до А' },
  { value: 'format from А до Я', label: 'Формат від А до Я' },
  { value: 'format from Я до А', label: 'Формат від Я до А' },
];

const customStyles: StylesConfig<OptionType, false> = {
  control: (base) => ({
    ...base,
    border: '2px solid #579DFF',
    cursor: 'pointer',
  }),
  menu: (base) => ({
    ...base,
    border: '2px solid #BCD7FF',
    borderRadius: '10px',
    height: '158px',
    fontSize: '16px',
    lineHeight: '24px',
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

const SortProjects: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<OptionType | null>(
    null,
  );
  const { isMenuOpen, handleMenuOpen, handleMenuClose } = useMenuState();

  const handleChange = (option: SingleValue<OptionType>) =>
    setSelectedOptions(option);

  return (
    <Wrapper isMenuOpen={isMenuOpen}>
      <Select
        options={sortOptions}
        closeMenuOnSelect={false}
        onChange={handleChange}
        value={selectedOptions}
        placeholder="Оберіть порядок"
        isSearchable={false}
        className="w-[228px] mb-4"
        menuIsOpen={isMenuOpen}
        onMenuOpen={handleMenuOpen}
        onMenuClose={handleMenuClose}
        styles={customStyles}
      />
    </Wrapper>
  );
};

export default SortProjects;
