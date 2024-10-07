import React from 'react';
import { RiFilter3Line } from 'react-icons/ri';
import { Project } from '../../types';

type ProjectsTableProps = {
  tableHeaders?: string[];
  info: Project[] | undefined;
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
  info,
}) => {
  // console.log(info);
  return (
    <div className="flex-1  overflow-hidden border rounded-xl border-card-border bg-white">
      <table className="m-[-1px] min-w-full text-base border border-card-border">
        <thead className="font-lato py-2 bg-[#e4f1ff]">
          <tr>
            {tableHeaders.map((tableHeader, i) =>
              tableHeader === 'Статус' || tableHeader === 'Формат' ? (
                <th className="py-3 border border-card-border" key={i}>
                  <div>
                    <p>{tableHeader}</p>
                    <RiFilter3Line />
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
        <tbody>
          {info &&
            info.length > 0 &&
            info?.map((project, index) => (
              <tr key={project?.id} className="border border-card-border">
                <td className="py-3 px-4 border border-card-border">
                  {index + 1}
                </td>{' '}
                <td className="py-3 px-4 border border-card-border">
                  {project.name}
                </td>{' '}
                <td className="py-3 px-4 border border-card-border">
                  {new Date(project.dateStart).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 border border-card-border">
                  {new Date(project.dateTeam).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 border border-card-border">
                  {project.projectStatus}
                </td>
                <td className="py-3 px-4 border border-card-border">
                  {project.projectType}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilterProjectsTable;
