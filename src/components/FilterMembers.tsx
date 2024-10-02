import { Controller } from 'react-hook-form';
import AnalyticsForm from './AnalyticsForm';
import MultiSelect from './MultiSelect';
import Wrapper from './Wrapper';
import useMenuState from '../hooks';
import { SelectOptionType } from '../types';
import Calendar from './Calendar';

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
        </Wrapper>
      )}
    </AnalyticsForm>
  );
};
export default FilterMembers;
