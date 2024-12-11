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
import { getTags, deleteTag } from '../../utils/tagApi';
import type { Specialization, Technology, SelectOption } from '../../types';
import { RxCross2 } from 'react-icons/rx';

import type { RootState } from '../../types';

const PortalUserForm = ({
  userData,
  handleUserUpdate,
}: {
  userData: Member;
  handleUserUpdate: (tags: number[], data: UserData) => Promise<void>;
}) => {
  const { register, handleSubmit, setValue } = useForm<UserData>({
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

  const [exictingSpecialization, setExictingSpecialization] =
    useState<SelectOption[]>();
  const [exictingTechnologies, setExictingTechnologies] =
    useState<SelectOption[]>();
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

  const deleteTagById = async (tagId: number) => {
    const existingTagDelete = [
      ...exictingTechnologies!,
      ...exictingSpecialization!,
    ].filter((t) => t.data.id === Number(tagId));
    if (existingTagDelete.length > 0) {
      setExictingTechnologies((prev) =>
        prev?.filter((t) => t.data.id !== tagId),
      );
      setExictingSpecialization((prev) =>
        prev?.filter((s) => s.data.id !== tagId),
      );

      await deleteTag(token!, tagId.toString());
    } else {
      setSelectedTechnologies((prev) =>
        prev?.filter((t) => t.data.id !== tagId),
      );
      setSelectedSpecializations((prev) =>
        prev?.filter((s) => s.data.id !== tagId),
      );
    }
  }; // TODO:maybe need refactore code and add this logic in submit form function

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
          setExictingSpecialization(
            userData.specializations.map((s) => {
              return {
                value: s.name as string,
                label: s.name as string,
                data: s,
              };
            }),
          );
          setExictingTechnologies(
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
      <div className="flex flex-col lg:flex-row w-[344px] lg:w-full gap-5">
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

        {exictingSpecialization && exictingTechnologies && (
          <div className="flex flex-col w-full gap-[9px] ">
            <CustomSelect
              label="Спеціалізація"
              options={allSpecializations.map((s) => {
                return {
                  value: s.name as string,
                  label: s.name as string,
                  data: s,
                };
              })}
              value={[...exictingSpecialization, ...selectedSpecializations]}
              onChange={(newValue) => {
                const origSelectedSpec = newValue.filter(
                  (s) =>
                    !exictingSpecialization.some(
                      (e) => e.data.id === s.data.id,
                    ),
                );

                setSelectedSpecializations(origSelectedSpec);
                setValue(
                  'specializations',
                  origSelectedSpec.map((s) => s.data as Specialization),
                );
              }}
            />
            <div className="flex flex-col">
              {exictingTechnologies && exictingSpecialization!.length > 0 && (
                <ul className="flex flex-wrap gap-1">
                  {exictingSpecialization!.map((specialization) => (
                    <li
                      className="flex gap-4 rounded-lg px-3 py-3 bg-input-normal-state"
                      key={specialization.data.id}
                    >
                      <p>{specialization.data.name}</p>
                      <div className="flex items-center justify-center">
                        <RxCross2
                          onClick={() => deleteTagById(specialization.data.id)}
                          className="text-light-grey hover:text-red cursor-pointer"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {selectedSpecializations.length > 0 && (
                <ul className="mt-1 flex flex-wrap gap-1">
                  {selectedSpecializations.map((specialization) => (
                    <li
                      className="flex gap-4 rounded-lg px-3 py-3 bg-input-normal-state"
                      key={specialization.data.id}
                    >
                      <p>{specialization.label}</p>
                      <div className="flex items-center justify-center">
                        <RxCross2
                          onClick={() => deleteTagById(specialization.data.id)}
                          className="text-light-grey hover:text-red cursor-pointer"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <CustomSelect
              label="Технології"
              options={allTechnologies.map((t) => {
                return { value: t.name, label: t.name, data: t };
              })}
              value={[...exictingTechnologies, ...selectedTechnologies]}
              onChange={(newValue) => {
                const origSelectedTec = newValue.filter(
                  (s) =>
                    !exictingTechnologies.some((e) => e.data.id === s.data.id),
                );
                setSelectedTechnologies(origSelectedTec);
                setValue(
                  'technologies',
                  origSelectedTec.map((t) => t.data as Technology),
                );
              }}
            />
            <div className="flex flex-col">
              {exictingTechnologies && exictingTechnologies!.length > 0 && (
                <ul className="flex flex-wrap gap-1">
                  {exictingTechnologies!.map((specialization) => (
                    <li
                      className="flex gap-4 rounded-lg px-3 py-3 bg-input-normal-state"
                      key={specialization.data.id}
                    >
                      <p> {specialization.data.name}</p>
                      <div className="flex items-center justify-center">
                        <RxCross2
                          onClick={() => deleteTagById(specialization.data.id)}
                          className="text-light-grey hover:text-red cursor-pointer"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {selectedTechnologies.length > 0 && (
                <ul className="mt-1 flex flex-wrap gap-1">
                  {selectedTechnologies.map((technologies) => (
                    <li
                      className="flex gap-4 rounded-lg px-3 py-3 bg-input-normal-state"
                      key={technologies.data.id}
                    >
                      <p>{technologies.label}</p>
                      <div className="flex items-center justify-center">
                        <RxCross2
                          onClick={() => deleteTagById(technologies.data.id)}
                          className="text-light-grey hover:text-red cursor-pointer"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <CustomInput id="email" label="Email" register={register} />
            <CustomInput
              id="linkedin"
              label="Linkedin"
              register={register}
              icon={pencilIcon}
            />

            <label className="flex gap-2 items-center ">
              <input
                {...register('discordReceiving')}
                className="size-5"
                type="checkbox"
                defaultChecked={userData.discordReceiving}
                onChange={(e) =>
                  setValue('discordReceiving', e.currentTarget.checked)
                }
              />
              Отримувати сповіщення у Discord
            </label>
          </div>
        )}
      </div>

      <button
        className="w-[254px] h-10 text-white bg-primary-blue rounded-[10px] hover:bg-active-blue"
        type="submit"
      >
        Зберегти налаштування
      </button>
    </form>
  );
};
export default PortalUserForm;
