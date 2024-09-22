import { OptionType, Project, StatusCount } from '../types';

export const projectStatusOptions: OptionType[] = [
  { value: 'searching', label: 'Формується команда' },
  { value: 'working', label: 'В розробці' },
  { value: 'ended', label: 'Завершені' },
];

export const getProjectStatusLabel = (status: string): string => {
  const option = projectStatusOptions.find((opt) => opt.value === status);
  return option ? option.label : 'Невідомий статус';
};

export const countProjectsByStatus = (projects: Project[]): StatusCount => {
  return projects.reduce((acc: StatusCount, project) => {
    const { projectStatus } = project;
    acc[projectStatus] = (acc[projectStatus] || 0) + 1;
    return acc;
  }, {});
};
