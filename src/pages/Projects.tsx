import Project from '../components/Projects/Project';
import ProjectsHeader from '../components/Projects/ProjectsHeader';
import ProjectsTabs from '../components/Projects/ProjectsTabs';
import { projects } from '../data';

const Projects = () => {
  return (
    <section className="flex flex-col w-full gap-5 px-8 py-5">
      <ProjectsHeader />
      <ProjectsTabs />
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
      {projects.length > 0 && (
        <div className="grid grid-cols-3 gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {projects.map((project) => (
            <Project key={project.id} {...project} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
