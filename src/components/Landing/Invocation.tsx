import { Link } from 'react-router-dom';

const Invocation = () => {
  return (
    <section className="px-[120px] pt-[50px] pb-[150px] flex flex-col items-center">
      <p className="min-w-[1021px] h-auto font-lato font-bold leading-[60px] text-[40px] text-white text-center mb-[100px]">
        Заповни анкету на Baza Trainee Ukraine
        <br />
        і чекай на запрошення до CRM системи, де ти можеш <br />
        обрати свій перший проєкт
      </p>
      <Link
        to="/register"
        className="flex justify-center duration-500 items-center bg-primary-blue border-4 border-primary-blue hover:bg-transparent hover:border-4 hover:border-primary-blue w-[254px] h-10 text-white rounded"
        target="_blank"
        rel="noopener noreferrer"
      >
        Заповнити анкету
      </Link>
    </section>
  );
};

export default Invocation;
