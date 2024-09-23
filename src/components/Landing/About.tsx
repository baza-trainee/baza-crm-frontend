import Card from '../Card';

const About: React.FC = () => {
  return (
    <section className="px-[120px] pt-[50px] pb-[100px] mb-[50px]">
      <h2 className="font-lato font-bold leading-[60px] text-[40px] p-[10px] mb-10 text-white text-center">
        Про <span className="uppercase">crm</span> систему
      </h2>
      <div className="flex items-stretch justify-center gap-8">
        <Card
          text={
            <>
              Наша CRM система створена для
              <br />
              учасників проєктів по створенню цифрових проєктів. Система
              допомагає ефективно координувати роботу команди,
              <br />
              забезпечуючи легкий доступ до необхідних ресурсів та інформації.
            </>
          }
        />
        <Card
          text="CRM система дозволяє вчасно отримувати інформацію про новини, акції та
          події спільноти, додавати їх в свій календар, а також мати швидкий
          доступ до Бази знань з усім нашим досвідом."
        />
        <Card
          text="Завдяки інтуїтивному інтерфейсу та розширеним функціям, ви зможете
          зосередитися на творчих аспектах розробки, залишаючи всю
          адміністративну роботу нашій системі."
        />
      </div>
    </section>
  );
};

export default About;
