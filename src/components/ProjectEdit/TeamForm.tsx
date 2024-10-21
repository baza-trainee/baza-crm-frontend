import { RiCloseLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { useFormContext } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { Project, RootState, Tag } from '../../types';
import { deleteMember } from '../../utils/projectApi';

const TeamForm = ({
  project,
  projectSpecializations,
}: {
  project: Project;
  projectSpecializations: Tag[] | undefined;
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const user = useSelector((state: RootState) => state.userState.user);

  const mutation = useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      toast.success('Учасник успішно видалений');
    },
    onError: () => {
      toast.error('Не вдалося видалити учасника');
    },
  });

  console.log(projectSpecializations);

  const handleDeleteMember = (userId: number) => {
    const token = user?.token;
    const projectId = project?.id;
    if (token && userId && projectId) {
      mutation.mutate({ userId, token, projectId });
    }
  };

  return (
    <>
      <h3 className="mb-3 ml-8 text-xl font-bold">Склад команди</h3>
      <div className="flex flex-wrap gap-6">
        {projectSpecializations?.map((specialization, index) => (
          <div
            className="w-[268px] bg-white rounded-[10px] px-8 py-5 border-color-pm border flex flex-col justify-start gap-3 relative"
            key={specialization.id}
          >
            <div className="flex items-center justify-between gap-5">
              <div
                className="px-8 py-2 text-white rounded-r-[10px] -ml-8 self-start"
                style={{ backgroundColor: specialization.color }}
              >
                {specialization.name}
              </div>
              <div className="flex items-center">
                <p className="text-black">{specialization.userCount}/</p>
                <input
                  className="w-10 text-center duration-500 border-b-2 outline-none focus:border-b-2 focus:border-b-primary-blue text-primary-blue"
                  type="number"
                  min={specialization.name === 'PM' ? 1 : 0}
                  {...register(`specializations.${index}.count`, {
                    required: "Кількість обов'язкова",
                  })}
                />
              </div>
              <input
                type="hidden"
                {...register(`specializations.${index}.id`, {
                  value: specialization.id,
                })}
              />
            </div>
            <div className="absolute left-0 h-5 -bottom-5">
              {Array.isArray(errors.specializations) &&
                errors.specializations[index]?.count?.message && (
                  <span className="text-red">
                    {errors.specializations[index]?.count?.message}
                  </span>
                )}
            </div>
            <div className="flex flex-col gap-2">
              {project?.projectMember.map(
                (member) =>
                  member.tagId === specialization.id && (
                    <div
                      key={member.userId}
                      className="flex justify-between w-full rounded-[10px] bg-blue-hover items-center"
                    >
                      <p className="mx-3 my-1">
                        {member.user?.user.firstName}{' '}
                        {member.user?.user.lastName}
                      </p>
                      <RiCloseLine
                        className="p-1 duration-500 rounded-r-lg cursor-pointer size-7 text-normal-ui hover:text-red hover:bg-rose-100"
                        onClick={() => handleDeleteMember(member.userId)}
                      />
                    </div>
                  ),
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TeamForm;
