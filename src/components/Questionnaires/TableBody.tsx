import { useAutoAnimate } from '@formkit/auto-animate/react';

import { UserRequest } from '../../types';

interface TableBodyProps {
  filteredUsers: UserRequest[] | undefined;
  handleAccept: (id: number) => void;
  handleReject: (id: number) => void;
}

const TableBody: React.FC<TableBodyProps> = ({
  filteredUsers,
  handleAccept,
  handleReject,
}) => {
  const [parent] = useAutoAnimate();

  return (
    <tbody className="text-center" ref={parent}>
      {filteredUsers?.map((user) => (
        <tr
          key={user.id}
          style={{
            backgroundColor:
              user.isAccepted === false ? '#F0F2FB' : 'transparent',
          }}
        >
          <td className="relative w-full px-4 py-2 truncate">
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
              disabled={user.isAccepted !== null}
              onClick={() => handleAccept(user.id)}
              className="px-4 py-1 text-white bg-primary-blue hover:bg-white rounded-[10px] duration-500 hover:text-black border border-primary-blue disabled:opacity-50 disabled:hover:bg-primary-blue disabled:hover:text-white disabled:cursor-not-allowed disabled:filter disabled:brightness-50"
            >
              Прийняти
            </button>
            <span className="absolute top-0 right-0 w-full h-full border-t border-r -z-10 border-card-border"></span>
          </td>
          <td className="relative z-10 px-4 py-2">
            <button
              disabled={user.isAccepted !== null}
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
                user.isAccepted === true
                  ? '#34A853'
                  : user.isAccepted === false
                    ? '#FA2727'
                    : '#FFB800',
            }}
          >
            {user.isAccepted === true
              ? 'Прийнято'
              : user.isAccepted === false
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
  );
};

export default TableBody;
