import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import { MemberData, Project, RootState, Tag } from '../../types';
import { addMember } from '../../utils/projectApi';

interface AddParticipantsFormProps {
  project: Project;
  projectSpecializations: Tag[] | undefined;
}

const AddParticipantsForm: React.FC<AddParticipantsFormProps> = ({
  project,
  projectSpecializations,
}) => {
  const user = useSelector((state: RootState) => state.userState.user);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberData>({
    defaultValues: {
      tagId: projectSpecializations?.[0]?.id,
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectedId = watch('tagId');

  const mutation = useMutation({
    mutationFn: addMember,
    onSuccess: () => {
      toast.success('Участник успішно доданий');
    },
    onError: () => {
      toast.error('Не вдалося додати участника');
    },
  });

  const onSubmit: SubmitHandler<MemberData> = (data) => {
    const token = user?.token;
    if (token) {
      mutation.mutate({
        memberData: data,
        projectId: String(project.id),
        token,
      });
    }
  };

  return (
    <div className="w-[557px] rounded-[10px] border-card-border border bg-white flex flex-col justify-center items-center p-5">
      {/* EMAIL */}
      <div className="flex flex-col w-[308px] gap-2">
        <label htmlFor="email" className="text-xl">
          Знайти учасника через email
        </label>
        <input
          className="duration-500 border-b-2 outline-none w-[308px] focus:border-b-2 focus:border-primary-blue border-2 rounded-[10px] px-7 bg-input-normal-state border-card-border cursor-pointer h-10"
          placeholder="Введіть email"
          type="email"
          {...register('email', {
            required: "Email обов'язковий",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
              message: 'Некоректний email',
            },
          })}
        />
        <div className="h-5 -mt-1">
          {errors.email && (
            <span className="text-red">{errors.email.message}</span>
          )}
        </div>
      </div>
      {/* SPECIALIZATION */}
      <div className="relative flex flex-col w-[308px] gap-2 grow">
        <span className="text-xl">Спеціалізація</span>
        <div
          className="flex items-center gap-2 border-2 rounded-[10px] px-7 bg-input-normal-state border-card-border cursor-pointer"
          onClick={toggleDropdown}
        >
          <span className="w-full h-[40px] items-center flex capitalize">
            {
              projectSpecializations?.find(
                (specialization) => specialization.id === Number(selectedId),
              )?.name
            }
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        {isOpen && (
          <div className="absolute left-0 z-10 bg-input-normal-state rounded-[10px] shadow-lg top-20 w-full border-card-border border px-7 py-5 flex flex-col gap-2">
            {projectSpecializations?.map((specialization) => (
              <label
                key={specialization.id}
                className="relative flex gap-2 hover:after:w-12 after:w-0 after:block after:h-[1px] after:bg-primary-blue after:absolute after:left-0 after:bottom-0 after:duration-500 after:mx-6 hover:text-primary-blue cursor-pointer"
              >
                <input
                  type="radio"
                  value={specialization.id}
                  {...register('tagId')}
                  checked={specialization.id === Number(selectedId)}
                  className="cursor-pointer"
                />
                {specialization.name}
              </label>
            ))}
          </div>
        )}
        <div className="h-5 -mb-3">
          {errors.tagId && (
            <span className="text-red">{errors.tagId.message}</span>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={handleSubmit(onSubmit)}
        className="border-2 border-primary-blue rounded-[10px] duration-500 bg-primary-blue text-white hover:bg-transparent hover:text-black font-semibold flex justify-center items-center w-[268px] h-10 mt-2"
      >
        Додати учасника
      </button>
    </div>
  );
};

export default AddParticipantsForm;
