import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AddParticipantsForm from '../components/Projects/AddParticipantsForm';
import DescriptionForm from '../components/ProjectEdit/DescriptionForm';
import ProjectPointsForm from '../components/ProjectEdit/ProjectPointsForm';
import Spinner from '../components/Spinner';
import TeamForm from '../components/ProjectEdit/TeamForm';
import TitleForm from '../components/ProjectEdit/TitleForm';
import { RootState, UpdateProjectRequest } from '../types';
import { getProjectById, updateProject } from '../utils/projectApi';
import { getTags } from '../utils/tagApi';

const ProjectEdit = () => {
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) => state.userState.user);

  const {
    data: project,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['project', id],
    queryFn: () => getProjectById(Number(id), user!.token),
    enabled: !!user?.token,
  });

  const {
    data: tags,
    isError: isTagsError,
    isPending: isTagsPending,
  } = useQuery({
    queryKey: ['tags', user?.token],
    queryFn: () => getTags(user!.token),
    enabled: !!user?.token,
  });

  const projectSpecializations = tags?.filter((tag) =>
    project?.projectRequirments.some(
      (req) => req.tagId === tag.id && tag.isSpecialization,
    ),
  );

  const methods = useForm<UpdateProjectRequest>();
  const { reset } = methods;

  useEffect(() => {
    if (project && tags) {
      const projectSpecializations = tags?.filter((tag) =>
        project?.projectRequirments.some(
          (req) => req.tagId === tag.id && tag.isSpecialization,
        ),
      );

      reset({
        name: project?.name,
        description: project?.description,
        projectPoints: project?.projectPoints,
        projectType: project?.projectType,
        price: project?.price,
        dateStart: project?.dateStart,
        dateTeam: project?.dateTeam,
        links: project?.links,
        specializations: projectSpecializations,
      });
    }
  }, [project, tags, reset]);

  const mutation = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      toast.success('Проєкт успішно створено');
    },
    onError: () => {
      toast.error('Не вдалося створити проєкт');
    },
  });

  const onSubmit: SubmitHandler<UpdateProjectRequest> = (data) => {
    const token = user?.token;
    const projectId = project?.id;
    if (token && projectId) {
      mutation.mutate({
        projectData: data,
        token,
        projectId,
      });
      // console.log(data);
    }
  };

  if (isPending || isTagsPending || !project || !tags) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <section className="flex w-full gap-5 px-8 py-5 bg-light-blue-bg height-100">
        <h2 className="text-2xl text-center mt-[10%]">
          Виникла помилка при завантаженні проєкта. Спробуйте пізніше.
        </h2>
      </section>
    );
  }

  if (isTagsError) {
    console.log(isTagsError);
  }

  console.log(project);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-5 px-8 py-5 height-100 bg-light-blue-bg text-text-black"
      >
        <TitleForm project={project} />
        <h3 className="mb-3 ml-8 text-xl font-bold">Опис проєкту</h3>
        <div className="flex flex-wrap gap-5 mb-10">
          <DescriptionForm />
          <ProjectPointsForm />
        </div>
        <TeamForm
          project={project}
          projectSpecializations={projectSpecializations}
        />
        <AddParticipantsForm
          project={project}
          projectSpecializations={projectSpecializations}
        />
        {/* BUTTONS */}
        <div className="flex gap-[316px]">
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="border-2 border-primary-blue rounded-[10px] duration-500 text-black hover:bg-transparent hover:text-primary-blue font-semibold flex justify-center items-center w-[268px] h-10 mt-2"
            >
              {mutation.isPending ? 'Збереження...' : 'Зберегти зміни'}
            </button>
            {project.projectStatus !== 'ended' && (
              <button
                type="submit"
                className="border-2 border-primary-blue rounded-[10px] duration-500 bg-primary-blue text-white hover:bg-transparent hover:text-black font-semibold flex justify-center items-center w-[268px] h-10 mt-2"
              >
                {mutation.isPending
                  ? 'Зміна  статусу...'
                  : project.projectStatus === 'working'
                    ? 'Завершити проєкт'
                    : 'Проєкт в роботу'}
              </button>
            )}
            {project.projectStatus === 'ended' && (
              <button
                type="submit"
                className="border-2 border-red rounded-[10px] duration-500 text-red hover:bg-transparent hover:text-black font-semibold flex justify-center items-center w-[268px] h-10 mt-2"
              >
                {mutation.isPending ? 'Видалення...' : 'Видалити проєкт'}
              </button>
            )}
          </div>
          <button
            type="submit"
            className="border-2 border-primary-blue rounded-[10px] duration-500 text-black hover:bg-transparent hover:text-primary-blue font-semibold flex justify-center items-center w-[268px] h-10 mt-2"
          >
            Робота с заявками
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ProjectEdit;
