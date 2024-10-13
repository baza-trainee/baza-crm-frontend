import Select, { StylesConfig, SingleValue } from 'react-select';
import { useState } from 'react';
import Wrapper from './Wrapper';
import useMenuState from '../hooks';
import { SelectOptionType, Member } from '../types';
import FilterMembersTable from './Analytics/FilterMembersTable';

const sortOptions: SelectOptionType[] = [
  { value: 'specializationАZ', label: 'Спеціалізація від A до Z' },
  { value: 'specializationZА', label: 'Спеціалізація від Z до A' },
  { value: 'countryAZ', label: 'Країна від А до Z' },
  { value: 'countryZA', label: 'Країна від Z до А' },
  { value: 'cityAZ', label: 'Місто від А до Z' },
  { value: 'cityZA', label: 'Місто від Z до A' },
  { value: 'statusAZ', label: 'Статус від А до Z' },
  { value: 'statusZA', label: 'Статус від Z до А' },
  {
    value: 'dateDown',
    label: 'Дата реєстрації від найновіших до найдавніших',
  },
  {
    value: 'dateUp',
    label: 'Дата реєстрації від до найдавніших найновіших',
  },
  {
    value: 'sumUp',
    label: 'Бали від найменших до найбільших',
  },
  {
    value: 'sumDowm',
    label: 'Бали від найбільших  до найменших ',
  },
  {
    value: 'scoreUp',
    label: 'Оцінка від найменшої до найбільшої',
  },
  {
    value: 'scoreDown',
    label: 'Оцінка від найбільшої до найменшої ',
  },
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

type SortMembersProps = {
  members: Member[];
};

const SortMembers: React.FC<SortMembersProps> = ({ members }) => {
  const [selectedOptions, setSelectedOptions] = useState<SelectOptionType>();
  const [sortedMembers, setSortedMembers] = useState<Member[]>([...members]);
  const { isMenuOpen, handleMenuOpen, handleMenuClose } = useMenuState();

  const sortMembers = (members: Member[], option: string) => {
    if (option === 'specializationАZ') {
      return members.sort((a, b) => {
        const aSpecializationName = a.specializations[0]?.name || '';
        const bSpecializationName = b.specializations[0]?.name || '';
        return aSpecializationName.localeCompare(bSpecializationName, 'en', {
          numeric: true,
        });
      });
    } else if (option === 'specializationZА') {
      return [...members].sort((a, b) => {
        const aSpecializationName = a.specializations[0]?.name || '';
        const bSpecializationName = b.specializations[0]?.name || '';
        return bSpecializationName.localeCompare(aSpecializationName, 'en', {
          numeric: true,
        });
      });
    } else if (option === 'countryAZ') {
      return [...members].sort((a, b) => {
        return a.country.toLowerCase().localeCompare(b.country, 'en', {
          numeric: true,
        });
      });
    } else if (option === 'countryZA') {
      return [...members].sort((a, b) => {
        return b.country.toLowerCase().localeCompare(a.country, 'en', {
          numeric: true,
        });
      });
    } else if (option === 'cityAZ') {
      return [...members].sort((a, b) => {
        return a.city.localeCompare(b.city, 'en', {
          numeric: true,
        });
      });
    } else if (option === 'cityZA') {
      return [...members].sort((a, b) => {
        return b.city.localeCompare(a.city, 'en', {
          numeric: true,
        });
      });
    } else if (option === 'statusAZ') {
      return [...members].sort((a, b) => {
        return a.status.localeCompare(b.status, 'en', {
          numeric: true,
        });
      });
    } else if (option === 'statusZA') {
      return [...members].sort((a, b) => {
        return b.status.localeCompare(a.status, 'en', {
          numeric: true,
        });
      });
    } else if (option === 'scoreUp') {
      return [...members].sort(
        (a, b) => (a.karmaPoints ?? 0) - (b.karmaPoints ?? 0),
      );
    } else if (option === 'scoreDown') {
      return [...members].sort(
        (a, b) => (b.karmaPoints ?? 0) - (a.karmaPoints ?? 0),
      );
    } else if (option === 'dateUp') {
      return [...members].sort((a, b) => {
        return a.registerAt.localeCompare(b.registerAt, 'en', {
          numeric: true,
        });
      });
    } else if (option === 'dateDown') {
      return [...members].sort((a, b) => {
        return b.registerAt.localeCompare(a.registerAt, 'en', {
          numeric: true,
        });
      });
    } else if (option === 'sumUp') {
      return [...members].sort(
        (a, b) => (a.projectPoints ?? 0) - (b.projectPoints ?? 0),
      );
    } else if (option === 'sumDown') {
      return [...members].sort(
        (a, b) => (b.projectPoints ?? 0) - (a.projectPoints ?? 0),
      );
    }
  };
  const handleChange = (option: SingleValue<SelectOptionType>) => {
    if (option) {
      setSelectedOptions(option);
      const order = option.value;
      const afterSortMembers = sortMembers(members, order as string);
      setSortedMembers(afterSortMembers ?? []);
    } else {
      setSelectedOptions(undefined);
    }
  };
  return (
    <div className={'flex'}>
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
      <FilterMembersTable members={sortedMembers} error={'error'} />
    </div>
  );
};

export default SortMembers;
