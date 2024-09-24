import Button from '../components/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';

interface FormValues {
  specializationName: string;
  technologyName: string;
}

const SpecTechs = () => {
  const [selectedColor, setSelectedColor] = useState<string>('#f87168');
  const [specializations, setSpecializations] = useState<
    { name: string; color: string }[]
  >([]);
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormTechVisible, setIsFormTechVisible] = useState(false);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const {
    register,
    handleSubmit: handleSubmitSpecialization,
    reset: resetSpecialization,
  } = useForm<FormValues>();
  const {
    register: registerTechnology,
    handleSubmit: handleSubmitTechnology,
    reset: resetTechnology,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data.specializationName) {
      setSpecializations([
        ...specializations,
        { name: data.specializationName, color: selectedColor },
      ]);
      resetSpecialization(); // Скидаємо тільки форму спеціалізації
    }
  };

  const onSubmitTechnology: SubmitHandler<FormValues> = (data) => {
    if (data.technologyName) {
      setTechnologies([...technologies, data.technologyName]);
      resetTechnology(); // Скидаємо тільки форму технологій
    }
  };

  const handleAddClick = () => {
    setIsFormVisible(true);
  };

  const handleAddClickTechnology = () => {
    setIsFormTechVisible(true);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecializations((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveTech = (index: number) => {
    setTechnologies((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex gap-[165px] min-h-screen font-lato font-bold text-[20px] leading-[30px] px-[30px] py-[40px] bg-light-blue-bg">
      <div>
        <h1 className="px-[20px] mb-[10px]">Спеціалізації</h1>
        <div className="text-[16px] font-semibold p-[20px] bg-white border border-card-border rounded-lg">
          <ul className="mb-[18px]">
            {specializations.map((spec, index) => (
              <li
                key={index}
                className="relative w-[372px] bg-blue-hover rounded-lg mb-[8px] hover:bg-hover-blue before:block before:absolute before:w-[86px] before:h-[30px] before:top-1/2 before:-translate-y-1/2 before:left-0 pl-[110px]"
              >
                <span
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[86px] h-[30px] rounded-lg"
                  style={{ backgroundColor: spec.color }}
                ></span>
                <div className="flex items-center justify-between">
                  {spec.name}
                  <button
                    className="mr-[5px]"
                    onClick={() => handleRemoveSpec(index)}
                  >
                    <MdClose size={18} style={{ color: '#91A2B6' }} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-center">
            <Button
              label="Додати спеціалізацію"
              className="w-[268px]"
              onClick={handleAddClick}
            />
          </div>
        </div>
        {isFormVisible && (
          <div className="text-[16px] font-semibold py-[20px] px-[12px] bg-input-normal-state border border-card-border rounded-lg">
            <form onSubmit={handleSubmitSpecialization(onSubmit)}>
              <div className="flex flex-col">
                <label className="font-Open Sans font-sans text-[16px] font-normal leading-[1.75] mb-[8px]">
                  Додати спеціалізацію
                </label>
                <input
                  {...register('specializationName', { required: true })}
                  maxLength={15}
                  className="h-[40px] px-[10px] rounded-lg mb-[20px]"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-Open Sans font-sans text-[16px] font-normal leading-[1.75] mb-[10px]">
                  Обрати колір
                </label>
                <div
                  className="w-[107px] h-[30px] rounded-lg border border-card-border mb-[10px]"
                  style={{ backgroundColor: selectedColor }}
                ></div>
                <div className="flex gap-[4px] border border-card-border rounded-lg px-[28px] py-[20px] mb-[20px]">
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
        )}
      </div>
      <div>
        <h1 className="px-[20px] mb-[10px]">Технології</h1>
        <div className="text-[16px] font-semibold p-[20px] bg-white border border-card-border rounded-lg">
          <ul className="mb-[18px]">
            {technologies.map((tech, index) => (
              <li
                key={index}
                className="w-[372px] px-[8px] bg-blue-hover hover:bg-hover-blue rounded-lg mb-[8px]"
              >
                <div className="flex items-center justify-between">
                  {tech}
                  <button
                    className="mr-[5px]"
                    onClick={() => handleRemoveTech(index)}
                  >
                    <MdClose size={18} style={{ color: '#91A2B6' }} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-center">
            <Button
              label="Додати технологію"
              className="w-[220px]"
              onClick={handleAddClickTechnology}
            />
          </div>
        </div>
        {isFormTechVisible && (
          <div className="text-[16px] font-semibold py-[12px] px-[10px] bg-input-normal-state border border-card-border rounded-lg">
            <form onSubmit={handleSubmitTechnology(onSubmitTechnology)}>
              <div className="flex flex-col">
                <label className="font-Open Sans font-sans text-[16px] font-normal leading-[1.75] mb-[8px]">
                  Додати технологію
                </label>
                <input
                  {...registerTechnology('technologyName', { required: true })}
                  maxLength={20}
                  className="h-[40px] px-[10px] rounded-lg mb-[20px]"
                />
              </div>
              <div className="flex justify-center">
                <Button
                  label="Зберегти"
                  className="w-[268px] text-white bg-[#1e70eb]"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecTechs;
