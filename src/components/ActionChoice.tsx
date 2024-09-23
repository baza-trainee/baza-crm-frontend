import React from 'react';
import SortProjects from './SortProjects';
import FilterProjects from './FilterProjects';
import SortMembers from './SortMembers';
import FilterMembers from './FilterMembers';

type ActionChoiceProps = {
  action: string;
  infoType: string;
};

const ActionChoice: React.FC<ActionChoiceProps> = ({ action, infoType }) => {
  if (infoType === 'Учасники' && action === 'Сортування') {
    return <SortMembers />;
  }
  if (infoType === 'Учасники' && action === 'Фільтр') {
    return <FilterMembers />;
  }
  if (infoType === 'Проєкти' && action === 'Сортування') {
    return <SortProjects />;
  }
  if (infoType === 'Проєкти' && action === 'Фільтр') {
    return <FilterProjects />;
  }

  return null;
};
export default ActionChoice;
