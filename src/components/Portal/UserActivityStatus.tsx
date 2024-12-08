import { Dispatch, SetStateAction, useState } from 'react';
import help from '../../assets/common/circle-help.svg';
import type { Member, OptionStatus } from '../../types';

const UserActivityStatus = ({
  status,
  setStatus,
}: {
  status: Member['status'] | undefined;
  setStatus: Dispatch<
    SetStateAction<'active' | 'working' | 'pause' | undefined>
  >;
}) => {
  const options: OptionStatus[] = [
    { name: 'active', label: 'Aктивний', color: '#15c847' },
    { name: 'working', label: 'На проекті', color: '#1e70eb' },
    { name: 'pause', label: 'На паузі', color: '#ffb800' },
  ];

  const [selectedOption, setSelectedOption] = useState<
    OptionStatus | undefined
  >(options.find((o) => o.name === status));
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const findOption = options.find((o) => o.label === e.currentTarget.value);
    setSelectedOption(findOption);
    setStatus(findOption?.name);
  };

  const handleClick = (label: string) => {
    const findOption = options.find((o) => o.label === label);
    setSelectedOption(findOption!);
  };

  return (
    <ul className="flex pr-9 gap-10">
      {options.map((option) => (
        <li key={option.name}>
          <img
            src={help}
            alt="іконка підказки"
            width={20}
            height={20}
            className="ml-auto mb-2"
          />
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleClick(option.label)}
          >
            <span
              className="w-5 h-5 rounded-full mr-3 flex items-center justify-center"
              style={{ border: `1px solid ${option.color}` }}
            >
              {selectedOption?.name === option.name && (
                <span
                  className="block w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: `${option.color}` }}
                ></span>
              )}
            </span>
            <input
              className="appearance-none"
              type="radio"
              id={option.name}
              name="status"
              value={option.name}
              checked={selectedOption?.name === option.name}
              onChange={handleOptionChange}
            />
            <label htmlFor={option.name} className="cursor-pointer">
              {option.label}
            </label>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserActivityStatus;
