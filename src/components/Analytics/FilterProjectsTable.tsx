import React from 'react';
import { RiFilter3Line } from 'react-icons/ri';
import { Project } from '../../types';

type ProjectsTableProps = {
  tableHeaders?: string[];
  projects: Project[] | undefined;
  error?: string;
};

const FilterProjectsTable: React.FC<ProjectsTableProps> = ({
  tableHeaders = [
    '№ з/п',
    'Назва прооєкту',
    'Період формування команди',
    'Період розробки',
    'Статус',
    'Формат',
  ],
  projects,
  error,
}) => {
  if (error && projects?.length === 0) {
    return <div>За даними параметрами проєктів немає</div>;
  } else {
    return (
      <div className="flex-1 ml-[30px] w-[1268px] bg-white rounded-t-[10px] overflow-hidden border-t border-card-border">
        <table className="min-w-full text-base border-separate border-spacing-0">
          <thead className="bg-[#E9F3FE]">
            <tr>
              {tableHeaders.map((tableHeader, i) => (
                <th key={i} className="border border-card-border px-4 py-2">
                  <div className="flex justify-center items-center">
                    <p className="pr-[8px]">{tableHeader}</p>
                    {(tableHeader === 'Статус' || tableHeader === 'Формат') && (
                      <RiFilter3Line className="w-6 h-6" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-base font-open-sans">
            {projects &&
              projects.length > 0 &&
              projects.map((project, index) => (
                <tr key={project.id} className="even:bg-gray-100">
                  <td className="border border-card-border px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-card-border px-4 py-2">
                    {project.name}
                  </td>
                  <td className="border border-card-border px-4 py-2 text-center">
                    {new Date(project.dateStart).toLocaleDateString()}
                  </td>
                  <td className="border border-card-border px-4 py-2 text-center">
                    {new Date(project.dateTeam).toLocaleDateString()}
                  </td>

                  {project.projectStatus === 'searching' && (
                    <td
                      className="border border-card-border px-4 py-2 text-center capitalize "
                      style={{ color: '#F16600' }}
                    >
                      Формується команда
                    </td>
                  )}
                  {project.projectStatus === 'working' && (
                    <td
                      className="border border-card-border px-4 py-2 text-center capitalize "
                      style={{ color: '##2E57DB' }}
                    >
                      У розробці
                    </td>
                  )}
                  {project.projectStatus === 'finished' && (
                    <td
                      className="border border-card-border px-4 py-2 text-center capitalize "
                      style={{ color: '#14B541' }}
                    >
                      Завершений
                    </td>
                  )}

                  <td className="border border-card-border px-4 py-2 text-center capitalize">
                    {project.projectType}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default FilterProjectsTable;
