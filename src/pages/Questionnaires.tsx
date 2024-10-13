import { FaCheck } from 'react-icons/fa6';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import Spinner from '../components/Spinner';
import { RootState } from '../types';
import { getTags } from '../utils/tagApi';
import { users } from '../utils/users';

const Questionnaires = () => {
  const user = useSelector((state: RootState) => state.userState.user);
  const [isOpen, setIsOpen] = useState(false);
  const [parent] = useAutoAnimate();
  const [selectedSpecializations, setSelectedSpecializations] = useState<
    number[]
  >([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const {
    data: tags,
    isError,
    isPending,
  } = useQuery({
    queryKey: ['tags', user?.token],
    queryFn: () => getTags(user!.token),
    enabled: !!user?.token,
  });

  const specializations = tags?.filter((tag) => tag.isSpecialization === true);

  const toggleSpecialization = (id: number) => {
    if (selectedSpecializations.includes(id)) {
      setSelectedSpecializations(
        selectedSpecializations.filter((specId) => specId !== id),
      );
    } else {
      setSelectedSpecializations([...selectedSpecializations, id]);
    }
  };

  const filteredUsers = selectedSpecializations.length
    ? users.filter((user) => {
        const specializationId = specializations?.find(
          (tag) => tag.name === user.specialization,
        )?.id;

        return selectedSpecializations.includes(specializationId ?? -1);
      })
    : users;

  const handleAccept = (id: number) => {
    alert(`Заявку користувача ${users[id - 1].firstName} прийнято!`);
  };

  const handleReject = (id: number) => {
    alert(`Заявку користувача ${users[id - 1].firstName} відхилено!`);
  };

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <section className="flex w-full gap-5 px-8 py-5 bg-light-blue-bg height-100">
        <h2 className="text-2xl text-center mt-[10%]">
          Виникла помилка при завантаженні. Спробуйте пізніше.
        </h2>
      </section>
    );
  }

  return (
    <main className="flex flex-col w-full gap-5 height-100 p-7">
      <div className="h-[60px] flex justify-center items-center text-2xl font-bold text-text-black bg-white rounded-[10px] border-card-border border">
        <h1>Робота з анкетами</h1>
      </div>
      <div className="rounded-[10px] border-card-border border overflow-scroll flex-grow">
        <table className="w-full bg-white table-fixed">
          <thead className="font-bold bg-input-normal-state">
            <tr>
              <th className="px-4 py-2 border-r w-28 border-card-border">
                Ім'я
              </th>
              <th className="px-4 py-2 border-r w-28 border-card-border">
                Прізвище
              </th>
              <th className="px-4 py-2 border-r border-card-border w-28">
                Країна
              </th>
              <th className="px-4 py-2 border-r border-card-border w-28">
                Місто
              </th>
              <th className="px-4 py-2 border-r border-card-border w-44">
                Телефон
              </th>
              <th className="relative px-4 py-2 border-r w-52 border-card-border">
                Спеціалізація
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`size-6 cursor-pointer inline ml-2 duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                  onClick={toggleDropdown}
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
                {isOpen && (
                  <ul className="absolute left-0 z-10 w-full border rounded shadow-lg bg-input-normal-state top-[42px] border-card-border p-[10px] flex flex-col items-start gap-1">
                    {specializations?.map((specialization) => (
                      <li
                        className="flex items-center gap-3 font-normal cursor-pointer "
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
              </th>
              <th className="w-48 px-4 py-2 border-r border-card-border">
                Електронна пошта
              </th>
              <th className="w-32 px-4 py-2 border-r border-card-border">
                Нік Discord
              </th>
              <th className="w-32 px-4 py-2 border-r border-card-border ">
                Linkedin
              </th>
              <th className="px-4 py-2 border-r w-44 border-card-border">
                Прийняти заявку
              </th>
              <th className="px-4 py-2 border-r border-card-border w-44">
                Відхилити заявку
              </th>
              <th className="px-4 py-2 w-28">Статус</th>
            </tr>
          </thead>
          <tbody className="text-center" ref={parent}>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                style={{
                  backgroundColor:
                    user.status === false ? '#F0F2FB' : 'transparent',
                }}
              >
                <td className="relative px-4 py-2 truncate">
                  {user.firstName}
                  <span className="absolute top-0 right-0 w-full h-full border-t border-r border-card-border"></span>
                </td>
                <td className="relative px-4 py-2 truncate">
                  {user.lastName}
                  <span className="absolute top-0 right-0 w-full h-full border-t border-r border-card-border"></span>
                </td>
                <td className="relative px-4 py-2 truncate">
                  {user.country}
                  <span className="absolute top-0 right-0 w-full h-full border-t border-r border-card-border"></span>
                </td>
                <td className="relative px-4 py-2 truncate">
                  {user.city}
                  <span className="absolute top-0 right-0 w-full h-full border-t border-r border-card-border"></span>
                </td>
                <td className="relative px-4 py-2 truncate">
                  {user.phone}
                  <span className="absolute top-0 right-0 w-full h-full border-t border-r border-card-border"></span>
                </td>
                <td className="relative px-4 py-2 truncate">
                  {user.specialization}
                  <span className="absolute top-0 right-0 w-full h-full border-t border-r border-card-border"></span>
                </td>
                <td className="relative z-10 px-4 py-2 truncate">
                  {user.email}
                  <span className="absolute top-0 right-0 w-full h-full border-t border-r border-card-border -z-10"></span>
                </td>
                <td className="relative px-4 py-2 truncate">
                  {user.discord}
                  <span className="absolute top-0 right-0 w-full h-full border-t border-r border-card-border"></span>
                </td>
                <td className="relative px-4 py-2 truncate">
                  {user.linkedin}
                  <span className="absolute top-0 right-0 w-full h-full border-t border-r border-card-border"></span>
                </td>
                <td className="relative z-10 px-4 py-2">
                  <button
                    disabled={user.status !== null}
                    onClick={() => handleAccept(user.id)}
                    className="px-4 py-1 text-white bg-primary-blue hover:bg-white rounded-[10px] duration-500 hover:text-black border border-primary-blue disabled:opacity-50 disabled:hover:bg-primary-blue disabled:hover:text-white disabled:cursor-not-allowed disabled:filter disabled:brightness-50"
                  >
                    Прийняти
                  </button>
                  <span className="absolute top-0 right-0 w-full h-full border-t border-r -z-10 border-card-border"></span>
                </td>
                <td className="relative z-10 px-4 py-2">
                  <button
                    disabled={user.status !== null}
                    onClick={() => handleReject(user.id)}
                    className="px-4 py-1 text-red rounded-[10px] duration-500 hover:text-black border border-red disabled:opacity-50 disabled:hover:text-red disabled:cursor-not-allowed disabled:filter disabled:brightness-50"
                  >
                    Відхилити
                  </button>
                  <span className="absolute top-0 right-0 w-full h-full border-t border-r border-card-border -z-10"></span>
                </td>
                <td
                  className="relative px-4 py-2"
                  style={{
                    color:
                      user.status === true
                        ? '#34A853'
                        : user.status === false
                          ? '#FA2727'
                          : '#FFB800',
                  }}
                >
                  {user.status === true
                    ? 'Прийнято'
                    : user.status === false
                      ? 'Відхилено'
                      : 'Нова'}
                  <span className="absolute top-0 right-0 w-full h-full border-t border-card-border"></span>
                </td>
              </tr>
            ))}
            <tr className="flex-grow border-t border-card-border">
              <td className="h-full"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Questionnaires;
