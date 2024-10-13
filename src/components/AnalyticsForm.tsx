import { useForm, Control } from 'react-hook-form';
import { useEffect } from 'react';
import Button from './Button';
import { DataForm } from '../types';

export type FormData = {
  status?: { value: string; label: string }[];
  format?: { value: string; label: string }[];
  technology?: { value: string; label: string }[];
  specialization?: { value: string; label: string }[];
  selectedDateFrom?: Date | null;
  selectedDateTo?: Date | null;
};

type FormProps = {
  children: (control: Control<DataForm>) => React.ReactNode;
  onFilter: (body: {
    formats?: string[];
    statuses?: string[];
    technologies?: string[];
    specializations?: string[];
    // statuses: string[];
    from?: string;
    to?: string;
  }) => void;
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
    const formatOption = data.formats.map((item) => item.value);
    const statusOption = data.statuses.map((item) => item.value);
    const body = { formats: [...formatOption], statuses: [...statusOption] };

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
