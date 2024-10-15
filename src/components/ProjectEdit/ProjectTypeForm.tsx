import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const ProjectTypeForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedFormat = watch('projectType');
  return (
    <div className="bg-white rounded-[10px] px-8 py-5 border-card-border border flex items-center gap-5">
      <div className="flex flex-col gap-2">
        <span>Сума, грн</span>
        <input
          className="w-36 text-center duration-500 border-2 rounded-[10px] outline-none focus:border-2 focus:border-primary-blue p-2"
          placeholder="Число"
          type="number"
          min={0}
          {...register('price', {
            required: "Сума обов'язкова",
          })}
        />
        <div className="h-5 -mb-3">
          {errors.price && typeof errors.price.message === 'string' && (
            <span className="text-red">{errors.price.message}</span>
          )}
        </div>
      </div>
      <div className="relative flex flex-col w-48 gap-2 grow">
        <span>Формат участі</span>
        <div
          className="flex items-center gap-2 border-2 rounded-[10px] px-7 bg-input-normal-state border-card-border cursor-pointer"
          onClick={toggleDropdown}
        >
          <span className="w-full h-[40px] items-center flex capitalize">
            {selectedFormat}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        {isOpen && (
          <div className="absolute left-0 z-10 bg-input-normal-state rounded-[10px] shadow-lg top-20 w-full border-card-border border px-7 py-5">
            <label className="relative flex gap-2 hover:after:w-12 after:w-0 after:block after:h-[1px] after:bg-primary-blue after:absolute after:left-0 after:bottom-0 after:duration-500 after:mx-6 hover:text-primary-blue cursor-pointer">
              <input
                type="radio"
                value="free"
                {...register('projectType')}
                className="cursor-pointer"
              />
              Free
            </label>
            <label className="relative flex gap-2 hover:after:w-12 after:w-0 after:block after:h-[1px] after:bg-primary-blue after:absolute after:left-0 after:bottom-0 after:duration-500 after:mx-6 hover:text-primary-blue cursor-pointer mt-2">
              <input
                type="radio"
                value="light"
                {...register('projectType')}
                className="cursor-pointer"
              />
              Light
            </label>
            <label className="relative flex gap-2 hover:after:w-12 after:w-0 after:block after:h-[1px] after:bg-primary-blue after:absolute after:left-0 after:bottom-0 after:duration-500 after:mx-6 hover:text-primary-blue cursor-pointer mt-2">
              <input
                type="radio"
                value="strong"
                {...register('projectType')}
                className="cursor-pointer"
              />
              Strong
            </label>
          </div>
        )}
        <div className="h-5 -mb-3">
          {errors.projectType &&
            typeof errors.projectType.message === 'string' && (
              <span className="text-red">{errors.projectType.message}</span>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProjectTypeForm;
