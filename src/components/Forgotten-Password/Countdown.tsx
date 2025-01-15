import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const Countdown = ({
  send,
  setSend,
}: {
  send: boolean;
  setSend: Dispatch<SetStateAction<boolean>>;
}) => {
  const [count, setCount] = useState(60);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (count > 0) {
        setCount((prev) => prev - 1);
      }
      if (count === 0) {
        setSend(false);
      }
    }, 1000);
    return () => clearInterval(timerId);
  }, [count, send]); //можливий рефактор
  return (
    <div className="font-Open Sans font-sans my-[30px] p-[16px] rounded-[10px] bg-normal-ui">
      <p className="mb-[8px] text-[16px] leading-6 font-semibold text-[rgba(0, 0, 0, 0.2)]">
        На ваш discord аккаунт буде відправлено повідомлення з посиланням для
        відновлення паролю. Посилання діє {count}.
      </p>
      <div className="flex justify-between">
        <p className="text-[14px] font-normal">
          Якщо лист не отримано, спробуйте ще через 1хв.
        </p>
        <p>
          <span className="text-primary-blue">{count}</span> сек.
        </p>
      </div>
    </div>
  );
};

export default Countdown;
