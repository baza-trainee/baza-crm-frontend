import 'react-datepicker/dist/react-datepicker.css';

import DatePicker from 'react-datepicker';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import calendar from '../assets/common/calendar.svg';
import { Tooltip } from 'react-tooltip';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import ProjectFormat from '../components/Projects/ProjectFormat';
import { CreateProjectRequest, RootState } from '../types';
import { createProject } from '../utils/projectApi';
import { specializations } from '../utils/specializations';
// import Calendar from 'react-datepicker/dist/calendar'

// import { useState } from 'react';

const ProjectCreate: React.FC = () => {
  const user = useSelector((state: RootState) => state.userState.user);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateProjectRequest>();

  // const [dateStart, setDateStart] = useState<Date | null>(null);
  // const [dateTeam, setDateTeam] = useState<Date | null>(null);

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
      console.log(data);
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
        {errors.name && (
          <span className="text-rose-500">{errors.name.message}</span>
        )}
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
              <span className="text-rose-500">
                {errors.description.message}
              </span>
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
                  dateFormat="MM/dd/yyyy"
                  placeholderText="08/17/2023"
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
              <span className="text-rose-500">{errors.dateTeam.message}</span>
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
                  dateFormat="MM/dd/yyyy"
                  placeholderText="08/17/2023"
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
              <span className="text-rose-500">{errors.dateStart.message}</span>
            )}
          </div>
        </div>
        <div className="w-[412px] flex flex-col gap-5">
          {/* PROJECT POINTS */}
          <div className="bg-white rounded-[10px] px-8 py-2 border-card-border border justify-between flex items-center">
            <p className="font-bold font-lato">Бали за участь</p>
            <input
              className="duration-500 border-b-2 outline-none w-52 focus:border-b-2 focus:border-b-primary-blue"
              placeholder="Вказати кількість балів"
              type="number"
              min={0}
              {...register('projectPoints', {
                required: "Кількість балів обов'язкова і бути числом",
              })}
            />
          </div>
          <div className="h-5 px-8 -mt-5 -mb-3">
            {errors.projectPoints && (
              <span className="text-rose-500">
                {errors.projectPoints.message}
              </span>
            )}
          </div>
          <div className="bg-white rounded-[10px] px-8 py-2 border-card-border border justify-between flex items-end">
            <p>Формат участі</p>
            <p
              className="font-semibold uppercase cursor-default text-primary-blue"
              data-tooltip-id="my-tooltip"
            >
              LIGHT
            </p>
            <Tooltip
              id="my-tooltip"
              place="bottom"
              style={{ backgroundColor: 'transparent', zIndex: 20 }}
            >
              <ProjectFormat projectType="light" />
            </Tooltip>
          </div>
        </div>
      </div>
      {/* TEAM */}
      <h3 className="mb-3 ml-8 text-xl font-bold">Склад команди</h3>
      <div className="flex flex-wrap gap-5">
        {specializations.map((specialization) => (
          <div
            className="w-[268px] bg-white rounded-[10px] px-8 py-5 border-card-border border h-[282px] flex flex-col justify-start gap-3"
            key={specialization}
          >
            <div className="flex items-center justify-between">
              <div className="px-8 py-2 text-white rounded-r-[10px] -ml-8 self-start bg-primary-blue">
                {specialization}
              </div>
              <p>5/5</p>
            </div>
            <div>
              <p>Аникій Філіппов</p>
              <p>Віктор Філіппов</p>
              <p>Оксана Лисенко</p>
              <p>Максим Головко</p>
              <p>Софія Пономаренко</p>
            </div>
          </div>
        ))}
      </div>
      {/* BUTTON */}
      <button
        type="submit"
        className="border-2 border-primary-blue rounded-[10px] duration-500 bg-primary-blue text-white hover:bg-transparent hover:text-black font-semibold flex justify-center items-center w-[268px] h-10"
      >
        Створити проєкт
      </button>
    </form>
  );
};

export default ProjectCreate;
