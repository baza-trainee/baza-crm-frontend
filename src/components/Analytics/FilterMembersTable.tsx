import React from 'react';
import { RiFilter3Line } from 'react-icons/ri';
import { Member } from '../../types';

type MembersTableProps = {
  tableHeaders?: string[];
  members: Member[] | undefined;
  error?: string;
};

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
  console.log(members);
  if (error && members?.length === 0) {
    return <div>За даними параметрами проєктів немає</div>;
  } else {
    return (
      <div className="flex-1 ml-[30px] w-[1268px] bg-white rounded-t-[10px] overflow-hidden border-t border-card-border">
        <table className="min-w-full text-base border-separate border-spacing-0">
          <thead className="bg-[#E9F3FE]">
            <tr>
              {tableHeaders.map((tableHeader, i) =>
                tableHeader !== 'Ім`я' &&
                tableHeader !== 'Прізвище' &&
                tableHeader !== '№ з/п' ? (
                  <th className="py-3 border border-card-border" key={i}>
                    <div>
                      <p>{tableHeader}</p>
                      <RiFilter3Line className="w-6 h-6" />{' '}
                    </div>
                  </th>
                ) : (
                  <th className="py-3 border border-card-border" key={i}>
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
                  <td className="py-3 px-4 border border-card-border">
                    {user.firstName}
                  </td>{' '}
                  <td className="py-3 px-4 border border-card-border">
                    {user.lastName}
                  </td>{' '}
                  <td className="py-3 px-4 border border-card-border">
                    {/* {user.specializations
                      ? user.specializations.map((spec) => spec.name).join(', ')
                      : 'N/A'}{' '} */}
                    {user.specializations.map((spec) => spec.name)[0]}
                  </td>
                  <td className="py-3 px-4 border border-card-border">
                    {user.country}
                  </td>
                  <td className="py-3 px-4 border border-card-border">
                    {user.city}
                  </td>
                  <td className="py-3 px-4 border border-card-border">
                    {user.status}
                  </td>
                  <td className="py-3 px-4 border border-card-border">
                    {new Date(user.registerAt).toLocaleDateString()}
                  </td>{' '}
                  <td className="py-3 px-4 border border-card-border">
                    {user.karmaPoints}
                  </td>
                  <td className="py-3 px-4 border border-card-border">
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
