import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import Project from '../components/Projects/Project';
import ProjectsHeader from '../components/Projects/ProjectsHeader';
import ProjectsTabs from '../components/Projects/ProjectsTabs';
import Spinner from '../components/Spinner';
import { RootState } from '../types';
import {
  countProjectsByStatus,
  projectStatusOptions,
} from '../utils/projectStatusOptions';
import { getProjects } from '../utils/projectApi';
import { getTags } from '../utils/tagApi';

const Projects = () => {
  const [selectedOption, setSelectedOption] = useState(projectStatusOptions);
  const [parent] = useAutoAnimate();
  const user = useSelector((state: RootState) => state.userState.user);

  const {
    data: projects,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['projects', user?.token],
    queryFn: () => getProjects(user!.token),
    enabled: !!user?.token,
  });

  const { data: tags, isError: isTagsError } = useQuery({
    queryKey: ['tags'],
    queryFn: () => getTags(),
  });

  if (isTagsError) {
    console.log(isTagsError);
  }

  let projectNumber = {};

  if (projects) {
    projectNumber = countProjectsByStatus(projects);
  }

  // const filteredProjects =
  //   selectedOption.value === 'all'
  //     ? projects
  //     : projects?.filter(
  //         (project) => project.projectStatus === selectedOption.value,
  //       );

  const filteredProjects = projects?.filter((project) =>
    selectedOption.some((option) => option.value === project.projectStatus),
  );

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <section className="flex flex-col w-full gap-5 px-8 py-5 bg-light-blue-bg height-100">
        <ProjectsHeader />
        <h2 className="text-2xl text-center mt-[10%]">
          Виникла помилка при завантаженні проєктів. Спробуйте пізніше.
        </h2>
      </section>
    );
  }

  return (
    <section className="flex flex-col w-full min-h-screen gap-5 px-8 py-5 bg-light-blue-bg">
      <ProjectsHeader />
      <ProjectsTabs
        projectNumber={projectNumber}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      {projects.length === 0 && (
        <div className="flex flex-col max-w-md gap-3 px-4 py-12 text-xl">
          <p>
            На даний момент всі проєкти знаходяться в стадії розробки або
            завершені.
          </p>
          <p>Зараз ми активно шукаємо нові проєкти.</p>
          <p>Слідкуйте за повідомленнями на нашому Discord каналі.</p>
        </div>
      )}
      {filteredProjects && filteredProjects.length === 0 && (
        <h2 className="text-2xl text-center mt-[10%]">
          {selectedOption.length > 0
            ? 'Немає проєктів зі ' +
              (selectedOption.length === 1 ? 'статусом' : 'статусами') +
              ' "' +
              selectedOption
                .slice(0, 3)
                .map((option) => option.label)
                .join(', ') +
              '"' +
              (selectedOption.length > 3 ? ' та інших' : '')
            : 'Оберіть статус проєкту'}
        </h2>
      )}
      {filteredProjects && filteredProjects.length > 0 && (
        <div
          className="grid grid-cols-3 gap-5 lg:grid-cols-4 xl:grid-cols-5 place-items-center"
          ref={parent}
        >
          {filteredProjects.map((project) => (
            <Project key={project.id} project={project} tags={tags} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
