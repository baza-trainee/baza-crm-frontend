import Button from '../../components/Button';
const Hero = () => {
  return (
    <section>
      <h1 className="font-bold text-7xl leading-[108px] text-white">
        Crm Baza Trainee Ukraine
      </h1>
      <Button
        label="Увійти"
        onClick={() => {
          alert('Увійти');
        }}
      />
      <Button
        label="Заповнити анкету"
        onClick={() => {
          alert('Заповнити анкету');
        }}
      />
      <p className="text-white">
        Зареєструватися може лише учасник, який подав заявку та пройшов
        співбесіду з менеджером проєкту через Baza Trainee Ukraine
      </p>
    </section>
  );
};

export default Hero;
