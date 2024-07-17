import Select, { OptionProps } from 'react-select';
import { Square, SquareCheckBig } from 'lucide-react';
import { useState } from 'react';

interface OptionType {
  value: string;
  label: string;
}

const options: OptionType[] = [
  { value: 'all', label: 'Всі' },
  { value: 'team', label: 'Формується команда' },
  { value: 'development', label: 'В розробці' },
  { value: 'completed', label: 'Завершені' },
];

const CustomOption = (props: OptionProps<OptionType>) => (
  <div
    {...props.innerProps}
    className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
  >
    <span className="mr-2">
      {props.isSelected ? (
        <SquareCheckBig size={20} stroke="#1E70EB" />
      ) : (
        <Square size={20} stroke="#1E70EB" />
      )}
    </span>
    {props.label}
  </div>
);

const ProjectsTabs: React.FC = () => {
  const tabs = [14, 10, 32];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <div className="h-[60px] flex items-center text-2xl font-bold text-text-black bg-white rounded-[10px] border-card-border border px-8 gap-6">
      <span>Загалом:</span>
      <div className="px-3 py-2 border-2 rounded-[10px] border-orange">
        {options[1].label} {tabs[0]}
      </div>
      <div className="px-3 py-2 border-2 rounded-[10px] border-light-blue">
        {options[2].label} {tabs[1]}
      </div>
      <div className="px-3 py-2 border-2 rounded-[10px] border-light-green">
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
