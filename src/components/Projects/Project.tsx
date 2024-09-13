import { Link } from 'react-router-dom';
import { type Project } from '../../utils/fetchProject';

interface ProjectProps {
  project: Project;
}

const Project: React.FC<ProjectProps> = ({ project }) => {
  const borderColor =
    project.projectStatus === 'Завершені'
      ? '#14B541'
      : project.projectStatus === 'В розробці'
        ? '#2e57db'
        : '#f16600';

  return (
    <div
      className="w-[412px] h-[560px] border-2 rounded-[10px] bg-white flex flex-col gap-5 px-5 py-7 justify-between"
      style={{ borderColor }}
    >
      <div
        style={{ backgroundColor: borderColor }}
        className="px-5 py-2 text-white rounded-r-[10px] -ml-5 self-start"
      >
        {project.projectStatus}
      </div>
      <h2 className="text-2xl font-bold">{project.name}</h2>
      <p className="font-semibold">Склад команди</p>
      <div className="flex flex-wrap gap-3">
        {project.projectRequirments.map((tag) => {
          return (
            <div
              key={tag.tagId}
              className="text-text-gray rounded-[10px] px-2 py-1 border-2 border-card-border"
            >
              {tag.tagId}{' '}
              {tag.count === 5 ? (
                <span className="text-primary-blue">{tag.count}</span>
              ) : (
                <span>{tag.count}</span>
              )}
              <span className="text-primary-blue">/5</span>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between gap-3">
        <p className="font-semibold max-w-48">
          Бали за участь в розробці проєкту
        </p>
        <p>{project.projectPoints} Бали</p>
      </div>
      <div className="flex justify-between gap-3">
        <p className="font-semibold max-w-48">Дата старту формування команди</p>
        <p>{project.dateTeam}</p>
      </div>
      <div className="flex justify-between gap-3">
        <p className="font-semibold max-w-48">Дата старту розробки</p>
        <p>{project.dateStart}</p>
      </div>
      <Link
        to={`${project.id}`}
        className="border-2 border-primary-blue rounded-[10px] duration-500 hover:bg-primary-blue hover:text-white font-semibold flex justify-center items-center w-[268px] h-10 self-center"
      >
        Детальніше
      </Link>
    </div>
  );
};

export default Project;
