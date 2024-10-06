import { useForm, Control } from 'react-hook-form';
import { useEffect } from 'react';
import Button from './Button';

export type FormData = {
  status: { value: string; label: string }[];
  format: { value: string; label: string }[];
  technology: { value: string; label: string }[];
  specialization: { value: string; label: string }[];
  selectedDateFrom: Date | null;
  selectedDateTo: Date | null;
};

type FormProps = {
  children: (control: Control<FormData>) => React.ReactNode;
};

const AnalyticsForm: React.FC<FormProps> = ({ children }) => {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    // formState: { errors },
  } = useForm<FormData>();

  const selectedOptions = watch('status');

  const handleReset = () => {
    reset({
      status: [],
      format: [],
      technology: [],
      specialization: [],
      selectedDateFrom: null,
      selectedDateTo: null,
    });
  };
  const onSubmit = (data: FormData) => {
    console.log(data);
    // handleReset();
  };

  useEffect(() => {
    console.log('Form data changed:', selectedOptions);
  }, [selectedOptions]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="external-form">
      {children(control)}
      <Button label={'Застосувати'} />{' '}
      <Button label={'Скинути'} onClick={handleReset} />
    </form>
  );
};

export default AnalyticsForm;
