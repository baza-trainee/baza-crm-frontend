import Select, { StylesConfig, SingleValue } from 'react-select';
import { useState } from 'react';
import Wrapper from './Wrapper';
import useMenuState from '../hooks';
import { SelectOptionType, Project } from '../types';
import FilterProjectsTable from './Analytics/FilterProjectsTable';

const sortOptions: SelectOptionType[] = [
  { value: 'descendingStatus', label: 'Статус від А до Я' },
  { value: 'ascendingStatus', label: 'Статус від Я до А' },
  { value: 'descendingFormat', label: 'Формат від А до Z' },
  { value: 'ascendingFormat', label: 'Формат від Z до А' },
];

const customStyles: StylesConfig<SelectOptionType, false> = {
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

type SortProjectsProps = {
  projects: Project[];
};

const SortProjects: React.FC<SortProjectsProps> = ({ projects }) => {
  console.log(projects);

  const [selectedOptions, setSelectedOptions] = useState<SelectOptionType>();
  const [sortedProjects, setSortedProjects] = useState<Project[]>([
    ...projects,
  ]);
  const { isMenuOpen, handleMenuOpen, handleMenuClose } = useMenuState();

  const sortProjects = (projects: Project[], option: string) => {
    if (option === 'descendingFormat') {
      return projects.sort((a, b) => {
        return a.projectType.localeCompare(b.projectType, 'en', {
          numeric: true,
        });
      });
    }
    if (option === 'ascendingFormat') {
      return projects.sort((a, b) => {
        return b.projectType.localeCompare(a.projectType, 'en', {
          numeric: true,
        });
      });
    }

    if (option === 'descendingStatus') {
      return projects.sort((a, b) => {
        return a.projectStatus.localeCompare(b.projectStatus, 'en', {
          numeric: true,
        });
      });
    }
    if (option === 'ascendingStatus') {
      return projects.sort((a, b) => {
        return b.projectStatus.localeCompare(a.projectStatus, 'en', {
          numeric: true,
        });
      });
    }
  };
  const handleChange = (option: SingleValue<SelectOptionType>) => {
    console.log(option?.value);
    if (option) {
      setSelectedOptions(option);
      const order = option.value;
      const sortedProjects = sortProjects(projects, order);
      setSortedProjects(sortedProjects ?? []);
    } else {
      setSelectedOptions(undefined);
    }
  };

  return (
    <div className={'flex'}>
      <Wrapper isMenuOpen={isMenuOpen} height={'258px'} width={'268px'}>
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
      <FilterProjectsTable projects={sortedProjects} />
    </div>
  );
};

export default SortProjects;
