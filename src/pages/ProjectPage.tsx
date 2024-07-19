import { useParams } from 'react-router-dom';

import { projects } from '../data';

const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((project) => project.id === Number(id));
  const { label, title, tags, points, teamStart, projectStart } = project || {};
  console.log(tags, points, teamStart, projectStart);
  const borderColor =
    label === 'Завершені'
      ? '#14B541'
      : label === 'В розробці'
        ? '#2e57db'
        : '#f16600';

  return (
    <main className="flex flex-col w-full min-h-screen gap-5 px-8 py-5 bg-light-blue-bg">
      <div className="h-[60px] flex justify-between items-center font-bold text-text-black bg-white rounded-xl border-card-border border px-8">
        <h1 className="text-2xl">{title}</h1>
        <div
          style={{ backgroundColor: borderColor }}
          className="px-5 py-2 text-white rounded-[10px]"
        >
          {label}
        </div>
      </div>
    </main>
  );
};

export default ProjectPage;
