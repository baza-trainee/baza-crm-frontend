import 'react-datepicker/dist/react-datepicker.css';

import DatePicker from 'react-datepicker';
import { Controller, useFormContext } from 'react-hook-form';

import calendar from '../../assets/common/calendar.svg';

const DescriptionForm = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  return (
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
        {errors.description &&
          typeof errors.description.message === 'string' && (
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
        <img src={calendar} alt="calendar" className="absolute top-1 right-7" />
      </div>
      <div className="h-5 -mt-5 -mb-3">
        {errors.dateTeam && typeof errors.dateTeam.message === 'string' && (
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
        <img src={calendar} alt="calendar" className="absolute top-1 right-7" />
      </div>
      <div className="h-5 -mt-5 -mb-3">
        {errors.dateStart && typeof errors.dateStart.message === 'string' && (
          <span className="text-red">{errors.dateStart.message}</span>
        )}
      </div>
    </div>
  );
};

export default DescriptionForm;
