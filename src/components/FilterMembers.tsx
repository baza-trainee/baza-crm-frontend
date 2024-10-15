import { Controller } from 'react-hook-form';
import AnalyticsForm from './AnalyticsForm';
import MultiSelect from './MultiSelect';
import Wrapper from './Wrapper';
import useMenuState from '../hooks';
import { SelectOptionType } from '../types';
import Calendar from './Calendar';
import FilterMembersTable from './Analytics/FilterMembersTable';
// import { useQuery } from '@tanstack/react-query';
// import { useSelector } from 'react-redux';
import { Member, RequestBodyMembers } from '../types';
import { getTags } from '../utils/tagApi';
import { useState, useEffect } from 'react';
// import { filterMembers, filterProjects } from '../utils/filterApi';

const statusOptions: SelectOptionType[] = [
  { value: 'active', label: 'Активний' },
  { value: 'working', label: 'На проєкті' },
  { value: 'paused', label: 'На паузі' },
];

// const specsOptions: SelectOptionType[] = [
//   { value: 'Design', label: 'Design' },
//   { value: 'Frontend', label: 'Frontend' },
//   { value: 'Backend', label: 'Backend' },
//   { value: 'Full Stack', label: 'Full Stack' },
//   { value: 'QA Manual', label: 'QA Manual' },
//   { value: 'PM', label: 'PM' },
// ];

// const technologyOptions: SelectOptionType[] = [
//   { value: 'Figma', label: 'Figma' },
//   { value: 'UI/UX', label: 'UI/UX' },
//   { value: 'Canva', label: 'Canva' },
//   { value: 'Adobe  Illustrator', label: 'Adobe  Illustrator' },
//   { value: 'Photoshop', label: 'Photoshop' },
//   { value: 'Node.js', label: 'Node.js' },
//   { value: 'Java', label: 'Java' },
//   { value: 'React', label: 'React' },
//   { value: 'Vue', label: 'Vue' },
//   { value: 'Angular', label: 'Angular' },
//   { value: 'Swagger', label: 'Swagger' },
//   { value: 'Postman', label: 'Postman' },
// ];

type FilterMembersProps = {
  members: Member[];
  error?: string;
  onFilterMembers: (body: RequestBodyMembers) => void;
};

const FilterMembers: React.FC<FilterMembersProps> = ({
  members,
  onFilterMembers,
  error,
}) => {
  const { isMenuOpen } = useMenuState();
  console.log(members);
  const [specializations, setSpecializations] = useState<
    { name: string; color: string; id: number }[]
    // string[]
  >([]);
  const [technologies, setTechnologies] = useState<
    { name: string; id: number }[]
    // string[]
  >([]);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzI4ODIwMzQwLCJleHAiOjE3Mjg5MDY3NDB9.ZEhMEU2j0IlrT-oa_WP4l7OniQv2SjWUvg3-NmBa8co';

  const fetchTags = async (token: string) => {
    try {
      const tags = await getTags(token);
      console.log(tags);
      const technologies = tags?.filter(
        (tag) => tag.isSpecialization === false,
      );
      setTechnologies(technologies);
      const specializations = tags?.filter(
        (tag) => tag.isSpecialization === true,
      );
      console.log(specializations);
      setSpecializations(specializations);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTags(token);
    }
  }, [token]);

  return (
    <div className={'flex'}>
      <AnalyticsForm onFilter={onFilterMembers}>
        {(control) => (
          <Wrapper isMenuOpen={isMenuOpen} height="432px" width="268px">
            <MultiSelect
              options={statusOptions}
              placeholder={'Статус'}
              control={control}
              className={'w-[228px] mb-4'}
              name="statuses"
            />
            <MultiSelect
              options={specializations.map((spec) => ({
                id: spec.id,
                value: spec.name,
                label: spec.name,
              }))}
              placeholder={'Спеціалізація'}
              control={control}
              className={'w-[228px] mb-4'}
              name="specializations"
            />
            <MultiSelect
              options={technologies.map((techn) => ({
                id: techn.id,
                value: techn.name,
                label: techn.name,
              }))}
              placeholder={'Технології'}
              control={control}
              className={'w-[228px] mb-24'}
              name="technologies"
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
      {members.length > 0 && (
        <FilterMembersTable members={members} error={error} />
      )}
    </div>
  );
};
export default FilterMembers;
