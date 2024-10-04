import 'react-datepicker/dist/react-datepicker.css';

import DatePicker from 'react-datepicker';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FaCalendarDay } from 'react-icons/fa6';
import { FaLinkedin, FaSquareFacebook, FaTelegram } from 'react-icons/fa6';
import { Tooltip } from 'react-tooltip';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import ProjectDropdown from '../components/Projects/ProjectDropdown';
import ProjectFormat from '../components/Projects/ProjectFormat';
import { CreateProjectRequest, RootState } from '../types';
import { createProject } from '../utils/projectApi';
import { specializations } from '../utils/specializations';

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
          className="duration-500 outline-none w-96"
          placeholder="Ввести назву проєкту"
          type="text"
          {...register('name', {
            required: "Назва проєкту обов'язкова для заповнення",
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
      {/* DESCRIPTION */}
      <h3 className="mb-3 ml-8 text-xl font-bold">Опис проєкту</h3>
      <div className="flex flex-wrap gap-5 mb-10">
        <div className="w-[845px] bg-white rounded-[10px] px-8 py-5 border-card-border border flex flex-col justify-between">
          <p>Ввести опис проєкту</p>
          {/* <p className="flex justify-between gap-5 font-bold max-w-[440px]">
            Дата старту формування команди{' '}
            <span className="ml-14">08/17/2023</span>
          </p> */}
          <div>
            <label htmlFor="dateTeam">Дата формування команди</label>
            <Controller
              control={control}
              name="dateTeam"
              rules={{ required: "Дата формування команди є обов'язковою" }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value ? new Date(field.value) : null}
                  showIcon
                  onChange={(date) => field.onChange(date)}
                  dateFormat="MM/dd/yyyy"
                  className="flex flex-row-reverse items-center justify-between w-full ml-5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            />
            <FaCalendarDay className="text-primary-blue" />
            {errors.dateTeam && <p>{errors.dateTeam.message}</p>}
          </div>
          <p className="flex justify-between gap-5 font-bold max-w-[440px]">
            Дата старту розробки <span className="ml-14">08/17/2023</span>
          </p>
        </div>
        <div className="w-[412px] flex flex-col justify-between gap-5">
          <div className="bg-white rounded-[10px] px-8 py-2 border-card-border border justify-between flex items-end">
            <p>Бали за участь</p>
            <p className="font-semibold">Вказати кількість балів</p>
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
          <ProjectDropdown />
        </div>
        <div className="w-[412px] flex flex-col justify-between bg-white rounded-[10px] px-8 py-5 border-card-border border">
          <div className="flex items-center gap-3">
            <FaLinkedin color="#1e70eb" size={32} />{' '}
            <a
              href="https://www.linkedin.com"
              className="relative inline-block duration-500 group"
            >
              <span className="group-hover:after:w-full after:w-0 after:block after:h-[1px] after:bg-primary-blue after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-500 hover:text-primary-blue">
                https://www.linkedin.com
              </span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <FaSquareFacebook color="#1e70eb" size={32} />{' '}
            <a
              href="https://www.facebook.com"
              className="relative inline-block duration-500 group"
            >
              <span className="group-hover:after:w-full after:w-0 after:block after:h-[1px] after:bg-primary-blue after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-500 hover:text-primary-blue">
                https://www.facebook.com
              </span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <FaTelegram color="#1e70eb" size={32} />{' '}
            <a
              href="https://www.telegram.com"
              className="relative inline-block duration-500 group"
            >
              <span className="group-hover:after:w-full after:w-0 after:block after:h-[1px] after:bg-primary-blue after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-500 hover:text-primary-blue">
                https://www.telegram.com
              </span>
            </a>
          </div>
        </div>
      </div>
      {/* TEAM */}
      <h3 className="mb-3 ml-8 text-xl font-bold">Склад команди</h3>
      <div className="flex flex-wrap gap-5">
        {specializations.map((specialization) => (
          <div className="w-[268px] bg-white rounded-[10px] px-8 py-5 border-card-border border h-[282px] flex flex-col justify-start gap-3">
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
