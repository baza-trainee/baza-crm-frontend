import { Dispatch, SetStateAction, useState } from 'react';
import help from '../../assets/common/circle-help.svg';
import type { Member, OptionStatus, RootState } from '../../types';
import { useSelector } from 'react-redux';

const UserActivityStatus = ({
  status,
  setStatus,
}: {
  status: Member['status'] | undefined;
  setStatus?: Dispatch<
    SetStateAction<'active' | 'working' | 'pause' | undefined>
  >;
}) => {
  const options: OptionStatus[] = [
    {
      name: 'active',
      label: 'Aктивний',
      color: '#15c847',
      text: ' - Цей статус означає, що ти готовий до роботи над новим проєктом. Тому ти першим отримуєш запрошення не лише на всі нові проєкти, а також запрошення на проєкти в розробці - це може бути добір в команду, якщо один з учасників вибув.',
    },
    {
      name: 'working',
      label: 'На проекті',
      color: '#1e70eb',
      text: ' - Цей статус означає, що ти активно залучений до розробки проєкту і не готовий до нового, але за особливих потреб можеш прийти на допомогу і долучитися ще до одного. Тому ти можеш отримати запрошення на проєкт, якщо протягом декількох тижнів для важливого проєкту не може зібратись команда.',
    },
    {
      name: 'pause',
      label: 'На паузі',
      color: '#ffb800',
      text: ' - Цей статус означає, що ти в даний час не можеш чи не готовий брати участь у процесі розробки. Але для нас кожен учасник важливий і ми не готові відпускати тебе назавжди. Тому ти можеш отримати запрошення на проєкт за особливих умов - коли команда на проєкт не може зібратись більше трьох тижнів і нам не вистачає саме тебе - за спеціалізацією та стеком технологій.',
    },
  ];
  const user = useSelector((state: RootState) => state.userState.user);

  const [selectedOption, setSelectedOption] = useState<
    OptionStatus | undefined
  >(options.find((o) => o.name === status));

  const handleClick = (label: string) => {
    if (!user?.user.isAdmin) {
      const findOption = options.find((o) => o.label === label);
      setSelectedOption(findOption);
      setStatus!(findOption?.name);
    }
  };

  return (
    <ul className="flex pr-9 gap-10">
      {options.map((option) => (
        <li key={option.name}>
          <div className={`relative group/${option.name} size-max ml-auto`}>
            <img
              src={help}
              alt="іконка підказки"
              width={20}
              height={20}
              className="mb-2 cursor-pointer"
            />
            <div
              className={`absolute px-4 py-4 bg-white w-[24.6875rem]  border border-card-border rounded-[10px] hidden group-hover/${option.name}:block top-3 right-6`}
            >
              <p className="font-sans">
                <span className="font-semibold" style={{ color: option.color }}>
                  {option.label.toLocaleUpperCase()}
                </span>
                {option.text}
              </p>
            </div>
          </div>

          <div
            className="flex items-center "
            style={
              !user?.user.isAdmin ? { cursor: 'pointer' } : { cursor: 'auto' }
            }
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
              onChange={() => {}}
            />
            <label
              htmlFor={option.name}
              style={
                !user?.user.isAdmin
                  ? { cursor: 'pointer' }
                  : { cursor: 'default' }
              }
            >
              {option.label}
            </label>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserActivityStatus;
