import { users } from '../utils/users';

const Questionnaires = () => {
  const handleAccept = (id: number) => {
    alert(`Заявку користувача ${users[id - 1].firstName} прийнято!`);
  };

  const handleReject = (id: number) => {
    alert(`Заявку користувача ${users[id - 1].firstName} відхилено!`);
  };

  return (
    <main className="p-7">
      <div className="h-[60px] flex justify-center items-center text-2xl font-bold text-text-black bg-white rounded-[10px] border-card-border border mb-5">
        <h1>Робота з анкетами</h1>
      </div>
      <div className="rounded-[10px] border-card-border border overflow-scroll">
        <table className="w-full bg-white table-auto">
          <thead className="font-bold bg-input-normal-state">
            <tr>
              <th className="px-4 py-2 border-r border-card-border">Ім'я</th>
              <th className="px-4 py-2 border-r border-card-border">
                Прізвище
              </th>
              <th className="px-4 py-2 border-r border-card-border">Країна</th>
              <th className="px-4 py-2 border-r border-card-border">Місто</th>
              <th className="px-4 py-2 border-r border-card-border">Телефон</th>
              <th className="px-4 py-2 border-r border-card-border">
                Спеціалізація
              </th>
              <th className="px-4 py-2 border-r border-card-border">
                Електронна пошта
              </th>
              <th className="px-4 py-2 border-r border-card-border">
                Нік Discord
              </th>
              <th className="px-4 py-2 border-r border-card-border">
                Linkedin
              </th>
              <th className="px-4 py-2 border-r border-card-border">
                Прийняти заявку
              </th>
              <th className="px-4 py-2 border-r border-card-border">
                Відхилити заявку
              </th>
              <th className="px-4 py-2">Статус</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-card-border">
            {users.map((user) => (
              <tr
                key={user.id}
                className="text-center"
                style={{
                  backgroundColor:
                    user.status === false ? '#F0F2FB' : 'transparent',
                }}
              >
                <td className="px-4 py-2 border-r border-card-border">
                  {user.firstName}
                </td>
                <td className="px-4 py-2 border-r border-card-border">
                  {user.lastName}
                </td>
                <td className="px-4 py-2 border-r border-gray-300">
                  {user.country}
                </td>
                <td className="px-4 py-2 border-r border-card-border">
                  {user.city}
                </td>
                <td className="px-4 py-2 border-r border-card-border">
                  {user.phone}
                </td>
                <td className="px-4 py-2 border-r border-card-border">
                  {user.specialization}
                </td>
                <td className="px-4 py-2 border-r border-card-border">
                  {user.email}
                </td>
                <td className="px-4 py-2 border-r border-card-border">
                  {user.discord}
                </td>
                <td className="px-4 py-2 border-r border-card-border">
                  {user.linkedin}
                </td>
                <td className="px-4 py-2 border-r border-card-border">
                  <button
                    disabled={user.status !== null}
                    onClick={() => handleAccept(user.id)}
                    className="px-4 py-1 text-white bg-primary-blue hover:bg-white rounded-[10px] duration-500 hover:text-black border border-primary-blue disabled:opacity-50 disabled:hover:bg-primary-blue disabled:hover:text-white disabled:cursor-not-allowed"
                  >
                    Прийняти
                  </button>
                </td>
                <td className="px-4 py-2 border-r border-card-border">
                  <button
                    disabled={user.status !== null}
                    onClick={() => handleReject(user.id)}
                    className="px-4 py-1 text-red hover:bg-white rounded-[10px] duration-500 hover:text-black border border-red disabled:opacity-50 disabled:hover:text-red disabled:cursor-not-allowed"
                  >
                    Відхилити
                  </button>
                </td>
                <td
                  className="px-4 py-2 border-r border-card-border"
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Questionnaires;
