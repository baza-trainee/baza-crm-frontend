import Button from '../components/Button';

const SpecTechs = () => {
  return (
    <div className="flex gap-[165px] font-lato font-bold text-[20px] leading-[30px] px-[30px] py-[40px] bg-light-blue-bg">
      <div>
        <h1 className="px-[20px] mb-[10px]">Спеціалізації</h1>
        <div className="text-[16px] font-semibold p-[20px] bg-white border border-card-border rounded-lg">
          <ul>
            <li className="w-[372px]">PM</li>
            <li>Design</li>
            <li>Front-end</li>
            <li>Back-end</li>
            <li>QA manual</li>
            <li>Full Stack</li>
          </ul>
          <div className="flex justify-center">
            <Button label="Додати спеціалізацію" className="w-[268px]" />
          </div>
        </div>
        <div></div>
      </div>
      <div>
        <h1 className="px-[20px] mb-[10px]">Технології</h1>
        <div className="text-[16px] font-semibold p-[20px] bg-white border border-card-border rounded-lg">
          <ul>
            <li className="w-[372px]">Figma</li>
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
          <div className="flex justify-center">
            <Button label="Додати технологію" className="w-[220px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecTechs;
