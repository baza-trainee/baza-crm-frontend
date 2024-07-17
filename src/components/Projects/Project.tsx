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
  // points,
  // teamStart,
  // projectStart,
}) => {
  const borderColor =
    label === 'Завершені'
      ? '#14B541'
      : label === 'В розробці'
        ? '#2e57db'
        : '#f16600';

  return (
    <div
      className="w-[412px] h-[560px] border-2 rounded-[10px] bg-white flex flex-col gap-5 px-5 py-7"
      style={{ borderColor }}
    >
      <div
        style={{ backgroundColor: borderColor }}
        className="px-5 py-2 text-white rounded-r-[10px] -ml-5"
      >
        {label}
      </div>
      <h2>{title}</h2>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <div
            key={id}
            className="text-text-gray rounded-[10px] px-2 py-1 border-2 border-card-border"
          >
            {tag.label} {tag.number}/{tag.all}
          </div>
        ))}
      </div>
      <Link
        to={`${id}`}
        className="border-2 border-primary-blue rounded-[10px] duration-500 hover:bg-primary-blue hover:text-white font-semibold flex justify-center items-center w-[268px] h-10"
      >
        Детальніше
      </Link>
    </div>
  );
};

export default Project;
