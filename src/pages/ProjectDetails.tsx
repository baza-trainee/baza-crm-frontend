import { FaLinkedin, FaSquareFacebook, FaTelegram } from 'react-icons/fa6';
import { Tooltip } from 'react-tooltip';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import ProjectDropdown from '../components/Projects/ProjectDropdown';
import ProjectFormat from '../components/Projects/ProjectFormat';
import Spinner from '../components/Spinner';
import { RootState } from '../types';
import { getProjectById } from '../utils/projectApi';
import { getProjectStatusLabel } from '../utils/projectStatusOptions';

const ProjectDetails: React.FC = () => {
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

  if (isPending) {
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

  const borderColor =
    project.projectStatus === 'ended'
      ? '#14B541'
      : project.projectStatus === 'working'
        ? '#2e57db'
        : '#f16600';

  return (
    <main className="flex flex-col w-full gap-5 px-8 py-5 height-100 bg-light-blue-bg text-text-black">
      {/* TITLE */}
      <div className="h-[60px] flex justify-between items-center font-bold text-text-black bg-white rounded-xl border-card-border border px-8 w-[845px] mb-10">
        <h1 className="text-2xl">{project?.name}</h1>
        <div
          style={{ backgroundColor: borderColor }}
          className="px-5 py-2 text-white rounded-[10px]"
        >
          {getProjectStatusLabel(project.projectStatus)}
        </div>
      </div>
      {/* DESCRIPTION */}
      <h3 className="mb-3 ml-8 text-xl font-bold">Опис проєкту</h3>
      <div className="flex flex-wrap gap-5 mb-10">
        <div className="w-[845px] bg-white rounded-[10px] px-8 py-5 border-card-border border flex flex-col justify-between">
          <p>{project?.description}</p>
          <p className="flex justify-between gap-5 font-bold max-w-[440px]">
            Дата старту формування команди{' '}
            <span className="ml-14">{project?.dateTeam}</span>
          </p>
          <p className="flex justify-between gap-5 font-bold max-w-[440px]">
            Дата старту розробки{' '}
            <span className="ml-14">{project?.dateStart}</span>
          </p>
        </div>
        <div className="w-[412px] flex flex-col justify-between gap-5">
          <div className="bg-white rounded-[10px] px-8 py-2 border-card-border border justify-between flex items-end">
            <p>Бали за участь</p>
            <p className="font-semibold">{project.projectPoints} Балів</p>
          </div>
          <div className="bg-white rounded-[10px] px-8 py-2 border-card-border border justify-between flex items-end">
            <p>Формат участі</p>
            <p
              className="font-semibold uppercase cursor-default text-primary-blue"
              data-tooltip-id="my-tooltip"
            >
              {project.projectType}
            </p>
            <Tooltip
              id="my-tooltip"
              place="bottom"
              style={{ backgroundColor: 'transparent', zIndex: 20 }}
            >
              <ProjectFormat projectType={project.projectType} />
            </Tooltip>
          </div>
          <ProjectDropdown />
        </div>
        <div className="w-[412px] flex flex-col justify-between bg-white rounded-[10px] px-8 py-5 border-card-border border">
          <div className="flex items-center gap-3">
            <FaLinkedin color="#1e70eb" size={32} />{' '}
            <a
              href="https://www.linkedin.com"
              className="relative inline-block duration-500 group"
            >
              <span className="group-hover:after:w-full after:w-0 after:block after:h-[1px] after:bg-primary-blue after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-500 hover:text-primary-blue">
                https://www.linkedin.com
              </span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <FaSquareFacebook color="#1e70eb" size={32} />{' '}
            <a
              href="https://www.facebook.com"
              className="relative inline-block duration-500 group"
            >
              <span className="group-hover:after:w-full after:w-0 after:block after:h-[1px] after:bg-primary-blue after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-500 hover:text-primary-blue">
                https://www.facebook.com
              </span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <FaTelegram color="#1e70eb" size={32} />{' '}
            <a
              href="https://www.telegram.com"
              className="relative inline-block duration-500 group"
            >
              <span className="group-hover:after:w-full after:w-0 after:block after:h-[1px] after:bg-primary-blue after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-500 hover:text-primary-blue">
                https://www.telegram.com
              </span>
            </a>
          </div>
        </div>
      </div>
      {/* TEAM */}
      <h3 className="mb-3 ml-8 text-xl font-bold">Склад команди</h3>
      <div className="flex flex-wrap gap-5">
        {project.projectRequirments.map((tag) => (
          <div className="w-[268px] bg-white rounded-[10px] px-8 py-5 border-card-border border h-[282px] flex flex-col justify-start gap-3">
            <div className="flex items-center justify-between">
              <div className="px-8 py-2 text-white rounded-r-[10px] -ml-8 self-start bg-primary-blue">
                {tag.tagId}
              </div>
              <p>
                {tag.count === 5 ? (
                  <span className="text-primary-blue">{tag.count}</span>
                ) : (
                  <span>{tag.count}</span>
                )}
                <span className="text-primary-blue">/{tag.tagId}</span>
              </p>
            </div>
            <div>
              <p>Аникій Філіппов</p>
              <p>Віктор Філіппов</p>
              <p>Оксана Лисенко</p>
              <p>Максим Головко</p>
              <p>Софія Пономаренко</p>
            </div>
          </div>
        ))}
      </div>
      {/* BUTTON */}
      {project.projectStatus === 'searching' && !user?.user.isAdmin && (
        <button className="border-2 border-primary-blue rounded-[10px] duration-500 bg-primary-blue text-white hover:bg-white hover:text-primary-blue font-semibold flex justify-center items-center w-[268px] h-10">
          Подати заявку
        </button>
      )}
    </main>
  );
};

export default ProjectDetails;
