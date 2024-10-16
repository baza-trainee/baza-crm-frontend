import Button from '../components/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { Scrollbar } from 'react-scrollbars-custom';
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
  usedColors: string[];
}

const colors = [
  '#fea362', // Full stack
  '#579dff', // PM
  '#94c748', // Designer
  '#f5cd47', // Frontend
  '#9f8fef', // Backend
  '#f87168', // QA
  '#84e78d', // Green
  '#2a4875', // Blue-dark
  '#a1caff', // Light-blue
  '#1e70eb', // Blue
  '#f868e7', // Pink
  '#f8f368', // Yellow
  '#93f868', // Acid-green
  '#68f8ee', // Baltic
  '#1c8e44', // Dark-green
  '#7c3d96', // Leela
];

const Technologies = () => {
  const token = useSelector((state: RootState) => state.userState.user?.token);
  const [selectedColor, setSelectedColor] = useState<string>('');
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
  const [specializationInputErrorMessage, setSpecializationInputErrorMessage] =
    useState<string>('');
  const [technologyInputErrorMessage, setTechnologyInputErrorMessage] =
    useState<string>('');
  const [colorInputError, setColorInputError] = useState(false);
  const [usedColors, setUsedColors] = useState<string[]>([]);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    if (colorInputError) {
      setColorInputError(false);
    }
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

          setSpecializations(specializations);

          // Used colors
          const usedColors = specializations.map((spec) => spec.color);
          setUsedColors(usedColors);
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
          id: newSpecialization.id,
        },
      ]);

      // Refresh list of used colors
      setUsedColors([...usedColors, selectedColor]);
      setSelectedColor('');

      toast.success('Спеціалізацію успішно створено');
    } catch (error) {
      console.error('Помилка додавання спеціалізації:', error);
      toast.error('Не вдалося створити спеціалізацію');
    }
  };

  const handleSaveSpecialization = () => {
    if (specializationName.trim() && selectedColor) {
      addSpecializationToServer(specializationName);
      setSpecializationName('');
      setSpecializationInputErrorMessage('');
      setColorInputError(false);
    } else {
      if (!specializationName.trim()) {
        console.error('Назва спеціалізації не може бути пустою');
        setSpecializationInputErrorMessage('Введіть назву');
      }
      if (!selectedColor) {
        setColorInputError(true);
      }
    }
  };

  // Delete Specialization
  const deleteSpecializationFromServer = async (index: number) => {
    const tagId = specializations[index].id;
    const colorToRestore = specializations[index].color;

    try {
      const url = `${import.meta.env.VITE_API_URL}/tag/${tagId}`;

      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSpecializations((prev) => prev.filter((_, i) => i !== index));

      // Refresh list of used colors after delete specialization
      setUsedColors((prevUsedColors) =>
        prevUsedColors.filter((color) => color !== colorToRestore),
      );

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

          setTechnologies(technologies);
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
      setTechnologyInputErrorMessage('');
    } else {
      console.error('Назва технології не може бути пустою');
      setTechnologyInputErrorMessage('Введіть назву');
    }
  };

  // Delete Technology
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
    } else if (data.specializationName && selectedColor) {
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
    usedColors,
  }) => {
    const isDisabled = usedColors.includes(value);

    return (
      <label className="cursor-pointer">
        <input
          type="radio"
          name="color"
          value={value}
          className="hidden"
          onChange={() => onChange(value)}
          disabled={isDisabled}
        />
        <div
          className={`w-[30px] h-[30px] rounded-lg box-border ${selectedColor === value ? 'border-2 border-black' : ''}
          ${isDisabled ? 'border-2 border-black' : ''}`}
          style={{ backgroundColor: value }}
        ></div>
      </label>
    );
  };

  return (
    <div className="flex gap-[165px] min-h-screen font-lato font-bold text-[20px] leading-[30px] px-[30px] py-[40px] bg-light-blue-bg">
      <div>
        <h1 className="px-[20px] mb-[10px]">Спеціалізації</h1>
        <div className="lg:w-[412px] md:w-[372px] text-[16px] font-semibold p-[20px] bg-white border border-card-border rounded-lg">
          <Scrollbar
            style={{ height: 332, width: '105%' }}
            trackYProps={{
              style: {
                backgroundColor: 'inherit',
                height: '300px',
                width: '8px',
                right: '2px',
              },
            }}
            thumbYProps={{
              style: {
                cursor: 'default',
                backgroundColor: '#E8F2FF',
                borderRadius: '4px',
              },
            }}
            noScrollX={true}
          >
            <ul className="lg:w-[372px] md:w-[332px]">
              {specializations.map((specialization, index) => (
                <li
                  key={index}
                  className="relative lg:w-[372px] md:w-[332px] bg-blue-hover rounded-lg mb-[8px] last:mb-0 hover:bg-hover-blue before:block before:absolute before:w-[86px] before:h-[30px] before:top-1/2 before:-translate-y-1/2 before:left-0 pl-[110px]"
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
          </Scrollbar>
          <div className="flex justify-center">
            <Button
              label="Додати спеціалізацію"
              className="w-[268px] duration-500 mt-[18px]"
              onClick={handleAddClickSpecialization}
            />
          </div>
        </div>
        {isFormSpecVisible && (
          <div className="text-[16px] font-semibold py-[20px] px-[10px] bg-input-normal-state border border-card-border rounded-lg">
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
                  className={`h-[40px] font-normal px-[10px] rounded-lg mb-[20px] border-2 hover:bg-hover-blue focus:border-primary-blue focus:outline-none
                    ${specializationInputErrorMessage ? 'border-red focus:border-red' : ''}`}
                  onChange={(e) => {
                    setSpecializationName(e.target.value);
                    if (specializationInputErrorMessage) {
                      setSpecializationInputErrorMessage('');
                    }
                  }}
                />
                <div className="relative">
                  <div className="absolute bottom-[-10px]">
                    {specializationInputErrorMessage && (
                      <p className="font-Open Sans font-sans text-[12px] text-red">
                        {specializationInputErrorMessage}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="font-Open Sans font-sans text-[16px] font-normal leading-[1.75] mb-[10px]">
                  Обрати колір
                </label>
                <div
                  className="w-[107px] h-[30px] rounded-lg border border-card-border mb-[10px]"
                  style={{ backgroundColor: selectedColor }}
                ></div>
                <div
                  className={`lg:w-[392px] md:w-[352px] flex gap-[4px] flex-wrap justify-center border border-card-border rounded-lg px-[26px] py-[20px] mb-[20px]
                  ${colorInputError ? 'border-2 border-red' : ''}`}
                >
                  {colors.map((color, index) => (
                    <ColorRadio
                      key={index}
                      value={color}
                      selectedColor={selectedColor}
                      onChange={handleColorChange}
                      usedColors={usedColors}
                    />
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute bottom-[-5px]">
                  {colorInputError && (
                    <p className="font-Open Sans font-sans text-[12px] text-red">
                      Оберіть колір
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  label="Зберегти"
                  className="w-[268px] text-white duration-500 bg-primary-blue hover:bg-white hover:!text-[#000]"
                  onClick={handleSaveSpecialization}
                />
              </div>
            </form>
          </div>
        )}
      </div>
      <div>
        <h1 className="px-[20px] mb-[10px]">Технології</h1>
        <div className="lg:w-[412px] md:w-[372px] text-[16px] font-semibold p-[20px] bg-white border border-card-border rounded-lg">
          <Scrollbar
            style={{ height: 332, width: '105%' }}
            trackYProps={{
              style: {
                backgroundColor: 'inherit',
                height: '300px',
                width: '8px',
                right: '2px',
              },
            }}
            thumbYProps={{
              style: {
                cursor: 'default',
                backgroundColor: '#E8F2FF',
                borderRadius: '4px',
              },
            }}
            noScrollX={true}
          >
            <ul className="lg:w-[372px] md:w-[332px]">
              {technologies.map((tech, index) => (
                <li
                  key={index}
                  className="lg:w-[372px] md:w-[332px] mb-[8px] last:mb-0 px-[8px] bg-blue-hover hover:bg-hover-blue rounded-lg"
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
          </Scrollbar>
          <div className="flex justify-center">
            <Button
              label="Додати технологію"
              className="w-[220px] mt-[18px] duration-500"
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
                  className={`h-[40px] font-normal px-[10px] rounded-lg mb-[37px] border-2 hover:bg-hover-blue focus:border-primary-blue focus:outline-none
                    ${technologyInputErrorMessage ? 'border-red focus:border-red' : ''}`}
                  onChange={(e) => {
                    setTechnologyName(e.target.value);
                    if (technologyInputErrorMessage) {
                      setTechnologyInputErrorMessage('');
                    }
                  }}
                />
                <div className="relative">
                  <div className="absolute bottom-[5px]">
                    {technologyInputErrorMessage && (
                      <p className="font-Open Sans font-sans text-[12px] text-red">
                        {technologyInputErrorMessage}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  label="Зберегти"
                  className="w-[268px] text-white duration-500 bg-primary-blue hover:bg-white hover:!text-[#000]"
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
