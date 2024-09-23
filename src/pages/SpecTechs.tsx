import Button from '../components/Button';

const SpecTechs = () => {
  return (
    <div className="flex font-lato font-bold text-[20px] leading-[30px] px-[30px] py-[20px]">
      <div className="w-[412px]">
        <h1>Спеціалізації</h1>
        <div className="text-[16px] font-semibold">
          <ul>
            <li>PM</li>
            <li>Design</li>
            <li>Front-end</li>
            <li>Back-end</li>
            <li>QA manual</li>
            <li>Full Stack</li>
          </ul>
          <Button label="Додати спеціалізацію" className="w-[268px]" />
        </div>
      </div>
      <div className="w-[412px]">
        <h1>Технології</h1>
        <div>
          <ul>
            <li>Figma</li>
            <li>UX/UI</li>
            <li>Canva</li>
            <li>Adobe Illustrator</li>
            <li>Node.js</li>
            <li>Java</li>
            <li>ReactVue</li>
            <li>Angular</li>
            <li>Swagger</li>
            <li>Postman</li>
          </ul>
        </div>
        <Button label="Додати технологію" className="w-[220px]" />
      </div>
    </div>
  );
};

export default SpecTechs;
