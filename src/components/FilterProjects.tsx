import Wrapper from './Wrapper';
import AnalyticsForm from './AnalyticsForm';
import MultiSelect from './MultiSelect';
import { Project, SelectOptionType } from '../types';
import FilterProjectsTable from './Analytics/FilterProjectsTable';

const statusOptions: SelectOptionType[] = [
  { value: 'searching', label: 'Формується команда' },
  { value: 'working', label: 'В розробці' },
  { value: 'ended', label: 'Завершений' },
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
  return (
    <div className="flex w-full gap-4">
      <AnalyticsForm onFilter={onFilterProjects}>
        {(control) => (
          <Wrapper>
            <MultiSelect
              options={statusOptions}
              placeholder={'Статус'}
              control={control}
              name="statuses"
            />
            <MultiSelect
              options={formatOptions}
              placeholder={'Формат'}
              control={control}
              name="formats"
            />
          </Wrapper>
        )}
      </AnalyticsForm>
      {projects.length > 0 && (
        <FilterProjectsTable projects={projects} error={error} />
      )}
    </div>
  );
};
export default FilterProjects;
