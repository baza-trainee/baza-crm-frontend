import Select from 'react-select';
import makeAnimated from 'react-select/animated';

// import Select, { OptionProps } from 'react-select';
import { OptionType, RootState, StatusCount } from '../../types';
import { projectStatusOptions } from '../../utils/projectStatusOptions';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
  const user = useSelector((state: RootState) => state.userState.user);
  //const isAdmin = true;
  const animatedComponents = makeAnimated();
  return (
    <div className="py-2 flex  items-stretch text-text-black bg-white rounded-[10px] border-card-border border px-8 gap-8">
      <div className="flex flex-col items-center lg:flex-row  text-text-black gap-6">
        <div className="flex items-center gap-6">
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
        </div>
        <div className="flex w-full lg:w-max">
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
      </div>

      {user?.user.isAdmin && (
        <Link
          to="/crm/projects/create"
          className="text-white hover:bg-white bg-primary-blue py-2 h-min rounded-[10px] flex justify-center  items-center duration-500 w-[268px] border-2 border-primary-blue hover:text-black font-semibold"
        >
          + Створити проєкт
        </Link>
      )}
    </div>
  );
};

export default ProjectsTabs;
