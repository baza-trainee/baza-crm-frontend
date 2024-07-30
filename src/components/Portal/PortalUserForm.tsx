import { useForm } from 'react-hook-form';
import pencilIcon from '../../assets/common/pencil.svg';
import chevronDownIcon from '../../assets/common/chevron-down.svg';

interface UserData {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  phone: string;
  resume: File;
  specialization: string[];
  technologies: string[];
  email: string;
  linkedin: string;
}

// const specializationList = [
//   { value: 'design', label: 'Design' },
//   { value: 'frontend', label: 'Frontend' },
//   { value: 'backend', label: 'Backend' },
//   { value: 'fullstack', label: 'Full Stack' },
//   { value: 'qa', label: 'QA Manual' },
//   { value: 'pm', label: 'PM' },
// ];

// const technologiesList = [
//   { value: 'figma', label: 'Figma' },
//   { value: 'uiUx', label: 'Ui/UX' },
//   { value: 'canva', label: 'Canva' },
//   { value: 'adobe', label: 'Adobe Illustrator' },
//   { value: 'photoshop', label: 'Photoshop' },
//   { value: 'nodeJs', label: 'Node.js' },
//   { value: 'java', label: 'Java' },
//   { value: 'reactVue', label: 'React Vue' },
//   { value: 'backend', label: 'Angular' },
//   { value: 'fullstack', label: 'Swagger' },
//   { value: 'qa', label: 'Postman' },
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
    <form
      onSubmit={onSubmit}
      className="p-5 w-[844px] rounded-[10px] border border-solid border-card-border flex flex-col gap-5"
    >
      <div className="flex gap-5">
        <div className="w-full">
          <label
            htmlFor="firstName"
            className="text-text-black font-open-sans text-[20px] font-normal leading-[28px] tracking-[0.4px]"
          >
            {' '}
            Ім'я
          </label>
          <div className="relative">
            <input
              className="rounded-[10px] border-2 border-solid border-input-normal-state bg-light-blue-bg hover:bg-hover-blue px-4 h-10 w-full font-open-sans text-base font-normal leading-[26px]"
              id="firstName"
              {...register('firstName')}
            />
            <button type="button" className="absolute right-4 bottom top-2">
              {' '}
              <img src={pencilIcon} width={24} height={24} alt="pencil" />
            </button>
          </div>

          <label
            className="text-text-black font-open-sans text-[20px] font-normal leading-[28px] tracking-[0.4px]"
            htmlFor="lastName"
          >
            Прізвище{' '}
          </label>
          <div className="relative">
            {' '}
            <input
              className="rounded-[10px] border-2 border-solid border-input-normal-state bg-light-blue-bg hover:bg-hover-blue px-4 h-10 w-full font-open-sans text-base font-normal leading-[26px]"
              id="lastName"
              {...register('lastName')}
            />
            <button type="button" className="absolute right-4 bottom top-2">
              {' '}
              <img src={pencilIcon} width={24} height={24} alt="pencil" />
            </button>
          </div>
          <label
            className="text-text-black font-open-sans text-[20px] font-normal leading-[28px] tracking-[0.4px]"
            htmlFor="country"
          >
            Країна{' '}
          </label>
          <div className="relative">
            {' '}
            <input
              className="rounded-[10px] border-2 border-solid border-input-normal-state bg-light-blue-bg hover:bg-hover-blue px-4 h-10 w-full font-open-sans text-base font-normal leading-[26px]"
              id="country"
              {...register('country')}
            />
            <button type="button" className="absolute right-4 bottom top-2">
              {' '}
              <img src={pencilIcon} width={24} height={24} alt="pencil" />
            </button>
          </div>
          <label
            className="text-text-black font-open-sans text-[20px] font-normal leading-[28px] tracking-[0.4px]"
            htmlFor="city"
          >
            Місто{' '}
          </label>
          <div className="relative">
            <input
              className="rounded-[10px] border-2 border-solid border-input-normal-state bg-light-blue-bg hover:bg-hover-blue px-4 h-10 w-full font-open-sans text-base font-normal leading-[26px]"
              id="city"
              {...register('city')}
            />
            <button type="button" className="absolute right-4 bottom top-2">
              {' '}
              <img src={pencilIcon} width={24} height={24} alt="pencil" />
            </button>
          </div>
          <label
            className="text-text-black font-open-sans text-[20px] font-normal leading-[28px] tracking-[0.4px]"
            htmlFor="phone"
          >
            Телефон{' '}
          </label>
          <div className="relative">
            <input
              className="rounded-[10px] border-2 border-solid border-input-normal-state bg-light-blue-bg hover:bg-hover-blue px-4 h-10 w-full font-open-sans text-base font-normal leading-[26px]"
              id="phone"
              {...register('phone')}
              placeholder="+380"
            />
            <button type="button" className="absolute right-4 bottom top-2">
              {' '}
              <img src={pencilIcon} width={24} height={24} alt="pencil" />
            </button>
          </div>
          <label
            className="text-text-black font-open-sans text-[20px] font-normal leading-[28px] tracking-[0.4px]"
            htmlFor="resume"
          >
            Резюме{' '}
          </label>
          <div className="relative">
            <input
              type="file"
              className="rounded-[10px] border-2 border-solid border-input-normal-state bg-light-blue-bg hover:bg-hover-blue px-4 h-10 w-full font-open-sans text-base font-normal leading-[26px]"
              id="resume"
              {...register('resume')}
            />
            <button type="button" className="absolute right-4 bottom top-2">
              {' '}
              <img src={chevronDownIcon} width={24} height={24} alt="pencil" />
            </button>
          </div>
        </div>
        <div className="w-full">
          <label
            className="text-text-black font-open-sans text-[20px] font-normal leading-[28px] tracking-[0.4px]"
            htmlFor="specialization"
          >
            Спеціалізація
          </label>
          <div className="relative">
            <select
              className="rounded-[10px] border-2 border-solid border-input-normal-state bg-light-blue-bg hover:bg-hover-blue px-4 h-10 w-full font-open-sans text-base font-normal leading-[26px]"
              id="specialization"
              {...register('specialization')}
            >
              <option value="Design">Design</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Full Stack">Full Stack</option>
              <option value="QA Manual">QA Manual</option>
              <option value="PM">PM</option>
            </select>
          </div>

          <label
            className="text-text-black font-open-sans text-[20px] font-normal leading-[28px] tracking-[0.4px]"
            htmlFor="technologies"
          >
            Технології
          </label>
          <div className="relative">
            <select
              className="rounded-[10px] border-2 border-solid border-input-normal-state bg-light-blue-bg hover:bg-hover-blue px-4 h-10 w-full font-open-sans text-base font-normal leading-[26px]"
              id="technologies"
              {...register('technologies')}
            >
              <option value="Figma">Figma</option>
              <option value="Ui/UX">Ui/UX</option>
              <option value="Canva">Canva</option>
              <option value="Adobe Illustrator">Adobe Illustrator</option>
              <option value="Photoshop">Photoshop</option>
              <option value="Node.js">Node.js</option>
              <option value="Java">Java</option>
              <option value="React Vue">React Vue</option>
              <option value="Angular">Angular</option>
              <option value="Swagger">Swagger</option>
              <option value="Postman">Postman</option>
            </select>
          </div>
          <label
            className="text-text-black font-open-sans text-[20px] font-normal leading-[28px] tracking-[0.4px]"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <input
              className="rounded-[10px] border-2 border-solid border-input-normal-state bg-light-blue-bg hover:bg-hover-blue px-4 h-10 w-full font-open-sans text-base font-normal leading-[26px]"
              id="email"
              {...register('email')}
            />
          </div>
          <label
            className="text-text-black font-open-sans text-[20px] font-normal leading-[28px] tracking-[0.4px]"
            htmlFor="linkedin"
          >
            Linkedin
          </label>
          <div className="relative">
            <input
              className="rounded-[10px] border-2 border-solid border-input-normal-state bg-light-blue-bg hover:bg-hover-blue px-4 h-10 w-full font-open-sans text-base font-normal leading-[26px]"
              id="linkedin"
              {...register('linkedin')}
            />
            <button type="button" className="absolute right-4 bottom top-2">
              {' '}
              <img src={pencilIcon} width={24} height={24} alt="pencil" />
            </button>
          </div>
        </div>
      </div>

      <button
        className="w-[254px] h-10 text-white bg-primary-blue rounded-[10px]"
        type="submit"
      >
        Зберегти налаштування
      </button>
    </form>
  );
};
export default PortalUserForm;
