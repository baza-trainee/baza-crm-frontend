import { Controller } from 'react-hook-form';
import AnalyticsForm from './AnalyticsForm';
import MultiSelect from './MultiSelect';
import Wrapper from './Wrapper';
import useMenuState from '../hooks';
import { SelectOptionType } from '../types';
import Calendar from './Calendar';
// import FilterMembersTable from './Analytics/FilterMembersTable';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../types';
import { filterProjects } from '../utils/filterApi';

const statusOptions: SelectOptionType[] = [
  { value: 'active', label: 'Активний' },
  { value: 'in project', label: 'На проєкті' },
  { value: 'paused', label: 'На паузі' },
];

const specsOptions: SelectOptionType[] = [
  { value: 'Design', label: 'Design' },
  { value: 'Frontend', label: 'Frontend' },
  { value: 'Backend', label: 'Backend' },
  { value: 'Full Stack', label: 'Full Stack' },
  { value: 'QA Manual', label: 'QA Manual' },
  { value: 'PM', label: 'PM' },
];

const technologyOptions: SelectOptionType[] = [
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

const FilterMembers: React.FC = () => {
  const { isMenuOpen } = useMenuState();

  const user = useSelector((state: RootState) => state.userState.user);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzI4MDcxMDYxLCJleHAiOjE3MjgxNTc0NjF9.DJnPJedZ6rcWXPfDrlsJ4tgw9yzGwroUWubN9soGKaI';
  const {
    data: members,
    // isPending,
    // isError,
  } = useQuery({
    queryKey: ['members', token],
    queryFn: () => filterProjects(token),
    enabled: !!user?.token,
  });
  console.log(members);

  return (
    <div>
      <AnalyticsForm>
        {(control) => (
          <Wrapper isMenuOpen={isMenuOpen} height="432px" width="268px">
            <MultiSelect
              options={statusOptions}
              placeholder={'Статус'}
              control={control}
              className={'w-[228px] mb-4'}
              name="status"
            />
            <MultiSelect
              options={specsOptions}
              placeholder={'Спеціалізація'}
              control={control}
              className={'w-[228px] mb-4'}
              name="specialization"
            />
            <MultiSelect
              options={technologyOptions}
              placeholder={'Технології'}
              control={control}
              className={'w-[228px] mb-24'}
              name="technology"
            />
            <div>
              <p>Період реєстрації</p>

              <Controller
                name="selectedDateFrom"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Calendar
                    text={'з'}
                    selectedDate={value}
                    onDateChange={(date) => {
                      console.log(date);
                      onChange(date);
                    }}
                  />
                )}
              />
              <Controller
                name="selectedDateTo"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Calendar
                    text={'по'}
                    selectedDate={value}
                    onDateChange={onChange}
                  />
                )}
              />
            </div>
          </Wrapper>
        )}
      </AnalyticsForm>
      {/* <FilterMembersTable info={members} /> */}
    </div>
  );
};
export default FilterMembers;
