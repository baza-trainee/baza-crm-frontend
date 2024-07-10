import { Link } from 'react-router-dom';
import Button from '../../components/Button';
const Hero = () => {
  return (
    <section className="pt-[300px] pb-[100px]">
      <h1 className="font-lato text-7xl leading-[108px] text-white text-center font-bold mb-[150px]">
        <span className="block uppercase">Crm</span>
        <span className="block">Baza Trainee Ukraine</span>
      </h1>
      <div className="flex justify-center gap-8 mb-[50px]">
        <Button
          label="Увійти"
          onClick={() => {
            alert('Увійти');
          }}
          additionalClass="bg-primary-blue hover:bg-transparent hover:border-4 hover:border-primary-blue"
        />
        <Button
          label="Заповнити анкету"
          onClick={() => {
            alert('Заповнити анкету');
          }}
          additionalClass="bg-transparent border-4 border-primary-blue hover:bg-primary-blue"
        />
      </div>
      <p className="text-white text-xl w-[530px] mx-auto font-open-sans font-normal leading-7 tracking-[0.4px] text-center ">
        Зареєструватися може лише учасник, який подав заявку та пройшов
        співбесіду з менеджером проєкту через{' '}
        <Link
          to="https://baza-trainee.tech/ua"
          className="underline hover:text-blue-700"
          target="_blank"
          rel="noopener noreferrer"
        >
          Baza Trainee Ukraine
        </Link>
      </p>
    </section>
  );
};

export default Hero;
