import { Controller } from 'react-hook-form';
import AnalyticsForm from './AnalyticsForm';
import MultiSelect from './MultiSelect';
import Wrapper from './Wrapper';
import { RootState, SelectOptionType } from '../types';
import Calendar from './Calendar';
import FilterMembersTable from './Analytics/FilterMembersTable';
import { Member, RequestBodyMembers } from '../types';
import { getTags } from '../utils/tagApi';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const statusOptions: SelectOptionType[] = [
  { value: 'active', label: 'Активний', color: '#15C847' },
  { value: 'working', label: 'На проєкті', color: '#1E70EB' },
  { value: 'pause', label: 'На паузі', color: '#FFB800' },
];

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
  const token = useSelector((state: RootState) => state.userState.user?.token);
  const [specializations, setSpecializations] = useState<
    { name: string; color: string; id: number }[]
  >([]);
  const [technologies, setTechnologies] = useState<
    { name: string; id: number }[]
  >([]);

  const fetchTags = async (token: string) => {
    try {
      const tags = await getTags(token);
      const technologies = tags?.filter(
        (tag) => tag.isSpecialization === false,
      );
      setTechnologies(technologies);
      const specializations = tags?.filter(
        (tag) => tag.isSpecialization === true,
      );
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
    <div className="flex w-full gap-4">
      <AnalyticsForm onFilter={onFilterMembers}>
        {(control) => (
          <Wrapper>
            <div className="flex flex-col gap-4">
              <MultiSelect
                options={statusOptions}
                placeholder={'Статус'}
                control={control}
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
                name="technologies"
              />
            </div>

            <div className="flex flex-col">
              <p className="text-center">Період реєстрації</p>
              <div className="flex flex-col gap-2.5 mt-4">
                <Controller
                  name="selectedDateFrom"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Calendar
                      text={'з'}
                      selectedDate={value}
                      onDateChange={(date) => {
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
