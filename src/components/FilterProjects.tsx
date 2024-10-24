import Wrapper from './Wrapper';
import useMenuState from '../hooks';
import AnalyticsForm from './AnalyticsForm';
import MultiSelect from './MultiSelect';
import { Project, SelectOptionType } from '../types';
import FilterProjectsTable from './Analytics/FilterProjectsTable';

const statusOptions: SelectOptionType[] = [
  { value: 'searching', label: 'Формується команда' },
  { value: 'working', label: 'В розробці' },
  { value: 'completed', label: 'Завершений' },
];

const formatOptions: SelectOptionType[] = [
  { value: 'free', label: 'Free' },
  { value: 'light', label: 'Light' },
  { value: 'strong', label: 'Strong' },
];

type FilterProjectsProps = {
  projects: Project[];
  error?: string;
  onFilterProjects: (body: { formats?: string[]; statuses?: string[] }) => void;
};
const FilterProjects: React.FC<FilterProjectsProps> = ({
  projects,
  onFilterProjects,
  error,
}) => {
  console.log(projects);

  const { isMenuOpen } = useMenuState();
  return (
    <div className={'flex'}>
      <AnalyticsForm onFilter={onFilterProjects}>
        {(control) => (
          <Wrapper
            isMenuOpen={isMenuOpen}
            height="432px"
            width="268px"
            maxHeight="258px"
          >
            <MultiSelect
              options={statusOptions}
              placeholder={'Статус'}
              control={control}
              className={'w-[228px] mb-4'}
              name="statuses"
            />
            <MultiSelect
              options={formatOptions}
              placeholder={'Формат'}
              control={control}
              className={'w-[228px] hover:border-card-border'}
              name="formats"
            />
          </Wrapper>
        )}
      </AnalyticsForm>
      {projects.length > 0 && (
        <FilterProjectsTable projects={projects} error={error} />
      )}
      {/* <FilterProjectsTable projects={projects} error={error} /> */}
    </div>
  );
};
export default FilterProjects;
