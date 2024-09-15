import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';
import Select, { OptionProps } from 'react-select';

import { OptionType } from '../../types';
import { options } from '../../utils/projects/options';

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
  selectedOption: OptionType;
  setSelectedOption: (option: OptionType) => void;
};

const ProjectsTabs: React.FC<ProjectsTabsProps> = ({
  selectedOption,
  setSelectedOption,
}) => {
  const tabs = [14, 10, 32];

  return (
    <div className="h-[60px] flex items-center text-2xl font-bold text-text-black bg-white rounded-[10px] border-card-border border px-8 gap-6">
      <span>Загалом:</span>
      <div className="px-3 py-2 border-2 rounded-[10px] border-orange">
        {options[1].label} {tabs[0]}
      </div>
      <div className="px-3 py-2 border-2 rounded-[10px] border-light-blue">
        {options[2].label} {tabs[1]}
      </div>
      <div className="px-3 py-2 border-2 rounded-[10px] border-dark-green">
        {options[3].label} {tabs[2]}
      </div>
      <Select
        options={options}
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
