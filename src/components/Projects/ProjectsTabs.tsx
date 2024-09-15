import Select from 'react-select';
import makeAnimated from 'react-select/animated';

// import Select, { OptionProps } from 'react-select';
import { OptionType, StatusCount } from '../../types';
import { projectStatusOptions } from '../../utils/projectStatusOptions';

// import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';

// const CustomOption = (props: OptionProps<OptionType>) => (
//   <div
//     {...props.innerProps}
//     className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
//   >
//     <span className="mr-2">
//       {props.isSelected ? (
//         <FaCheckSquare size={20} color="#1E70EB" />
//       ) : (
//         <FaRegSquare size={20} fill="#1E70EB" />
//       )}
//     </span>
//     {props.label}
//   </div>
// );

type ProjectsTabsProps = {
  projectNumber: StatusCount;
  selectedOption: OptionType[];
  setSelectedOption: (options: OptionType[]) => void;
};

const ProjectsTabs: React.FC<ProjectsTabsProps> = ({
  projectNumber,
  selectedOption,
  setSelectedOption,
}) => {
  const animatedComponents = makeAnimated();
  return (
    <div className="h-[60px] flex items-center text-text-black bg-white rounded-[10px] border-card-border border px-8 gap-6">
      <span className="font-semibold">Загалом:</span>
      <div className="px-3 py-2 border-2 rounded-[10px] border-orange">
        {projectStatusOptions[0].label}{' '}
        <span className="text-lg font-semibold">
          {projectNumber.searching || 0}
        </span>
      </div>
      <div className="px-3 py-2 border-2 rounded-[10px] border-light-blue">
        {projectStatusOptions[1].label}{' '}
        <span className="text-lg font-semibold">
          {projectNumber.working || 0}
        </span>
      </div>
      <div className="px-3 py-2 border-2 rounded-[10px] border-dark-green">
        {projectStatusOptions[2].label}{' '}
        <span className="text-lg font-semibold">
          {projectNumber.ended || 0}
        </span>
      </div>
      <Select
        // components={{
        //   Option: CustomOption,
        // }}
        closeMenuOnSelect={false}
        options={projectStatusOptions}
        components={animatedComponents}
        onChange={(options) => setSelectedOption(options as OptionType[])}
        value={selectedOption}
        isMulti
        className="min-w-80"
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default ProjectsTabs;
