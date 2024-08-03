import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/authSlice';
import LogoSection from '../components/LoginRegister/LogoSection';
import ButtonLogin from '../components/LoginRegister/ButtonLogin';
import Tooltip from '../../src/components/LoginRegister/ToolTip';
import help from '../../src/assets/common/circle-help.svg';
import axios from 'axios';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // console.log('sent:', data);
    try {
      const response = await axios.post(
        'https://185.161.208.63:5000/api/v1/auth/login',
        {
          email: data.login,
          password: data.password,
        },
      );

      console.log('answer:', response.data);
      dispatch(
        setUser({
          email: response.data.email,
          id: response.data.id,
          token: response.data.token,
        }),
      );

      navigate('/');
      reset();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Login error:', error.response.data);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <div className="grid min-h-screen place-items-center w-full bg-text-black pb-[280px]">
      <div className="">
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
              {errors?.password && (
                <p>{errors?.password?.message || 'Error!'}</p>
              )}
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
                    href="mailto:administarator@gmail.com"
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
    </div>
  );
};

export default Login;
