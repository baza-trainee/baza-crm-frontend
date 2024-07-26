import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import LogoSection from '../components/LoginRegister/LogoSection';
import ButtonLogin from '../components/LoginRegister/ButtonLogin';
import Tooltip from '../../src/components/LoginRegister/ToolTip';
import help from '../../src/assets/common/circle-help.svg';

type Inputs = {
  login: string;
  password: string;
};

const Login = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<Inputs>({
    mode: 'onBlur',
  });

  const [showTooltip, setShowTooltip] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    alert(JSON.stringify(data));
    reset();
  };

  return (
    <div className="w-full bg-text-black pt-[50px] pb-[280px]">
      <LogoSection
        width="469px"
        title="Вхід до CRM системи Baza Trainee Ukraine"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-[538px] mt-[50px] mx-auto"
      >
        <div className="flex flex-col">
          <label className="font-Open Sans font-sans text-[20px] font-normal leading-[1.5] text-white mb-[2.5px]">
            Логін (Email)
          </label>
          <input
            {...register('login')}
            className="font-Lato font-sans font-normal leading-relaxed text-[16px] bg-input-normal rounded-[10px] p-[16px] h-[40px] mb-[23.5px]"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-Open Sans font-sans text-[20px] font-normal leading-[1.5] text-white mb-[2.5px]">
            Пароль <span className="text-red">*</span>
          </label>
          <input
            {...register('password', {
              required: "обов'язкове поле",
              minLength: {
                value: 8,
                message: 'Мінімум 8 символів',
              },
              maxLength: {
                value: 30,
                message: 'Максимум 30 символів',
              },
            })}
            className="font-Lato font-sans font-normal leading-relaxed text-[16px] bg-input-normal rounded-[10px] p-[16px] h-[40px]  mb-[23.5px]"
          />
          <div className="h-[40px] text-red">
            {errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}
          </div>
        </div>
        <ButtonLogin label="Увійти" type="submit" disabled={!isValid} />
      </form>
      <div className="flex justify-between w-[254px] mx-auto pt-[50px]">
        <div className="w-[216px] text-center">
          <p className="font-Open Sans font-sans text-[16px] leading-[1.5] text-light-grey">
            Забули свій пароль?
            <br />
            <Link
              to="/forgotten-password"
              className="underline cursor-pointer text-hover-gray"
            >
              Відновити
            </Link>
          </p>
        </div>
        <div
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="relative"
        >
          <img
            src={help}
            alt="help"
            className="w-[24px] h-[24px] cursor-pointer"
          />
          {showTooltip && (
            <Tooltip
              text="Якщо у тебе виникли проблеми — ти можеш "
              link={
                <a
                  href="mailto:administarator"
                  className="underline text-active-blue"
                >
                  написати Адміністратору
                </a>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
