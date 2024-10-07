import Wrapper from './Wrapper';
import useMenuState from '../hooks';
import AnalyticsForm from './AnalyticsForm';
import MultiSelect from './MultiSelect';
import { SelectOptionType } from '../types';
import FilterProjectsTable from './Analytics/FilterProjectsTable';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../types';
import { filterProjects } from '../utils/filterApi';
// import {
//   countProjectsByStatus,
//   projectStatusOptions,
// } from '../utils/projectStatusOptions';
// export const AnalyticsTable = () => {
//   return <div>AnalyticsTable</div>;
// };

const statusOptions: SelectOptionType[] = [
  { value: 'team', label: 'Формується команда' },
  { value: 'development', label: 'В розробці' },
  { value: 'completed', label: 'Завершений' },
];

const formatOptions: SelectOptionType[] = [
  { value: 'free', label: 'Free' },
  { value: 'light', label: 'Light' },
  { value: 'strong', label: 'Strong' },
];

const FilterProjects: React.FC = () => {
  const user = useSelector((state: RootState) => state.userState.user);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzI4MDcxMDYxLCJleHAiOjE3MjgxNTc0NjF9.DJnPJedZ6rcWXPfDrlsJ4tgw9yzGwroUWubN9soGKaI';

  const {
    data: projects,
    // isPending,
    // isError,
  } = useQuery({
    queryKey: ['projects', token],
    queryFn: () => filterProjects(token),
    enabled: !!user?.token,
  });

  console.log(projects);

  const { isMenuOpen } = useMenuState();
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
              options={formatOptions}
              placeholder={'Формат'}
              control={control}
              className={'w-[228px] hover:border-card-border'}
              name="format"
            />
          </Wrapper>
        )}
      </AnalyticsForm>
      <FilterProjectsTable info={projects} />
    </div>
  );
};
export default FilterProjects;
