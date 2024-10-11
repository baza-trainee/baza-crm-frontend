import { useFormContext } from 'react-hook-form';

import { Project } from '../../types';
import { getProjectStatusLabel } from '../../utils/projectStatusOptions';

const TitleForm = ({ project }: { project: Project }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const borderColor =
    project?.projectStatus === 'ended'
      ? '#14B541'
      : project?.projectStatus === 'working'
        ? '#2e57db'
        : '#f16600';

  return (
    <>
      <div className="h-[60px] flex justify-between items-center font-bold text-text-black bg-white rounded-xl border-card-border border px-8 w-[845px]">
        <input
          className="duration-500 border-b-2 outline-none w-96 focus:border-b-2 focus:border-b-primary-blue"
          placeholder="Ввести назву проєкту"
          type="text"
          {...register('name', {
            required: "Назва проєкту обов'язкова",
            minLength: {
              value: 3,
              message: 'Назва повинна містити щонайменше 3 символи',
            },
          })}
        />
        <div
          style={{ backgroundColor: borderColor }}
          className="px-5 py-2 text-white rounded-[10px]"
        >
          {getProjectStatusLabel(project.projectStatus)}
        </div>
      </div>
      <div className="h-5 px-8 mb-5">
        {errors.name && typeof errors.name.message === 'string' && (
          <span className="text-red">{errors.name.message}</span>
        )}
      </div>
    </>
  );
};

export default TitleForm;
