import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ReactModal from 'react-modal';
import { RxCross1 } from 'react-icons/rx';

/* eslint-disable no-irregular-whitespace */
const InstructionConnectBot = () => {
  const [openErrorPopUp, setOpenErrorPopUp] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get('status');
    if (status === 'error') setOpenErrorPopUp(true);
  }, []);

  return (
    <section className="bg-input-normal-state pt-5 pb-80">
      <div className="flex flex-col gap-10 px-12">
        <div className="bg-white py-5 text-center border border-card-border rounded-[10px]">
          <h3 className="font-bold text-2xl font-lato">Інструкція</h3>
        </div>
        <div className="flex flex-col pt-7 gap-7 w-[550px] mx-auto">
          <p className="text-wrap">
            Після натискання кнопки <b>«До discord bot»</b> Ви перейшли
            до каналу <b>Baza Go Ukraine</b> в Discord.
          </p>
          <p className="text-wrap">
            Якщо Ви новий учасник, то Вам у приватні повідомлення наш бот
            <b>«Anekdot»</b> відправив кнопку <b>«Authorize».</b> Просто
            натисніть її. При успішній дії Ви отримаєте відповідне повідомлення
            і зайдете в систему.
          </p>
          <p className="text-wrap">
            Якщо Ви вже є учасником каналу <b>Baza Go Ukraine</b>, Вам треба
            зайти в приватні повідомлення і написати користувачу{' '}
            <b>Anekdot#2525</b> команду <b>/start</b>. Далі наш бот{' '}
            <b>«Anekdot»</b> відправить Вам кнопку <b>«Authorize»</b>. Просто
            натисніть її. При успішній дії Ви отримаєте відповідне повідомлення
            і зайдете в систему.
          </p>
          <p className="text-wrap">
            Якщо Ваші дії не призводять до позитивного результату, просто
            напишіть в канал <b>Baza Go Ukraine</b>, і наші розробники прийдуть
            Вам на допомогу.
          </p>
          <div className="flex justify-between">
            <a
              className="border-2 rounded-[10px]  border-primary-blue py-3 px-12"
              href="https://discord.gg/Wg4RcsPhHA"
            >
              <p className="font-semibold">До діскорд бот</p>
            </a>
            <Link className="py-3 px-12" to="/login">
              <p className="font-semibold text-tertiary-text">
                На сторінку логін
              </p>
            </Link>
          </div>
        </div>
      </div>

      <ReactModal
        isOpen={openErrorPopUp}
        onAfterClose={() => setOpenErrorPopUp(false)}
        style={{
          overlay: {
            display: 'flex',
            zIndex: '50',
            justifyContent: 'center',
            alignContent: 'center',
          },
          content: {
            position: 'relative',
            padding: '50px 68px',
          },
        }}
      >
        <div className="relative">
          <RxCross1
            className="absolute top-0 right-0"
            onClick={() => setOpenErrorPopUp(false)} //TODO:work with MODALs
          />
          <p>Щось пішло не так, прочитайте інструкцію і спробуйте ще раз</p>
        </div>
      </ReactModal>
    </section>
  );
};

export default InstructionConnectBot;
