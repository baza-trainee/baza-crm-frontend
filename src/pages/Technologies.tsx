import Button from '../components/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';
import { getTags } from '../utils/tagApi';
import { RootState } from '../types';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface FormValues {
  specializationName: string;
  technologyName: string;
}

interface ColorRadioProps {
  value: string;
  selectedColor: string;
  onChange: (value: string) => void;
}

const Technologies = () => {
  const token = useSelector((state: RootState) => state.userState.user?.token);
  const [selectedColor, setSelectedColor] = useState<string>('#f87168');
  // const [specializations, setSpecializations] = useState<
  //   { name: string; color: string; tagId: number }[]
  // >([]);
  const [specializations, setSpecializations] = useState<
    { name: string; color: string; id: number }[]
  >([]);
  const [technologies, setTechnologies] = useState<
    { name: string; id: number }[]
  >([]);
  const [isFormSpecVisible, setIsFormSpecVisible] = useState(false);
  const [isFormTechVisible, setIsFormTechVisible] = useState(false);
  const [specializationName, setSpecializationName] = useState<string>('');
  const [technologyName, setTechnologyName] = useState<string>('');

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const { isError: isTagsError } = useQuery({
    queryKey: ['tags', token],
    queryFn: () => (token ? getTags(token) : Promise.resolve([])),
    enabled: !!token,
  });

  if (isTagsError) {
    console.log(isTagsError);
  }

  // get all specialization (color + name + isSpecialization)
  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        if (token) {
          const tags = await getTags(token);

          const specializations = tags?.filter(
            (tag) => tag.isSpecialization === true,
          );

          // const specializations = tags
          //   .filter((tag) => tag.isSpecialization)
          //   .map((specialization) => ({
          //     name: specialization.name,
          //     color: specialization.color,
          //     tagId: specialization.id,
          //   }));

          setSpecializations(specializations);
        }
      } catch (error) {
        console.error('Помилка отримання спеціалізацій', error);
      }
    };

    if (token) {
      fetchSpecializations();
    }
  }, [token]);

  // create new Specialization (color + name + isSpecialization)
  const addSpecializationToServer = async (specializationName: string) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/tag/`;

      const response = await axios.post(
        url,
        {
          name: specializationName,
          color: selectedColor,
          isSpecialization: true,
        },
        {
          headers: {
            Authorization: `Bearer ` + token,
          },
        },
      );

      const newSpecialization = response.data;

      setSpecializations([
        ...specializations,
        {
          name: newSpecialization.name,
          color: newSpecialization.color,
          // tagId: newSpecialization.id,
          id: newSpecialization.id,
        },
      ]);
      toast.success('Спеціалізацію успішно створено');
    } catch (error) {
      console.error('Помилка додавання спеціалізації:', error);
      toast.error('Не вдалося створити спеціалізацію');
    }
  };

  const handleSaveSpecialization = () => {
    if (specializationName.trim()) {
      addSpecializationToServer(specializationName);
      setSpecializationName('');
    } else {
      console.error('Назва спеціалізації не може бути пустою');
    }
  };

  // Delete Specialization
  const deleteSpecializationFromServer = async (index: number) => {
    // const tagId = specializations[index].tagId;
    const tagId = specializations[index].id;
    try {
      const url = `${import.meta.env.VITE_API_URL}/tag/${tagId}`;

      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSpecializations((prev) => prev.filter((_, i) => i !== index));
      toast.success('Спеціалізацію успішно видалено');
    } catch (error) {
      console.error('Помилка видалення спеціалізації:', error);
      toast.error('Не вдалося видалити спеціалізацію');
    }
  };

  // Specializations form
  const {
    register: registerSpecialization,
    handleSubmit: handleSubmitSpecialization,
    reset: resetSpecialization,
  } = useForm<FormValues>();

  // Technologies
  // get all technologies
  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        if (token) {
          const tags = await getTags(token);

          const technologies = tags?.filter(
            (tag) => tag.isSpecialization === false,
          );
          // const technologies = tags
          //   .filter((tag) => !tag.isSpecialization)
          //   .map((technology) => ({
          //     name: technology.name,
          //     tagId: technology.id,
          //   }));

          setTechnologies(technologies);
          // console.log(technologies);
        }
      } catch (error) {
        console.error('Помилка отримання технологій', error);
      }
    };

    if (token) {
      fetchTechnologies();
    }
  }, [token]);

  // Create new technology
  const addTechnologyToServer = async (technologyName: string) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/tag/`;

      const response = await axios.post(
        url,
        {
          name: technologyName,
          isSpecialization: false,
        },
        {
          headers: {
            Authorization: `Bearer ` + token,
          },
        },
      );

      const newTechnology = response.data;

      setTechnologies([
        ...technologies,
        {
          name: newTechnology.name,
          id: newTechnology.id,
        },
      ]);
      toast.success('Технологію успішно створено');
    } catch (error) {
      console.error('Помилка додавання технології:', error);
      toast.error('Не вдалося створити технологію');
    }
  };

  const handleSaveTechnology = () => {
    if (technologyName.trim()) {
      addTechnologyToServer(technologyName);
      setTechnologyName('');
    } else {
      console.error('Назва технології не може бути пустою');
    }
  };

  // Delete Technologie
  const deleteTechnologieFromServer = async (index: number) => {
    const tagId = technologies[index].id;
    try {
      const url = `${import.meta.env.VITE_API_URL}/tag/${tagId}`;

      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTechnologies((prev) => prev.filter((_, i) => i !== index));
      toast.success('Технологію успішно видалено');
    } catch (error) {
      console.error('Помилка видалення технології:', error);
      toast.error('Не вдалося видалити технологію');
    }
  };

  // Technologies form
  const {
    register: registerTechnology,
    handleSubmit: handleSubmitTechnology,
    reset: resetTechnology,
  } = useForm<FormValues>();

  // reset both forms after submit
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data.technologyName) {
      resetTechnology();
    } else if (data.specializationName) {
      resetSpecialization();
    }
  };

  // show add-form blocks
  const handleAddClickSpecialization = () => {
    setIsFormSpecVisible(true);
  };

  const handleAddClickTechnology = () => {
    setIsFormTechVisible(true);
  };

  // color-choose radios
  const ColorRadio: React.FC<ColorRadioProps> = ({
    value,
    selectedColor,
    onChange,
  }) => (
    <label className="cursor-pointer">
      <input
        type="radio"
        name="color"
        value={value}
        className="hidden"
        onChange={() => onChange(value)}
      />
      <div
        className={`w-[30px] h-[30px] rounded-lg box-border ${selectedColor === value ? 'border-2 border-black' : ''}`}
        style={{ backgroundColor: value }}
      ></div>
    </label>
  );

  return (
    <div className="flex gap-[165px] min-h-screen font-lato font-bold text-[20px] leading-[30px] px-[30px] py-[40px] bg-light-blue-bg">
      <div>
        <h1 className="px-[20px] mb-[10px]">Спеціалізації</h1>
        <div className="text-[16px] font-semibold p-[20px] bg-white border border-card-border rounded-lg">
          <ul className="mb-[18px]">
            {specializations.map((specialization, index) => (
              <li
                key={index}
                className="relative w-[372px] bg-blue-hover rounded-lg mb-[8px] hover:bg-hover-blue before:block before:absolute before:w-[86px] before:h-[30px] before:top-1/2 before:-translate-y-1/2 before:left-0 pl-[110px]"
              >
                <span
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[86px] h-[30px] rounded-lg"
                  style={{ backgroundColor: specialization.color }}
                ></span>
                <div className="flex items-center justify-between">
                  {specialization.name}
                  <button
                    className="mr-[5px]"
                    onClick={() => deleteSpecializationFromServer(index)}
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
              className="w-[268px] duration-500"
              onClick={handleAddClickSpecialization}
            />
          </div>
        </div>
        {isFormSpecVisible && (
          <div className="text-[16px] font-semibold py-[20px] px-[12px] bg-input-normal-state border border-card-border rounded-lg">
            <form onSubmit={handleSubmitSpecialization(onSubmit)}>
              <div className="flex flex-col">
                <label className="font-Open Sans font-sans text-[16px] font-normal leading-[1.75] mb-[8px]">
                  Додати спеціалізацію
                </label>
                <input
                  {...registerSpecialization('specializationName', {
                    required: true,
                  })}
                  maxLength={15}
                  className="h-[40px] font-normal px-[10px] rounded-lg mb-[20px] border-2 focus:border-primary-blue focus:outline-none"
                  onChange={(e) => setSpecializationName(e.target.value)}
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
                <div className="flex gap-[4px] flex-wrap justify-center w-[392px] border border-card-border rounded-lg px-[26px] py-[20px] mb-[20px]">
                  {/* Full stack */}
                  <ColorRadio
                    value="#fea362"
                    selectedColor={selectedColor}
                    onChange={handleColorChange}
                  />
                  {/* PM */}
                  <ColorRadio
                    value="#579dff"
                    selectedColor={selectedColor}
                    onChange={handleColorChange}
                  />
                  {/* Designer */}
                  <ColorRadio
                    value="#94c748"
                    selectedColor={selectedColor}
                    onChange={handleColorChange}
                  />
                  {/* Frontend */}
                  <ColorRadio
                    value="#f5cd47"
                    selectedColor={selectedColor}
                    onChange={handleColorChange}
                  />
                  {/* Backend */}
                  <ColorRadio
                    value="#9f8fef"
                    selectedColor={selectedColor}
                    onChange={handleColorChange}
                  />
                  {/* QA */}
                  <ColorRadio
                    value="#f87168"
                    selectedColor={selectedColor}
                    onChange={handleColorChange}
                  />
                  {/* Green */}
                  <ColorRadio
                    value="#84e78d"
                    selectedColor={selectedColor}
                    onChange={handleColorChange}
                  />
                  {/* Blue-dark */}
                  <ColorRadio
                    value="#2a4875"
                    selectedColor={selectedColor}
                    onChange={handleColorChange}
                  />
                  {/* Light-blue */}
                  <ColorRadio
                    value="#a1caff"
                    selectedColor={selectedColor}
                    onChange={handleColorChange}
                  />
                  {/* Blue */}
                  <ColorRadio
                    value="#1e70eb"
                    selectedColor={selectedColor}
                    onChange={handleColorChange}
                  />
                  {/* Pink */}
                  <ColorRadio
                    value="#f868e7"
                    selectedColor={selectedColor}
                    onChange={handleColorChange}
                  />
                  {/* Yellow */}
                  <ColorRadio
                    value="#f8f368"
                    selectedColor={selectedColor}
                    onChange={handleColorChange}
                  />
                  {/* Acid-green */}
                  <ColorRadio
                    value="#93f868"
                    selectedColor={selectedColor}
                    onChange={handleColorChange}
                  />
                  {/* Baltic */}
                  <ColorRadio
                    value="#68f8ee"
                    selectedColor={selectedColor}
                    onChange={handleColorChange}
                  />
                  {/* Dark-green */}
                  <ColorRadio
                    value="#1c8e44"
                    selectedColor={selectedColor}
                    onChange={handleColorChange}
                  />
                  {/* Leela */}
                  <ColorRadio
                    value="#7c3d96"
                    selectedColor={selectedColor}
                    onChange={handleColorChange}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  label="Зберегти"
                  className="w-[268px] text-white bg-[#1e70eb]"
                  onClick={handleSaveSpecialization}
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
                  {tech.name}
                  <button
                    className="mr-[5px]"
                    onClick={() => deleteTechnologieFromServer(index)}
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
              className="w-[220px] duration-500"
              onClick={handleAddClickTechnology}
            />
          </div>
        </div>
        {isFormTechVisible && (
          <div className="text-[16px] font-semibold py-[12px] px-[10px] bg-input-normal-state border border-card-border rounded-lg">
            <form onSubmit={handleSubmitTechnology(onSubmit)}>
              <div className="flex flex-col">
                <label className="font-Open Sans font-sans text-[16px] font-normal leading-[1.75] mb-[8px]">
                  Додати технологію
                </label>
                <input
                  {...registerTechnology('technologyName', { required: true })}
                  maxLength={20}
                  className="h-[40px] font-normal px-[10px] rounded-lg mb-[20px] border-2 focus:border-primary-blue focus:outline-none"
                  onChange={(e) => setTechnologyName(e.target.value)}
                />
              </div>
              <div className="flex justify-center">
                <Button
                  label="Зберегти"
                  className="w-[268px] text-white bg-[#1e70eb]"
                  onClick={handleSaveTechnology}
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Technologies;
