import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const SpecTechs = () => {
  const [selectedColor, setSelectedColor] = useState<string>('#f87168');
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = () => {
    console.log('subm pressed');
  };

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
        <div className="text-[16px] font-semibold py-[20px] px-[12px] bg-input-normal-state border border-card-border rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <label className="font-Open Sans font-sans text-[16px] font-normal leading-[1.75] mb-[8px]">
                Додати спеціалізацію
              </label>
              <input
                {...register('specializationName')}
                className="h-[40px] rounded-lg mb-[20px]"
              ></input>
            </div>
            <div className="flex flex-col">
              <label className="font-Open Sans font-sans text-[16px] font-normal leading-[1.75] mb-[10px]">
                Обрати колір
              </label>
              {/* Chossed color */}
              <div
                className="w-[107px] h-[30px] rounded-lg border border-card-border mb-[10px]"
                style={{ backgroundColor: selectedColor }}
              ></div>
              {/* Colors selector */}
              <div className="flex gap-[4px] border border-card-border rounded-lg px-[28px] py-[20px] mb-[20px]">
                {/* full stack */}
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="color"
                    value="#fea362"
                    className="hidden"
                    onChange={() => handleColorChange('#fea362')}
                  />
                  <div
                    className={`w-[30px] h-[30px] rounded-lg box-border ${selectedColor === '#fea362' ? 'border-2 border-black' : ''}`}
                    style={{ backgroundColor: '#fea362' }}
                  ></div>
                </label>
                {/* color-pm */}
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="color"
                    value="#579dff"
                    className="hidden"
                    onChange={() => handleColorChange('#579dff')}
                  />
                  <div
                    className={`w-[30px] h-[30px] rounded-lg box-border ${selectedColor === '#579dff' ? 'border-2 border-black' : ''}`}
                    style={{ backgroundColor: '#579dff' }}
                  ></div>
                </label>
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                label="Зберегти"
                className="w-[268px] text-white bg-[#1e70eb]"
              />
            </div>
          </form>
        </div>
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
        <div className="text-[16px] font-semibold py-[12px] px-[10px] bg-input-normal-state border border-card-border rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <label className="font-Open Sans font-sans text-[16px] font-normal leading-[1.75] mb-[8px]">
                Додати технологію
              </label>
              <input
                {...register('technologyName')}
                className="h-[40px] rounded-lg mb-[20px]"
              ></input>
            </div>
            <div className="flex justify-center">
              <Button
                label="Зберегти"
                className="w-[268px] text-white bg-[#1e70eb]"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SpecTechs;
