import {
  FaChevronDown,
  FaLinkedin,
  FaSquareFacebook,
  FaTelegram,
} from 'react-icons/fa6';
import { useParams } from 'react-router-dom';

import { projects } from '../data';

const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((project) => project.id === Number(id));
  const { label, title, tags, points, teamStart, projectStart } = project || {};
  const borderColor =
    label === 'Завершені'
      ? '#14B541'
      : label === 'В розробці'
        ? '#2e57db'
        : '#f16600';

  return (
    <main className="flex flex-col w-full min-h-screen gap-5 px-8 py-5 bg-light-blue-bg text-text-black">
      {/* TITLE */}
      <div className="h-[60px] flex justify-between items-center font-bold text-text-black bg-white rounded-xl border-card-border border px-8 w-[845px] mb-10">
        <h1 className="text-2xl">{title}</h1>
        <div
          style={{ backgroundColor: borderColor }}
          className="px-5 py-2 text-white rounded-[10px]"
        >
          {label}
        </div>
      </div>
      {/* DESCRIPTION */}
      <h3 className="mb-3 ml-8 text-xl font-bold">Опис проєкту</h3>
      <div className="flex flex-wrap gap-5 mb-10">
        <div className="w-[845px] bg-white rounded-[10px] px-8 py-5 border-card-border border h-[220px] flex flex-col justify-between">
          <p className="text-xl">
            Багатосторінковий сайт з адмін панеллю для підбору досвідчених
            спеціалістів у сфері IT.
          </p>
          <p className="flex justify-between gap-5 font-bold max-w-[440px]">
            Дата старту формування команди{' '}
            <span className="ml-14">{teamStart}</span>
          </p>
          <p className="flex justify-between gap-5 font-bold max-w-[440px]">
            Дата старту розробки <span className="ml-14">{projectStart}</span>
          </p>
        </div>
        <div className="w-[412px] flex flex-col justify-between">
          <div className="bg-white rounded-[10px] px-8 py-2 border-card-border border justify-between flex items-end">
            <p className="text-xl">Бали за участь</p>
            <p className="font-semibold">{points} Балів</p>
          </div>
          <div className="bg-white rounded-[10px] px-8 py-2 border-card-border border justify-between flex items-end">
            <p className="text-xl">Формат участі</p>
            <p className="font-semibold text-primary-blue">LIGHT</p>
          </div>
          <div className="bg-white rounded-[10px] px-8 py-2 border-card-border border justify-between flex items-center">
            <p className="text-xl">Документація</p>
            <FaChevronDown />
          </div>
        </div>
        <div className="w-[412px] flex flex-col justify-between bg-white rounded-[10px] px-8 py-5 border-card-border border h-[220px]">
          <div className="flex items-center gap-3">
            <FaLinkedin color="#1e70eb" size={32} />{' '}
            <a
              href="https://www.linkedin.com"
              className="duration-500 hover:text-primary-blue"
            >
              https://www.linkedin.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <FaSquareFacebook color="#1e70eb" size={32} />{' '}
            <a
              href="https://www.facebook.com"
              className="duration-500 hover:text-primary-blue"
            >
              https://www.facebook.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <FaTelegram color="#1e70eb" size={32} />{' '}
            <a
              href="https://www.telegram.com"
              className="duration-500 hover:text-primary-blue"
            >
              https://www.telegram.com
            </a>
          </div>
        </div>
      </div>
      {/* TEAM */}
      <h3 className="mb-3 ml-8 text-xl font-bold">Склад команди</h3>
      <div className="flex flex-wrap gap-5">
        {tags?.map((tag) => (
          <div className="w-[268px] bg-white rounded-[10px] px-8 py-5 border-card-border border h-[282px] flex flex-col justify-start gap-3">
            <div className="flex items-center justify-between">
              <div className="px-8 py-2 text-white rounded-r-[10px] -ml-8 self-start bg-primary-blue">
                {tag.label}
              </div>
              <p>
                {tag.number === tag.all ? (
                  <span className="text-primary-blue">{tag.number}</span>
                ) : (
                  <span>{tag.number}</span>
                )}
                <span className="text-primary-blue">/{tag.all}</span>
              </p>
            </div>
            <div>
              <p>Олена Ковальчук</p>
              <p>Тарас Шевченко</p>
              <p>Оксана Лисенко</p>
              <p>Максим Головко</p>
              <p>Софія Пономаренко</p>
            </div>
          </div>
        ))}
      </div>
      {/* BUTTON */}
      {label === 'Формується команда' && (
        <button className="text-white hover:bg-light-blue bg-primary-blue w-[268px] h-[40px] rounded-[10px] flex justify-center items-center duration-500">
          Подати заявку
        </button>
      )}
    </main>
  );
};

export default ProjectPage;
