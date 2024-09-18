import Select, { StylesConfig, SingleValue } from 'react-select';
import { useState } from 'react';
import Wrapper from './Wrapper';
import useMenuState from '../hooks';

type OptionType = {
  value: string;
  label: string;
};

const sortOptions: OptionType[] = [
  { value: 'specialization from А to Z', label: 'Спеціалізація від A до Z' },
  { value: 'specialization from Z to А', label: 'Спеціалізація від Z до A' },
  { value: 'country from А to Z', label: 'Країна від А до Z' },
  { value: 'country from Z to А', label: 'Країна від Z до А' },
  { value: 'city from А to Z', label: 'Місто від А до Z' },
  { value: 'city from Z to А', label: 'Місто від Z до A' },
  { value: 'status from А to Z', label: 'Статус від А до Z' },
  { value: 'status from Z to А', label: 'Статус від Z до А' },
  {
    value: 'registration date from newest to oldest',
    label: 'Дата реєстрації від найновіших до найдавніших',
  },
  {
    value: 'registration date from oldest to newest',
    label: 'Дата реєстрації від до найдавніших найновіших',
  },
  {
    value: 'sum from lowest to highest',
    label: 'Бали від найменших до найбільших',
  },
  {
    value: 'sum from highest  to lowest',
    label: 'Бали від найбільших  до найменших ',
  },
  {
    value: 'score from lowest to highest',
    label: 'Оцінка від найменшої до найбільшої',
  },
  {
    value: 'score from highest to lowest',
    label: 'Оцінка від найбільшої до найменшої ',
  },
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
    height: '642px',
    fontSize: '16px',
    lineHeight: '24px',
  }),
  option: (base, state) => ({
    ...base,
    cursor: 'pointer',
    height: 'auto',
    // paddingBottom: '10px',
    backgroundColor: state.isSelected ? '#D2E4FF' : 'white',
    color: 'black',
    '&:hover': {
      backgroundColor: '#D2E4FF',
    },
  }),
};

const SortMembers: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<OptionType | null>(
    null,
  );
  const { isMenuOpen, handleMenuOpen, handleMenuClose } = useMenuState();

  const handleChange = (option: SingleValue<OptionType>) =>
    setSelectedOptions(option);

  return (
    <Wrapper isMenuOpen={isMenuOpen} height={'766px'} width={'302px'}>
      <Select
        options={sortOptions}
        closeMenuOnSelect={false}
        onChange={handleChange}
        value={selectedOptions}
        placeholder="Оберіть порядок"
        isSearchable={false}
        className="w-[262px] mb-4"
        menuIsOpen={isMenuOpen}
        onMenuOpen={handleMenuOpen}
        onMenuClose={handleMenuClose}
        styles={customStyles}
      />
    </Wrapper>
  );
};

export default SortMembers;
