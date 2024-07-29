import { useForm } from 'react-hook-form';

interface UserData {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  phone: string;
  resume: File;
  specialization: string[];
}

// const specializationList = [
//   { value: 'design', label: 'Design' },
//   { value: 'frontend', label: 'Frontend' },
//   { value: 'backend', label: 'Backend' },
//   { value: 'fullstack', label: 'Full Stack' },
//   { value: 'qa', label: 'QA Manual' },
//   { value: 'pm', label: 'PM' },
// ];

const PortalUserForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<UserData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      country: '',
      city: '',
      phone: '',
      specialization: [],
    },
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="firstName"> Ім'я</label>
        <div>
          <input id="firstName" {...register('firstName')} />
        </div>

        <label htmlFor="lastName">Прізвище </label>
        <div>
          {' '}
          <input id="lastName" {...register('lastName')} />
        </div>
        <label htmlFor="country">Країна </label>
        <div>
          {' '}
          <input id="country" {...register('country')} />
        </div>
        <label htmlFor="city">Місто </label>
        <div>
          <input id="city" {...register('city')} />
        </div>
        <label htmlFor="phone">Телефон </label>
        <div>
          <input id="phone" {...register('phone')} placeholder="+380" />
        </div>
        <label htmlFor="resume">Резюме </label>
        <div>
          <input id="resume" {...register('resume')} />
        </div>
        <label htmlFor="specialization">Спеціалізація</label>
        <div>
          <select id="specialization" {...register('specialization')}>
            <option value="Design">Design</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Full Stack">Full Stack</option>
            <option value="QA Manual">QA Manual</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>

      <button type="submit">Зберегти налаштування</button>
    </form>
  );
};
export default PortalUserForm;
