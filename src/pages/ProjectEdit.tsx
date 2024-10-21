import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AddParticipantsForm from '../components/Projects/AddParticipantsForm';
import DescriptionForm from '../components/ProjectEdit/DescriptionForm';
import DocumentsLinks from '../components/ProjectEdit/DocumentsLinks';
import ProjectPointsForm from '../components/ProjectEdit/ProjectPointsForm';
import ProjectTypeForm from '../components/ProjectEdit/ProjectTypeForm';
import SocialsLinks from '../components/ProjectEdit/SocialsLinks';
import Spinner from '../components/Spinner';
import TeamForm from '../components/ProjectEdit/TeamForm';
import TitleForm from '../components/ProjectEdit/TitleForm';
import { RootState, UpdateProjectRequest } from '../types';
import { updateProject } from '../utils/projectApi';
import { getTags } from '../utils/tagApi';
import ProjectApplications from '../components/ProjectEdit/ProjectApplications';
import { useProjectWithUsers } from '../utils/projectUsersApi';
import { changeStatus, finishProject } from '../utils/projectStatusApi';

const ProjectEdit = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.userState.user);
  const token = user?.token;

  const openModal = () => {
    setModalIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const {
    data: project,
    isPending,
    isError,
  } = useProjectWithUsers(token!, Number(id));

  const {
    data: tags,
    isError: isTagsError,
    isPending: isTagsPending,
  } = useQuery({
    queryKey: ['tags', user?.token],
    queryFn: () => getTags(user!.token),
    enabled: !!user?.token,
  });

  const projectSpecializations = tags
    ?.filter((tag) =>
      project?.projectRequirments.some(
        (req) => req.tagId === tag.id && tag.isSpecialization,
      ),
    )
    .map((tag) => {
      const userCount = project?.projectMember.filter(
        (member) => member.tagId === tag.id,
      ).length;

      const requirement = project?.projectRequirments.find(
        (req) => req.tagId === tag.id,
      );

      return {
        ...tag,
        count: requirement?.count || 0,
        userCount,
      };
    });

  const methods = useForm<UpdateProjectRequest>();
  const { reset } = methods;

  useEffect(() => {
    if (project && tags) {
      const parsedDocuments =
        typeof project.documents === 'string' && project.documents
          ? JSON.parse(project.documents)
          : [];

      reset({
        ...project,
        documents: parsedDocuments,
      });
      reset({
        name: project.name,
        description: project.description,
        projectPoints: project.projectPoints,
        projectType: project.projectType,
        price: project.price,
        dateStart: project.dateStart,
        dateTeam: project.dateTeam,
        links: project.links || [],
        documents: parsedDocuments || [],
        specializations: projectSpecializations,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, tags, reset]);

  const mutation = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      toast.success('Проєкт успішно оновлено');
      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });
      queryClient.invalidateQueries({
        queryKey: ['projectWithUsers', project?.id],
      });
      navigate('/crm/projects');
    },
    onError: () => {
      toast.error('Не вдалося змінити проєкт');
    },
  });

  const onSubmit: SubmitHandler<UpdateProjectRequest> = (data) => {
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

  // const mutationDeleteProject = useMutation({
  //   mutationFn: deleteMember,
  //   onSuccess: () => {
  //     toast.success('Учасник успішно видалений');
  //   },
  //   onError: () => {
  //     toast.error('Не вдалося видалити учасника');
  //   },
  // });

  // const handleDeleteProject = (userId: number) => {
  //   const projectId = project?.id;
  //   if (token && userId && projectId) {
  //     mutationDeleteProject.mutate({ userId, token, projectId });
  //   }
  // };

  const mutationChangeStatus = useMutation({
    mutationFn: changeStatus,
    onSuccess: () => {
      toast.success('Статус успішно змінено');
      queryClient.invalidateQueries({ queryKey: ['projectWithUsers'] });
    },
    onError: () => {
      toast.error('Не вдалося змінити статус');
    },
  });

  const handleChangeStatus = () => {
    const projectId = project?.id;
    const status: string = 'working';
    if (token && projectId) {
      mutationChangeStatus.mutate({ status, token, projectId });
    }
  };

  const mutationFinishProject = useMutation({
    mutationFn: finishProject,
    onSuccess: () => {
      toast.success('Статус успішно змінено');
      queryClient.invalidateQueries({ queryKey: ['projectWithUsers'] });
    },
    onError: () => {
      toast.error('Не вдалося змінити статус');
    },
  });

  const handleFinishProject = () => {
    const projectId = project?.id;
    if (token && projectId) {
      mutationFinishProject.mutate({ token, projectId });
    }
  };

  if (isPending || isTagsPending || !project || !tags) {
    return <Spinner />;
  }

  if (isError || isTagsError) {
    return (
      <section className="flex w-full gap-5 px-8 py-5 bg-light-blue-bg height-100">
        <h2 className="text-2xl text-center mt-[10%]">
          Виникла помилка при завантаженні проєкта. Спробуйте пізніше.
        </h2>
      </section>
    );
  }

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
          <div className="w-[412px] flex flex-col gap-2 justify-center">
            <ProjectPointsForm />
            <ProjectTypeForm />
            <DocumentsLinks />
          </div>
          <SocialsLinks />
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
            {project.projectStatus === 'searching' && (
              <button
                type="button"
                onClick={handleChangeStatus}
                className="border-2 border-primary-blue rounded-[10px] duration-500 bg-primary-blue text-white hover:bg-transparent hover:text-black font-semibold flex justify-center items-center w-[268px] h-10 mt-2"
              >
                {mutationChangeStatus.isPending
                  ? 'Зміна  статусу...'
                  : 'Проєкт в роботу'}
              </button>
            )}
            {project.projectStatus === 'working' && (
              <button
                type="button"
                onClick={handleFinishProject}
                className="border-2 border-primary-blue rounded-[10px] duration-500 bg-primary-blue text-white hover:bg-transparent hover:text-black font-semibold flex justify-center items-center w-[268px] h-10 mt-2"
              >
                {mutationFinishProject.isPending
                  ? 'Зміна  статусу...'
                  : 'Завершити проєкт'}
              </button>
            )}
            {/* {project.projectStatus === 'ended' && (
              <button
                type="button"
                onClick={() => handleDeleteProject(project.userId)}
                className="border-2 border-red rounded-[10px] duration-500 text-red hover:bg-transparent hover:text-black font-semibold flex justify-center items-center w-[268px] h-10 mt-2"
              >
                {mutationDeleteProject.isPending ? 'Видалення...' : 'Видалити проєкт'}
              </button>
            )} */}
          </div>
          <button
            type="button"
            onClick={openModal}
            className="border-2 border-primary-blue rounded-[10px] duration-500 text-black hover:bg-transparent hover:text-primary-blue font-semibold flex justify-center items-center w-[268px] h-10 mt-2"
          >
            Робота с заявками
          </button>
        </div>
      </form>
      <ProjectApplications
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        project={project}
      />
    </FormProvider>
  );
};

export default ProjectEdit;
