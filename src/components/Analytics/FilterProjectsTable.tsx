import React from 'react';
import { RiFilter3Line } from 'react-icons/ri';
import { Project } from '../../types';
// import { useQuery } from '@tanstack/react-query';
// import { useSelector } from 'react-redux';
// import { RootState } from '../types';
// import { filterMembers } from '../utils/membersApi';
// import {
//   countProjectsByStatus,
//   projectStatusOptions,
// } from '../utils/projectStatusOptions';

type ProjectsTableProps = {
  tableHeaders?: string[];
  projects: Project[] | undefined;
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
}) => {
  console.log(projects);
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
          {projects &&
            projects.length > 0 &&
            projects?.map((project, index) => (
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
