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
  if (infoType === 'Учасники') console.log(infoType);
  return action === 'Фільтр' ? <FilterMembers /> : <SortMembers />;
  if (infoType === 'Проєкти')
    return action === 'Фільтр' ? <FilterProjects /> : <SortProjects />;
};

export default ActionChoice;
