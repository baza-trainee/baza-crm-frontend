import Select, { MultiValue, StylesConfig } from 'react-select';
import { useState } from 'react';
import { CustomOption } from './CustomOption';
import Wrapper from './Wrapper';
import useMenuState from '../hooks';

type OptionType = {
  value: string;
  label: string;
};

const statusOptions: OptionType[] = [
  { value: 'active', label: 'Активний' },
  { value: 'in project', label: 'На проєкті' },
  { value: 'paused', label: 'На паузі' },
];

const specsOptions: OptionType[] = [
  { value: 'Design', label: 'Design' },
  { value: 'Frontend', label: 'Frontend' },
  { value: 'Backend', label: 'Backend' },
  { value: 'Full Stack', label: 'Full Stack' },
  { value: 'QA Manual', label: 'QA Manual' },
  { value: 'PM', label: 'PM' },
];

const technologyOptions: OptionType[] = [
  { value: 'Figma', label: 'Figma' },
  { value: 'UI/UX', label: 'UI/UX' },
  { value: 'Canva', label: 'Canva' },
  { value: 'Adobe  Illustrator', label: 'Adobe  Illustrator' },
  { value: 'Photoshop', label: 'Photoshop' },
  { value: 'Node.js', label: 'Node.js' },
  { value: 'Java', label: 'Java' },
  { value: 'React', label: 'React' },
  { value: 'Vue', label: 'Vue' },
  { value: 'Angular', label: 'Angular' },
  { value: 'Swagger', label: 'Swagger' },
  { value: 'Postman', label: 'Postman' },
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
    // height: '124px',
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
    // cursor: state.isDisabled ? 'not-allowed' : 'pointer',
    backgroundColor: state.isSelected ? '#D2E4FF' : 'white',
    color: 'black',
    '&:hover': {
      backgroundColor: '#D2E4FF',
      borderColor: 'card-border',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    cursor: 'default',
  }),
};

const FilterMembers: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<MultiValue<OptionType>>(
    [],
  );
  const [selectedSpec, setSelectedSpec] = useState<MultiValue<OptionType>>([]);
  const [selectedTechnology, setSelectedTechnology] = useState<
    MultiValue<OptionType>
  >([]);
  const { isMenuOpen, handleMenuOpen, handleMenuClose } = useMenuState();

  const handleStatusChange = (selected: MultiValue<OptionType>) => {
    setSelectedStatus(selected);
  };
  const handleSpecChange = (selected: MultiValue<OptionType>) => {
    setSelectedSpec(selected);
  };
  const handleTechnologyChange = (selected: MultiValue<OptionType>) => {
    setSelectedTechnology(selected);
  };

  return (
    <div>
      <Wrapper isMenuOpen={isMenuOpen} height="1182px" width="268px">
        <Select
          options={statusOptions}
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
          options={specsOptions}
          isMulti
          controlShouldRenderValue={false}
          hideSelectedOptions={false}
          closeMenuOnSelect={false}
          onChange={handleSpecChange}
          value={selectedSpec}
          placeholder="Спеціалізація"
          components={{
            Option: CustomOption,
          }}
          className="w-[228px] mb-4 "
          // classNamePrefix="react-select"
          menuIsOpen={isMenuOpen}
          onMenuOpen={handleMenuOpen}
          onMenuClose={handleMenuClose}
          styles={customStyles}
        />
        <Select
          options={technologyOptions}
          isMulti
          controlShouldRenderValue={false}
          hideSelectedOptions={false}
          closeMenuOnSelect={false}
          onChange={handleTechnologyChange}
          value={selectedTechnology}
          placeholder="Технології"
          components={{
            Option: CustomOption,
          }}
          className="w-[228px] mb-[24px]"
          // classNamePrefix="react-select"
          menuIsOpen={isMenuOpen}
          onMenuOpen={handleMenuOpen}
          onMenuClose={handleMenuClose}
          styles={customStyles}
        />
        {/* // datepicker */}
      </Wrapper>
    </div>
  );
};
export default FilterMembers;
