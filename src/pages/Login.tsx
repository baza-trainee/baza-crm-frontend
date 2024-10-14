import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { LuAlertTriangle } from 'react-icons/lu';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import ButtonLogin from '../components/LoginRegister/ButtonLogin';
import LogoSection from '../components/LoginRegister/LogoSection';
import Spinner from '../components/Spinner';
import { Inputs } from '../types';
import { loginUser } from '../features/userSlice';
import { loginUserApi } from '../utils/authApi';

const Login = () => {
  const {
    register,
    formState: { errors, isValid },
    setError,
    handleSubmit,
    watch,
    reset,
  } = useForm<Inputs>({
    mode: 'onBlur',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: loginUserApi,
    onSuccess: (data) => {
      dispatch(loginUser(data));
      console.log('Login successful:', data);
      navigate('/crm');
      reset();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error('Не вдалося увійти');
      if (error?.response?.data?.message) {
        setError('login', {
          type: 'server',
          message: error.response.data.message,
        });
      }
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate({ email: data.login, password: data.password });
  };

  const password = watch('password', '');

  if (mutation.isPending) {
    return (
      <div className="min-h-screen bg-text-black">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="grid w-full min-h-screen pb-20 place-items-center bg-text-black">
      <div className="">
        <LogoSection
          width="469px"
          title="Вхід до CRM системи Baza Trainee Ukraine"
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-[538px] mt-[50px] mx-auto"
        >
          <div className="flex flex-col relative">
            <label className="font-Open Sans font-sans text-[20px] font-normal leading-[1.5] text-white mb-[2.5px]">
              Логін (Email)
            </label>
            <input
              {...register('login')}
              placeholder="example@gmail.com"
              defaultValue="admin@gmail.com"
              className={`font-Lato font-sans font-normal leading-relaxed text-[16px] bg-input-normal rounded-[10px] p-[16px] h-[40px] mb-[23.5px] ${
                errors?.login ? 'border-red border-2 border-solid' : ''
              }`}
            />
            {errors?.login && (
              <LuAlertTriangle
                size={24}
                className="absolute right-[16px] top-[52px] transform -translate-y-1/2 text-red"
              />
            )}
            <div className="relative">
              <div className="absolute bottom-[-2px]">
                {errors?.login && (
                  <p className="font-Open Sans font-sans text-[12px] text-red">
                    {errors.login.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="relative flex flex-col">
            <label className="font-Open Sans font-sans text-[20px] font-normal leading-[1.5] text-white mb-[2.5px]">
              Пароль <span className="text-red">*</span>
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Пароль"
              defaultValue="adminTestPass"
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
              className={`font-Lato font-sans font-normal leading-relaxed text-[16px] bg-input-normal rounded-[10px] p-[16px] h-[40px]  mb-[23.5px] ${
                password ? 'bg-white' : 'bg-input-normal-state'
              } ${errors?.login ? 'border-red border-2 border-solid' : ''}`}
            />
            {errors?.login && (
              <LuAlertTriangle
                size={24}
                className="absolute right-[16px] top-[52px] transform -translate-y-1/2 text-red"
              />
            )}
            {!errors?.login && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-[16px] top-[52px] transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={24} />
                ) : (
                  <AiOutlineEye size={24} />
                )}
              </button>
            )}
            <div className="relative">
              <div className="absolute bottom-[-2px]">
                {errors?.login && (
                  <p className="font-Open Sans font-sans text-[12px] text-red">
                    {errors.login.message}
                  </p>
                )}
              </div>
            </div>
            {/* <div className="h-[40px] text-red">
              {errors?.password && (
                <p>{errors?.password?.message || 'Error!'}</p>
              )}
            </div> */}
          </div>
          <ButtonLogin label="Увійти" type="submit" disabled={!isValid} />
        </form>
        <div className="w-[216px] mx-auto pt-[50px] text-center">
          <p className="font-Open Sans font-sans text-[16px] leading-[1.5] text-light-grey">
            Забули свій пароль?
            <br />
            <Link
              to="/forgotten-password"
              className="underline cursor-pointer text-light-grey hover:text-hover-gray duration-500"
            >
              Відновити
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
