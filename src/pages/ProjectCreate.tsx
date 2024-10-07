import 'react-datepicker/dist/react-datepicker.css';

import DatePicker from 'react-datepicker';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Tooltip } from 'react-tooltip';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import ProjectFormat from '../components/Projects/ProjectFormat';
import calendar from '../assets/common/calendar.svg';
import { CreateProjectRequest, RootState } from '../types';
import { createProject } from '../utils/projectApi';
import { getTags } from '../utils/tagApi';

const ProjectCreate: React.FC = () => {
  const user = useSelector((state: RootState) => state.userState.user);

  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateProjectRequest>({
    defaultValues: {
      projectType: 'free',
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectedFormat = watch('projectType');

  const { data: tags, isError: isTagsError } = useQuery({
    queryKey: ['tags', user?.token],
    queryFn: () => getTags(user!.token),
    enabled: !!user?.token,
  });

  const specializations = tags?.filter((tag) => tag.isSpecialization === true);

  if (isTagsError) {
    console.log(isTagsError);
  }

  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      toast.success('Проєкт успішно створено');
    },
    onError: () => {
      toast.error('Не вдалося створити проєкт');
    },
  });

  const onSubmit: SubmitHandler<CreateProjectRequest> = (data) => {
    const token = user?.token;
    if (token) {
      mutation.mutate({ projectData: data, token });
      // console.log(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full gap-5 px-8 py-5 height-100 bg-light-blue-bg text-text-black"
    >
      {/* TITLE */}
      <div className="h-[60px] flex justify-between items-center font-bold text-text-black bg-white rounded-xl border-card-border border px-8 w-[845px]">
        <input
          className="duration-500 border-b-2 outline-none w-96 focus:border-b-2 focus:border-b-primary-blue"
          placeholder="Ввести назву проєкту"
          type="text"
          {...register('name', {
            required: "Назва проєкту обов'язкова",
            minLength: {
              value: 3,
              message: 'Назва повинна містити щонайменше 3 символи',
            },
          })}
        />
        <div className="px-5 py-2 text-white rounded-[10px] bg-orange">
          Формується команда
        </div>
      </div>
      <div className="h-5 px-8 mb-5">
        {errors.name && <span className="text-red">{errors.name.message}</span>}
      </div>
      <h3 className="mb-3 ml-8 text-xl font-bold">Опис проєкту</h3>
      <div className="flex flex-wrap gap-5 mb-10">
        <div className="w-[845px] bg-white rounded-[10px] px-8 py-5 border-card-border border flex flex-col justify-between gap-5">
          {/* DESCRIPTION */}
          <input
            className="duration-500 border-b-2 outline-none w-96 focus:border-b-2 focus:border-b-primary-blue"
            placeholder="Ввести опис проєкту"
            type="text"
            {...register('description', {
              required: "Опис проєкту обов'язкова",
              minLength: {
                value: 3,
                message: 'Опис проєкту повинен містити щонайменше 3 символи',
              },
            })}
          />
          <div className="h-5 -mt-5 -mb-3">
            {errors.description && (
              <span className="text-red">{errors.description.message}</span>
            )}
          </div>
          {/* DATE TEAM */}
          <div className="relative flex items-center gap-5 w-[650px]">
            <label
              htmlFor="dateTeam"
              className="font-bold font-lato text-tertiary-text w-[290px]"
            >
              Дата старту формування команди
            </label>
            <Controller
              control={control}
              name="dateTeam"
              rules={{
                required: "Дата старту формування команди є обов'язковою",
              }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="25/12/2024"
                  className="w-[320px] h-14 flex items-center rounded border-2 border-card-border px-5 duration-500 outline-none  focus:border-primary-blue focus:border-2"
                />
              )}
            />
            <img
              src={calendar}
              alt="calendar"
              className="absolute top-1 right-7"
            />
          </div>
          <div className="h-5 -mt-5 -mb-3">
            {errors.dateTeam && (
              <span className="text-red">{errors.dateTeam.message}</span>
            )}
          </div>
          {/* DATE START */}
          <div className="relative flex items-center gap-5 w-[650px]">
            <label
              htmlFor="dateStart"
              className="font-bold font-lato text-tertiary-text w-[290px]"
            >
              Дата старту проєкту
            </label>
            <Controller
              control={control}
              name="dateStart"
              rules={{ required: "Дата старту проєкту є обов'язковою" }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="25/12/2024"
                  className="w-[320px] h-14 flex items-center rounded border-2 border-card-border px-5 duration-500 outline-none  focus:border-primary-blue focus:border-2"
                />
              )}
            />
            <img
              src={calendar}
              alt="calendar"
              className="absolute top-1 right-7"
            />
          </div>
          <div className="h-5 -mt-5 -mb-3">
            {errors.dateStart && (
              <span className="text-red">{errors.dateStart.message}</span>
            )}
          </div>
        </div>
        <div className="w-[412px] flex flex-col gap-5">
          {/* PROJECT POINTS */}
          <div className="bg-white rounded-[10px] px-8 py-2 border-card-border border justify-between flex items-center">
            <p className="font-bold font-lato">Бали за участь</p>
            <input
              className="text-center duration-500 border-b-2 outline-none w-52 focus:border-b-2 focus:border-b-primary-blue"
              placeholder="Вказати кількість балів"
              type="number"
              min={0}
              {...register('projectPoints', {
                required: "Кількість балів обов'язкова і є числом",
              })}
            />
          </div>
          <div className="h-5 px-8 -mt-5 -mb-3">
            {errors.projectPoints && (
              <span className="text-red">{errors.projectPoints.message}</span>
            )}
          </div>
          {/* PROJECT TYPE AND PRICE */}
          <div className="bg-white rounded-[10px] px-8 py-2 border-card-border border justify-between flex items-end">
            <p>Формат участі</p>
            <p
              className="font-semibold uppercase cursor-default text-primary-blue"
              data-tooltip-id="my-tooltip"
            >
              {selectedFormat}
            </p>
            <Tooltip
              id="my-tooltip"
              place="bottom"
              style={{ backgroundColor: 'transparent', zIndex: 20 }}
            >
              <ProjectFormat projectType={selectedFormat} />
            </Tooltip>
          </div>
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
                {errors.price && (
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
                {errors.projectType && (
                  <span className="text-red">{errors.projectType.message}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* TEAM */}
      <h3 className="mb-3 ml-8 text-xl font-bold">Склад команди</h3>
      <div className="flex flex-wrap gap-6">
        {specializations?.map((specialization, index) => (
          <div
            className="w-[268px] bg-white rounded-[10px] px-8 py-5 border-color-pm border flex flex-col justify-center gap-3 relative"
            key={specialization.id}
          >
            <div className="flex items-center justify-between gap-5">
              <div
                className="px-8 py-2 text-white rounded-r-[10px] -ml-8 self-start"
                style={{ backgroundColor: specialization.color }}
              >
                {specialization.name}
              </div>
              <input
                className="w-20 text-center duration-500 border-b-2 outline-none focus:border-b-2 focus:border-b-primary-blue"
                placeholder="Число"
                type="number"
                min={specialization.name === 'PM' ? 1 : 0}
                {...register(`specializations.${index}.count`, {
                  required: "Кількість обов'язкова",
                })}
              />
              <input
                type="hidden"
                {...register(`specializations.${index}.id`, {
                  value: Number(specialization.id),
                })}
              />
            </div>
            <div className="absolute left-0 h-5 -bottom-5">
              {errors.specializations?.[index]?.count?.message && (
                <span className="text-red">
                  {errors.specializations[index]?.count?.message}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* BUTTON */}
      <button
        type="submit"
        className="border-2 border-primary-blue rounded-[10px] duration-500 bg-primary-blue text-white hover:bg-transparent hover:text-black font-semibold flex justify-center items-center w-[268px] h-10 mt-2"
      >
        {mutation.isPending ? 'Створення проєкту...' : 'Створити проєкт'}
      </button>
    </form>
  );
};

export default ProjectCreate;
