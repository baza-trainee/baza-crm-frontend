import { useForm, Control } from 'react-hook-form';
import { useEffect } from 'react';
import Button from './Button';
import { DataForm, RequestBodyMembers } from '../types';

export type FormData = {
  statuses?: { value: string; label: string }[];
  formats?: { value: string; label: string }[];
  technologies?: { name: string; color: string; id: number }[];
  specializations?: { name: string; id: number }[];
  selectedDateTo?: Date | null;
};

type FormProps = {
  children: (control: Control<DataForm>) => React.ReactNode;
  onFilter: (body: RequestBodyMembers) => void;
};

const AnalyticsForm: React.FC<FormProps> = ({ children, onFilter }) => {
  const {
    handleSubmit,
    control,
    // reset,
    watch,
    // formState: { errors },
  } = useForm<DataForm>();

  const selectedOptions = watch('statuses');
  console.log(selectedOptions);

  const handleReset = () => {
    // reset({ status: [], format: [], technology: [], specialization: [] });
  };
  const onSubmit = async (data: DataForm) => {
    console.log(data);
    console.log(data.technologies);
    const formatOption = data.formats?.map((item) => item.value) || [];
    const statusOption = data.statuses?.map((item) => item.value) || [];
    const technologyOption = data.technologies?.map((item) => item.id) || [];
    const specializationOption =
      data.specializations?.map((item) => item.id) || [];
    const dateFromOption = data.selectedDateFrom;
    const dateToOption = data.selectedDateTo;
    const body: RequestBodyMembers = {
      from: dateFromOption
        ? dateFromOption.toISOString().slice(0, 10)
        : undefined,
      to: dateToOption ? dateToOption.toISOString().slice(0, 10) : undefined,
      technologies: technologyOption.filter(
        (tech): tech is number => tech !== undefined,
      ),
      specializations: specializationOption.filter(
        (spec): spec is number => spec !== undefined,
      ),
      statuses: statusOption.length > 0 ? statusOption : undefined,
      formats: formatOption.length > 0 ? formatOption : undefined,
    };
    onFilter(body);

    handleReset();
  };

  useEffect(() => {
    console.log('Form data changed:', selectedOptions);
  }, [selectedOptions]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {children(control)}
      <Button label={'Застосувати'} />{' '}
      <Button label={'Скинути'} onClick={handleReset} />
    </form>
  );
};

export default AnalyticsForm;
