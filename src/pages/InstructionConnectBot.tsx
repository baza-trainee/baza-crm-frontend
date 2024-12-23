import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { RxCross1 } from 'react-icons/rx';

/* eslint-disable no-irregular-whitespace */

Modal.setAppElement('#root');

const InstructionConnectBot = () => {
  const [openErrorPopUp, setOpenErrorPopUp] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleCloseErrorPopUp = () => {
    setOpenErrorPopUp(false);
    document.body.style.overflow = 'auto';
    navigate(location.pathname);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get('status');
    if (status === 'error') {
      setOpenErrorPopUp(true);
      document.body.style.overflow = 'hidden';
    }
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

      <Modal
        isOpen={openErrorPopUp}
        onAfterClose={handleCloseErrorPopUp}
        onRequestClose={handleCloseErrorPopUp} //TODO:hide scroll
        style={{
          overlay: {
            backgroundColor: 'rgba(145, 162, 182, 0.7)',
            zIndex: '50',
          },
          content: {
            backgroundColor: '#F8F9FD',
            zIndex: '100',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            padding: '50px 68px',
            transform: 'translate(-37%, -50%)',
            borderWidth: '1px',
            borderRadius: '10px',
          },
        }}
      >
        <div className="flex flex-col gap-10">
          <div className="flex justify-end">
            <RxCross1
              size={'20px'}
              className="cursor-pointer"
              onClick={handleCloseErrorPopUp}
            />
          </div>
          <p className="font-medium font-lato">
            Щось пішло не так, прочитайте інструкцію і спробуйте ще раз
          </p>
        </div>
      </Modal>
    </section>
  );
};

export default InstructionConnectBot;
