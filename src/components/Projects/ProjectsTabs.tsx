import Select, { OptionProps } from 'react-select';
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';

import { OptionType, StatusCount } from '../../types';
import { projectStatusOptions } from '../../utils/projects/projectStatusOptions';

const CustomOption = (props: OptionProps<OptionType>) => (
  <div
    {...props.innerProps}
    className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
  >
    <span className="mr-2">
      {props.isSelected ? (
        <FaCheckSquare size={20} color="#1E70EB" />
      ) : (
        <FaRegSquare size={20} fill="#1E70EB" />
      )}
    </span>
    {props.label}
  </div>
);

type ProjectsTabsProps = {
  projectNumber: StatusCount;
  selectedOption: OptionType;
  setSelectedOption: (option: OptionType) => void;
};

const ProjectsTabs: React.FC<ProjectsTabsProps> = ({
  projectNumber,
  selectedOption,
  setSelectedOption,
}) => {
  return (
    <div className="h-[60px] flex items-center text-text-black bg-white rounded-[10px] border-card-border border px-8 gap-6">
      <span className="font-semibold">Загалом:</span>
      <div className="px-3 py-2 border-2 rounded-[10px] border-orange">
        {projectStatusOptions[1].label} {projectNumber.searching || 0}
      </div>
      <div className="px-3 py-2 border-2 rounded-[10px] border-light-blue">
        {projectStatusOptions[2].label} {projectNumber.working || 0}
      </div>
      <div className="px-3 py-2 border-2 rounded-[10px] border-dark-green">
        {projectStatusOptions[3].label} {projectNumber.ended || 0}
      </div>
      <Select
        options={projectStatusOptions}
        onChange={(option) => setSelectedOption(option as OptionType)}
        value={selectedOption}
        components={{
          Option: CustomOption,
        }}
        className="w-80 "
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default ProjectsTabs;
