import { useForm } from 'react-hook-form';
import CustomInput from './CustomInput';
import pencilIcon from '../../assets/common/pencil.svg';
import chevronDownIcon from '../../assets/common/chevron-down.svg';
import CustomSelect, { SelectOption } from './CustomSelect';
import { useState } from 'react';

export interface UserData {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  phone: string;
  resume: File | null;
  specialization: string[];
  technologies: string[];
  email: string;
  linkedin: string;
}

const specializationList: SelectOption[] = [
  { value: 'design', label: 'Design' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'qa', label: 'QA Manual' },
  { value: 'pm', label: 'PM' },
];

// const technologiesList: SelectOption[] = [
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
      technologies: [],
      email: '',
      linkedin: '',
    },
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  const [selectedSpecializations, setSelectedSpecializations] = useState<
    readonly SelectOption[]
  >([]);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 p-5">
      <div className="flex gap-5">
        <div className="w-full flex flex-col gap-[9px] ">
          <CustomInput
            id="firstName"
            label="Ім'я"
            register={register}
            icon={pencilIcon}
          />
          <CustomInput
            id="lastName"
            label="Прізвище"
            register={register}
            icon={pencilIcon}
          />
          <CustomInput
            id="country"
            label="Країна"
            register={register}
            icon={pencilIcon}
          />
          <CustomInput
            id="city"
            label="Місто"
            register={register}
            icon={pencilIcon}
          />
          <CustomInput
            id="phone"
            label="Телефон"
            register={register}
            icon={pencilIcon}
            placeholder="+380"
          />
          <CustomInput
            id="resume"
            label="Резюме"
            register={register}
            icon={chevronDownIcon}
            type="file"
          />
        </div>
        <div className="w-full">
          <CustomSelect
            label="Спеціалізація"
            options={specializationList}
            value={Array.from(selectedSpecializations)}
            onChange={(newValue) => setSelectedSpecializations(newValue)}
          />
          {selectedSpecializations.length > 0 && (
            <div>
              <ul>
                {selectedSpecializations.map((specialization) => (
                  <li key={specialization.value}>{specialization.label}</li>
                ))}
              </ul>
            </div>
          )}

          {/* <div className="relative">
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
          </div> */}
          <CustomInput id="email" label="Email" register={register} />
          <CustomInput
            id="linkedin"
            label="Linkedin"
            register={register}
            icon={pencilIcon}
          />
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
