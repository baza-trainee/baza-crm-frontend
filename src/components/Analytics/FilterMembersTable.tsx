import React from 'react';
import { RiFilter3Line } from 'react-icons/ri';
import { Member } from '../../types';

type MembersTableProps = {
  tableHeaders?: string[];
  members: Member[] | undefined;
  error?: string;
};

const statusOptions = [
  { value: 'active', label: 'Активний', color: '#15C847' },
  { value: 'working', label: 'На проєкті', color: '#1E70EB' },
  { value: 'pause', label: 'На паузі', color: '#FFB800' },
];

const FilterMembersTable: React.FC<MembersTableProps> = ({
  tableHeaders = [
    '№ з/п',
    'Ім`я',
    'Прізвище',
    'Спеціалізація',
    'Країна',
    'Місто',
    'Статус',
    'Дата реєстрації',
    'Бали  співпраці',
    'Оцінка  команди',
  ],
  members,
  error,
}) => {
  if (error && members?.length === 0) {
    return <div>За даними параметрами проєктів немає</div>;
  } else {
    return (
      <div className="w-full h-min border bg-white rounded-t-[10px] border-card-border overflow-auto">
        <table className="w-full text-base border-collapse border-spacing-0 ">
          <thead className="bg-[#E9F3FE]">
            <tr>
              {tableHeaders.map((tableHeader, i) =>
                tableHeader !== 'Ім`я' &&
                tableHeader !== 'Прізвище' &&
                tableHeader !== '№ з/п' ? (
                  <th
                    className=" py-1 px-2 border  border-r-card-border border-b-card-border"
                    key={i}
                  >
                    <div className="flex gap-2 justify-center items-center">
                      <p>{tableHeader}</p>
                      <div>
                        <RiFilter3Line className="w-6 h-6" />
                      </div>
                    </div>
                  </th>
                ) : (
                  <th
                    className="py-1 border px-2 border-r-card-border border-b-card-border"
                    key={i}
                  >
                    {tableHeader}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="text-base font-open-sans">
            {members &&
              members.length > 0 &&
              members?.map((user, index) => (
                <tr key={user?.id} className="border border-card-border">
                  <td className="py-3 px-4 border border-card-border">
                    {index + 1}
                  </td>{' '}
                  <td className="py-3 px-2 border border-card-border">
                    {user.firstName}
                  </td>{' '}
                  <td className="py-3 px-2 border border-card-border">
                    {user.lastName}
                  </td>{' '}
                  <td className="py-3 px-2 border border-card-border">
                    {user.specializations.map((spec) => spec.name)[0]}
                  </td>
                  <td className="py-3 px-2 border border-card-border">
                    {user.country}
                  </td>
                  <td className="py-3 px-2 border border-card-border">
                    {user.city}
                  </td>
                  <td className="py-3 px-2 border border-card-border">
                    <p
                      style={{
                        color: `${
                          statusOptions.find(
                            (s) => s.value === members[0].status,
                          )?.color
                        }`,
                      }}
                    >
                      {
                        statusOptions.find((s) => s.value === members[0].status)
                          ?.label
                      }
                    </p>
                  </td>
                  <td className="py-3 px-2 border border-card-border">
                    {new Date(user.registerAt).toLocaleDateString()}
                  </td>{' '}
                  <td className="py-3 px-2 border border-card-border">
                    {user.karmaPoints}
                  </td>
                  <td className="py-3 px-2 border border-card-border">
                    {user.projectPoints}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default FilterMembersTable;
