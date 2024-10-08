import Select, { StylesConfig, SingleValue } from 'react-select';
import { useState } from 'react';
import Wrapper from './Wrapper';
import useMenuState from '../hooks';
import { SelectOptionType, Member } from '../types';
// import FilterMembersTable from './Analytics/FilterMembersTable';

const sortOptions: SelectOptionType[] = [
  { value: 'specializationАZ', label: 'Спеціалізація від A до Z' },
  { value: 'specializationZА', label: 'Спеціалізація від Z до A' },
  { value: 'countryАZ', label: 'Країна від А до Z' },
  { value: 'countryZА', label: 'Країна від Z до А' },
  { value: 'cityАZ', label: 'Місто від А до Z' },
  { value: 'cityZА', label: 'Місто від Z до A' },
  { value: 'statusАZ', label: 'Статус від А до Z' },
  { value: 'statusZА', label: 'Статус від Z до А' },
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
  console.log(members);

  const [selectedOptions, setSelectedOptions] = useState<SelectOptionType>();
  const [sortedMembers, setSortedMembers] = useState<Member[]>([...members]);
  console.log(sortedMembers);
  const { isMenuOpen, handleMenuOpen, handleMenuClose } = useMenuState();

  const sortMembers = (members: Member[], option: string) => {
    // if (option === 'specializationАZ') {
    //   return members.sort((a, b) => {
    //     return a.specializations.localeCompare(b.specializations, 'en', {
    //       numeric: true,
    //     });
    //   });
    // }
    // if (option === 'specializationZA') {
    //   return members.sort((a, b) => {
    //     return b.specializations.localeCompare(a.specializations, 'en', {
    //       numeric: true,
    //     });
    //   });
    // }

    if (option === 'countryАZ') {
      return members.sort((a, b) => {
        return a.country.localeCompare(b.country, 'en', {
          numeric: true,
        });
      });
    }
    if (option === 'countryZA') {
      return members.sort((a, b) => {
        return b.country.localeCompare(a.country, 'en', {
          numeric: true,
        });
      });
    }
    if (option === 'cityАZ') {
      return members.sort((a, b) => {
        return a.city.localeCompare(b.city, 'en', {
          numeric: true,
        });
      });
    }
    if (option === 'cityZA') {
      return members.sort((a, b) => {
        return b.city.localeCompare(a.city, 'en', {
          numeric: true,
        });
      });
    }
    if (option === 'statusAZ') {
      return members.sort((a, b) => {
        return a.status.localeCompare(b.status, 'en', {
          numeric: true,
        });
      });
    }
    if (option === 'statusZA') {
      return members.sort((a, b) => {
        return b.status.localeCompare(a.status, 'en', {
          numeric: true,
        });
      });
    }

    if (option === 'scoreUp') {
      return members.sort((a, b) => (a.teamMark ?? 0) - (b.teamMark ?? 0));
    }
    if (option === 'scoreDown') {
      return members.sort((a, b) => (b.teamMark ?? 0) - (a.teamMark ?? 0));
    }
    if (option === 'dateUp') {
      return members.sort((a, b) => {
        return a.registerAt.localeCompare(b.registerAt, 'en', {
          numeric: true,
        });
      });
    }
    if (option === 'dateDown') {
      return members.sort((a, b) => {
        return b.registerAt.localeCompare(a.registerAt, 'en', {
          numeric: true,
        });
      });
    }
    if (option === 'sumUp') {
      return members.sort((a, b) => (a.scores ?? 0) - (b.scores ?? 0));
    }
    if (option === 'sumDown') {
      return members.sort((a, b) => (b.scores ?? 0) - (a.scores ?? 0));
    }
  };
  const handleChange = (option: SingleValue<SelectOptionType>) => {
    console.log(option?.value);
    if (option) {
      setSelectedOptions(option);
      const order = option.value;
      const afterSortMembers = sortMembers(members, order);
      setSortedMembers(afterSortMembers ?? []);
    } else {
      setSelectedOptions(undefined);
    }
  };
  return (
    <div>
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
      {/* <FilterMembersTable members={sortedMembers} /> */}
    </div>
  );
};

export default SortMembers;
