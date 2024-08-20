import { useState } from 'react';
import help from '../../assets/common/circle-help.svg';

const UserActivityStatus = () => {
  const options = ['Активний', 'На проекті', 'На паузі'];
  const colors = ['#15c847', '#1e70eb', '#ffb800'];
  // const tip = [
  //   'Активний - Цей статус означає, що ти готовий до роботи над новим проєктом. Тому ти першим отримуєш запрошення не лише на всі нові проєкти, а також запрошення на проєкти в розробці - це може бути добір в команду, якщо один з учасників вибув.',
  //   'На проекті - Цей статус означає, що ти активно залучений до розробки проєкту і не готовий до нового, але за особливих потреб можеш прийти на допомогу і долучитися ще до одного. Тому ти можеш отримати запрошення на проєкт, якщо протягом декількох тижнів для важливого проєкту не може зібратись команда.',
  //   'На паузі - Цей статус означає, що ти в даний час не можеш чи не готовий брати участь у процесі розробки. Але для нас кожен учасник важливий і ми не готові відпускати тебе назавжди. Тому ти можеш отримати запрошення на проєкт за особливих умов - коли команда на проєкт не може зібратись більше трьох тижнів і нам не вистачає саме тебе - за спеціалізацією та стеком технологій.',
  // ];

  const [selectedOption, setSelectedOption] = useState<string>(options[0]);
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <ul className="flex pr-9 gap-10">
      {options.map((option, i) => (
        <li key={option}>
          <img
            src={help}
            alt="іконка підказки"
            width={20}
            height={20}
            className="ml-auto mb-2"
          />
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleClick(option)}
          >
            <span
              className="w-5 h-5 rounded-full mr-3 flex items-center justify-center"
              style={{ border: `1px solid ${colors[i]}` }}
            >
              {selectedOption === option && (
                <span
                  className="block w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: `${colors[i]}` }}
                ></span>
              )}
            </span>
            <input
              className="sr-only"
              type="radio"
              id={option}
              name="status"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
            <label htmlFor={option} className="cursor-pointer">
              {option}
            </label>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserActivityStatus;
