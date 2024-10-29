import { FaCheck } from 'react-icons/fa6';
import { useState } from 'react';

import { Tag } from '../../types';

interface TableHeadApplicationsProps {
  specializations: Tag[] | undefined;
  selectedSpecializations: number[];
  setSelectedSpecializations: React.Dispatch<React.SetStateAction<number[]>>;
  resolvedFilter: boolean;
  setResolvedFilter: React.Dispatch<React.SetStateAction<boolean>>;
}
const TableHeadApplications: React.FC<TableHeadApplicationsProps> = ({
  specializations,
  selectedSpecializations,
  setSelectedSpecializations,
  resolvedFilter,
  setResolvedFilter,
}) => {
  const [isOpenSpecialization, setIsOpenSpecialization] = useState(false);
  const [isOpenStatus, setIsOpenStatus] = useState(false);

  const toggleDropdownSpecialization = () => {
    setIsOpenSpecialization(!isOpenSpecialization);
  };
  const toggleDropdownStatus = () => {
    setIsOpenStatus(!isOpenStatus);
  };

  const toggleStatusTrue = () => {
    setResolvedFilter(true);
  };

  const toggleStatusFalse = () => {
    setResolvedFilter(false);
  };

  const toggleSpecialization = (id: number) => {
    if (selectedSpecializations.includes(id)) {
      setSelectedSpecializations(
        selectedSpecializations.filter((specId) => specId !== id),
      );
    } else {
      setSelectedSpecializations([...selectedSpecializations, id]);
    }
  };

  return (
    <thead className="font-bold bg-input-normal-state">
      <tr>
        <th className="relative px-4 py-2 w-28">
          Ім'я
          <span className="absolute top-0 right-0 w-full h-full border-r border-card-border"></span>
        </th>
        <th className="relative w-32 px-4 py-2">
          Прізвище
          <span className="absolute top-0 right-0 w-full h-full border-r border-card-border"></span>
        </th>
        <th className="relative px-4 py-2 w-28">
          Країна
          <span className="absolute top-0 right-0 w-full h-full border-r border-card-border"></span>
        </th>
        <th className="relative z-10 w-40 px-4 py-2">
          Спеціалізація
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`size-6 cursor-pointer inline ml-2 duration-500 ${isOpenSpecialization ? 'rotate-180' : 'rotate-0'}`}
            onClick={toggleDropdownSpecialization}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          {isOpenSpecialization && (
            <ul className="absolute left-0 z-10 flex flex-col items-start w-full border rounded shadow-lg bg-input-normal-state top-16 border-card-border">
              {specializations?.map((specialization) => (
                <li
                  className="flex items-center w-full gap-3 p-[10px] font-normal cursor-pointer hover:bg-hover-blue duration-500"
                  key={specialization.id}
                  onClick={() => toggleSpecialization(specialization.id)}
                >
                  <FaCheck
                    className="text-white border rounded border-primary-blue size-5"
                    style={{
                      backgroundColor: selectedSpecializations.includes(
                        specialization.id,
                      )
                        ? '#1e70eb'
                        : 'white',
                    }}
                  />{' '}
                  {specialization.name}
                </li>
              ))}
            </ul>
          )}
          <span className="absolute top-0 right-0 w-full h-full border-r border-card-border -z-10"></span>
        </th>
        <th className="relative w-48 px-4 py-2">
          Електронна пошта
          <span className="absolute top-0 right-0 w-full h-full border-r border-card-border"></span>
        </th>
        <th className="relative px-4 py-2 w-28">
          Linkedin
          <span className="absolute top-0 right-0 w-full h-full border-r border-card-border"></span>
        </th>
        <th className="relative w-24 px-4 py-2">
          Бали за проєкти
          <span className="absolute top-0 right-0 w-full h-full border-r border-card-border"></span>
        </th>
        <th className="relative px-4 py-2 w-36">
          Оцінка команди
          <span className="absolute top-0 right-0 w-full h-full border-r border-card-border"></span>
        </th>
        <th className="relative w-40 px-4 py-2">
          Прийняти заявку
          <span className="absolute top-0 right-0 w-full h-full border-r border-card-border"></span>
        </th>
        <th className="relative w-40 px-4 py-2">
          Відхилити заявку
          <span className="absolute top-0 right-0 w-full h-full border-r border-card-border"></span>
        </th>
        <th className="relative w-32 px-4 py-2">
          Статус
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`size-6 cursor-pointer inline ml-2 duration-500 ${isOpenStatus ? 'rotate-180' : 'rotate-0'}`}
            onClick={toggleDropdownStatus}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          {isOpenStatus && (
            <ul className="absolute left-0 z-10 flex flex-col items-start w-full border rounded shadow-lg bg-input-normal-state top-16 border-card-border">
              <li
                className="flex items-center w-full gap-3 p-[10px] font-normal cursor-pointer hover:bg-hover-blue duration-500"
                onClick={() => toggleStatusTrue()}
              >
                <FaCheck
                  className="text-white border rounded border-primary-blue size-5"
                  style={{
                    backgroundColor:
                      resolvedFilter === true ? '#1e70eb' : 'white',
                  }}
                />{' '}
                Оброблені
              </li>
              <li
                className="flex items-center w-full gap-3 p-[10px] font-normal cursor-pointer hover:bg-hover-blue duration-500"
                onClick={() => toggleStatusFalse()}
              >
                <FaCheck
                  className="text-white border rounded border-primary-blue size-5"
                  style={{
                    backgroundColor:
                      resolvedFilter === false ? '#1e70eb' : 'white',
                  }}
                />{' '}
                Необроблені
              </li>
            </ul>
          )}
        </th>
      </tr>
    </thead>
  );
};
export default TableHeadApplications;
