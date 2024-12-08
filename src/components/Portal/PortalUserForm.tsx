import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CustomInput from './CustomInput';
import pencilIcon from '../../assets/common/pencil.svg';
import chevronDownIcon from '../../assets/common/chevron-down.svg';
import CustomSelect from './CustomSelect';
import { useState } from 'react';
import FileInput from './FileInput';
import type { UserData, Member } from '../../types';
import { useSelector } from 'react-redux';
import { getTags } from '../../utils/tagApi';
import type { Specialization, Technology, SelectOption } from '../../types';

import type { RootState } from '../../types';

const PortalUserForm = ({
  userData,
  handleUserUpdate,
}: {
  userData: Member;
  handleUserUpdate: (tags: number[], data: UserData) => Promise<void>;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm<UserData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      country: '',
      city: '',
      phone: '',
      specializations: [],
      technologies: [],
      email: '',
      linkedin: '',
      discordReceiving: false,
    },
  });
  const token = useSelector((state: RootState) => state.userState.user?.token);

  const [allSpecializations, setAllSpecializations] = useState<
    Specialization[]
  >([]);
  const [allTechnologies, setAllTechnologies] = useState<Technology[]>([]);

  const [selectedSpecializations, setSelectedSpecializations] = useState<
    SelectOption[]
  >([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<
    SelectOption[]
  >([]);

  const onSubmit = handleSubmit(async (data) => {
    const tagIds = [
      ...selectedTechnologies.map((t) => t.data.id),
      ...selectedSpecializations.map((s) => s.data.id),
    ];
    await handleUserUpdate(tagIds, data);
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userData && token) {
          const allTags = await getTags(token!);
          setAllSpecializations(allTags.filter((t) => t.isSpecialization));
          setAllTechnologies(allTags.filter((t) => !t.isSpecialization));

          setValue('firstName', userData.firstName);
          setValue('lastName', userData.lastName);
          setValue('country', userData.country);
          setValue('city', userData.city);
          setValue('phone', userData.phone!);
          setValue('email', userData.email);
          setValue('linkedin', userData.linkedin!);
          setSelectedSpecializations(
            userData.specializations.map((s) => {
              return {
                value: s.name as string,
                label: s.name as string,
                data: s,
              };
            }),
          );
          setSelectedTechnologies(
            userData.technologies.map((t) => {
              return {
                value: t.name as string,
                label: t.name as string,
                data: t,
              };
            }),
          );
        } else {
          console.error('No token or user ID found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userData, token]);

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
          <FileInput
            id="resume"
            label="Резюме"
            register={register}
            icon={chevronDownIcon}
          />
        </div>
        <div className="w-full">
          <CustomSelect
            label="Спеціалізація"
            options={allSpecializations.map((s) => {
              return {
                value: s.name as string,
                label: s.name as string,
                data: s,
              };
            })}
            value={selectedSpecializations}
            onChange={(newValue) => {
              setSelectedSpecializations([...newValue]);
              setValue(
                'specializations',
                newValue.map((v) => v.data as Specialization),
              );
            }}
          />
          {selectedSpecializations.length > 0 && (
            <div>
              <ul>
                {selectedSpecializations.map((specialization) => (
                  <li key={specialization.data.id}>{specialization.label}</li>
                ))}
              </ul>
            </div>
          )}
          <CustomSelect
            label="Технології"
            options={allTechnologies.map((t) => {
              return { value: t.name, label: t.name, data: t };
            })}
            value={selectedTechnologies}
            onChange={(newValue) => {
              setSelectedTechnologies([...newValue]);
              setValue(
                'technologies',
                newValue.map((v) => v.data as Technology),
              );
            }}
          />
          {selectedTechnologies.length > 0 && (
            <div>
              <ul>
                {selectedTechnologies.map((technologies) => (
                  <li key={technologies.data.id}>{technologies.label}</li>
                ))}
              </ul>
            </div>
          )}
          <CustomInput id="email" label="Email" register={register} />
          <CustomInput
            id="linkedin"
            label="Linkedin"
            register={register}
            icon={pencilIcon}
          />

          <label className="flex ">
            <input
              {...register('discordReceiving')}
              className=" border-black border w-[20px] h-[20px] rounded-[4px]"
              type="checkbox"
              defaultChecked={userData.discordReceiving}
              onChange={(e) =>
                setValue('discordReceiving', e.currentTarget.checked)
              }
            />
            Отримувати сповіщення у Discord
          </label>
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
