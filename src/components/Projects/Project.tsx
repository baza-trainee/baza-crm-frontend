import { Link } from 'react-router-dom';

type Tag = {
  id: number;
  label: string;
  number: number;
  all: number;
};

type ProjectProps = {
  id: number;
  label: string;
  title: string;
  tags: Tag[];
  points: number;
  teamStart: string;
  projectStart: string;
};

const Project: React.FC<ProjectProps> = ({
  id,
  label,
  title,
  tags,
  points,
  teamStart,
  projectStart,
}) => {
  const borderColor =
    label === 'Завершені'
      ? '#14B541'
      : label === 'В розробці'
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
        {label}
      </div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="font-semibold">Склад команди</p>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => {
          return (
            <div
              key={tag.id}
              className="text-text-gray rounded-[10px] px-2 py-1 border-2 border-card-border"
            >
              {tag.label}{' '}
              {tag.number === tag.all ? (
                <span className="text-primary-blue">{tag.number}</span>
              ) : (
                <span>{tag.number}</span>
              )}
              <span className="text-primary-blue">/{tag.all}</span>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between gap-3">
        <p className="font-semibold">Бали за участь в проєкту</p>
        <p>{points} Бали</p>
      </div>
      <div className="flex justify-between gap-3">
        <p className="font-semibold">Період формування проєкту</p>
        <p>{teamStart}</p>
      </div>
      <div className="flex justify-between gap-3">
        <p className="font-semibold">Період розробки</p>
        <p>{projectStart}</p>
      </div>
      <Link
        to={`${id}`}
        className="border-2 border-primary-blue rounded-[10px] duration-500 hover:bg-primary-blue hover:text-white font-semibold flex justify-center items-center w-[268px] h-10 self-center"
      >
        Детальніше
      </Link>
    </div>
  );
};

export default Project;
