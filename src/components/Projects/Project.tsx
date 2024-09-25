import { Link } from 'react-router-dom';
import { type Tag, type Project, RootState } from '../../types';
import { getProjectStatusLabel } from '../../utils/projectStatusOptions';
import { useSelector } from 'react-redux';

interface ProjectProps {
  project: Project;
  tags?: Tag[];
}

const Project: React.FC<ProjectProps> = ({ project, tags = [] }) => {
  const user = useSelector((state: RootState) => state.userState.user);

  const borderColor =
    project.projectStatus === 'ended'
      ? '#14B541'
      : project.projectStatus === 'working'
        ? '#2e57db'
        : '#f16600';

  const filteredTags = tags
    .filter((tag) =>
      project.projectRequirments.some(
        (req) => req.tagId === tag.id && tag.isSpecialization,
      ),
    )
    .map((tag) => {
      const req = project.projectRequirments.find(
        (req) => req.tagId === tag.id,
      );
      const memberCount = project.projectMember.filter(
        (member) => member.tagId === tag.id,
      ).length;

      return {
        id: tag.id,
        name: tag.name,
        color: tag.color,
        count: memberCount,
        maxCount: req ? req.count : 5,
      };
    });

  return (
    <div
      className="w-[412px] h-[560px] border-2 rounded-[10px] bg-white flex flex-col gap-5 px-5 py-7 justify-between"
      style={{ borderColor }}
    >
      <div
        style={{ backgroundColor: borderColor }}
        className="px-5 py-2 text-white rounded-r-[10px] -ml-5 self-start"
      >
        {getProjectStatusLabel(project.projectStatus)}
      </div>
      <h2 className="text-2xl font-bold">{project.name}</h2>
      <p className="font-semibold">Склад команди</p>
      <div className="flex flex-wrap gap-3">
        {filteredTags.map((tag) => {
          return (
            <div
              key={tag.id}
              style={{ borderColor: tag.color }}
              className="text-text-gray rounded-[10px] px-2 py-1 border-2"
            >
              {tag.name}{' '}
              {tag.count === tag.maxCount ? (
                <span className="text-primary-blue">{tag.count}</span>
              ) : (
                <span>{tag.count}</span>
              )}
              <span className="text-primary-blue">/{tag.maxCount}</span>
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
      {user?.user.isAdmin && project.projectStatus !== 'ended' ? (
        <Link
          to={`${project.id}/edit`}
          className="border-2 border-primary-blue rounded-[10px] duration-500 hover:bg-primary-blue hover:text-white font-semibold flex justify-center items-center w-[268px] h-10 self-center"
        >
          Редагувати
        </Link>
      ) : (
        <Link
          to={`${project.id}`}
          className="border-2 border-primary-blue rounded-[10px] duration-500 hover:bg-primary-blue hover:text-white font-semibold flex justify-center items-center w-[268px] h-10 self-center"
        >
          Детальніше
        </Link>
      )}
    </div>
  );
};

export default Project;
