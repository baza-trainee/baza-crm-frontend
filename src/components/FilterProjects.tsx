import Wrapper from './Wrapper';
import useMenuState from '../hooks';
import AnalyticsForm from './AnalyticsForm';
import MultiSelect from './MultiSelect';
import { SelectOptionType } from '../types';

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
  const { isMenuOpen } = useMenuState();
  return (
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
  );
};
export default FilterProjects;
