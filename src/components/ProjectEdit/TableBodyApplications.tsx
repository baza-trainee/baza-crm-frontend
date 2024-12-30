import { useAutoAnimate } from '@formkit/auto-animate/react';

import { Application } from '../../types';

interface TableBodyApplicationsProps {
  filteredApplications: Application[] | undefined;
  nameTag: (id: number) => string | undefined;
  handleAccept: (id: number) => void;
  handleReject: (id: number) => void;
}

const TableBodyApplications: React.FC<TableBodyApplicationsProps> = ({
  filteredApplications,
  nameTag,
  handleAccept,
  handleReject,
}) => {
  const [parent] = useAutoAnimate();
  return (
    <tbody className="text-center" ref={parent}>
      {filteredApplications && filteredApplications?.length > 0 ? (
        filteredApplications.map((application) => (
          <tr
            key={application.id}
            style={{
              backgroundColor:
                application.state === 'declined' ? '#F0F2FB' : 'transparent',
            }}
          >
            <td className="relative w-full px-4 py-2 truncate">
              {application.user?.user.firstName}
              <span className="absolute top-0 right-0 w-full h-full border-t border-r border-card-border"></span>
            </td>
            <td className="relative px-4 py-2 truncate">
              {application.user?.user.lastName}
              <span className="absolute top-0 right-0 w-full h-full border-t border-r border-card-border"></span>
            </td>
            <td className="relative px-4 py-2 truncate">
              {application.user?.user.country}
              <span className="absolute top-0 right-0 w-full h-full border-t border-r border-card-border"></span>
            </td>
            <td className="relative px-4 py-2 truncate">
              {nameTag(application.tagId)}
              <span className="absolute top-0 right-0 w-full h-full border-t border-r border-card-border"></span>
            </td>
            <td className="relative z-10 px-4 py-2 truncate">
              {application.user?.user?.email}
              <span className="absolute top-0 right-0 w-full h-full border-t border-r border-card-border -z-10"></span>
            </td>
            <td className="relative px-4 py-2 truncate">
              {application.user?.user.linkedin}
              <span className="absolute top-0 right-0 w-full h-full border-t border-r border-card-border"></span>
            </td>
            <td className="relative px-4 py-2 truncate">
              {application.user?.user.projectPoints}
              <span className="absolute top-0 right-0 w-full h-full border-t border-r border-card-border"></span>
            </td>
            <td className="relative px-4 py-2 truncate">
              {application.user?.user.karmaPoints}
              <span className="absolute top-0 right-0 w-full h-full border-t border-r border-card-border"></span>
            </td>
            <td className="relative z-10 px-4 py-2">
              <button
                disabled={application.state !== 'waiting'}
                onClick={() => handleAccept(application.id)}
                className="px-4 py-1 text-white bg-primary-blue hover:bg-white rounded-[10px] duration-500 hover:text-primary-blue border border-primary-blue disabled:opacity-50 disabled:hover:bg-primary-blue disabled:hover:text-white disabled:cursor-not-allowed disabled:filter disabled:brightness-50"
              >
                Прийняти
              </button>
              <span className="absolute top-0 right-0 w-full h-full border-t border-r -z-10 border-card-border"></span>
            </td>
            <td className="relative z-10 px-4 py-2">
              <button
                disabled={application.state !== 'waiting'}
                onClick={() => handleReject(application.id)}
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
                  application.state === 'accepted'
                    ? '#34A853'
                    : application.state === 'declined'
                      ? '#FA2727'
                      : '#FFB800',
              }}
            >
              {application.state === 'accepted'
                ? 'Прийнято'
                : application.state === 'declined'
                  ? 'Відхилено'
                  : 'Нова'}
              <span className="absolute top-0 right-0 w-full h-full border-t border-card-border"></span>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={10}>
            <div className="flex w-full items-center justify-center p-5">
              <p className="text-gray-400 ">No results</p>
            </div>
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBodyApplications;
