import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { LuAlertTriangle } from 'react-icons/lu';
import { AxiosError } from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ButtonLogin from '../components/LoginRegister/ButtonLogin';
import LogoSection from '../components/LoginRegister/LogoSection';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { registerUserApi, getEmailByTokenApi } from '../utils/authApi';

type Inputs = {
  login: string;
  password: string;
  confirmPassword: string;
  checkbox: boolean;
};

const Register = () => {
  const {
    register,
    formState: { errors, isValid },
    setError,
    handleSubmit,
    watch,
    reset,
    setValue,
  } = useForm<Inputs>({
    mode: 'onBlur',
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [emailLoading, setEmailLoading] = useState(true);
  const [tokenError, setTokenError] = useState('');

  // get code from link
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  const mutation = useMutation({
    mutationFn: registerUserApi,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      setTimeout(() => {
        navigate('/crm');
        reset();
      }, 1500);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      if (error?.response?.data?.message) {
        setError('login', {
          type: 'server',
          message: error.response.data.message,
        });
      }
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!code) {
      toast.error('Код не знайдено в URL');
      return;
    }
    console.log('Дані форми:', data.login, code);
    toast.success('Відправлено');

    mutation.mutate({
      email: data.login,
      code: code,
      password: data.password,
    });
  };

  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');

  useEffect(() => {
    if (code) {
      setEmailLoading(true);
      getEmailByTokenApi(code)
        .then((response) => {
          const email = response.data?.email;
          if (email) {
            setValue('login', email);
            setEmailLoading(false);
          } else {
            setTokenError('Email не знайдений за наданим токеном.');
            setEmailLoading(false);
          }
        })
        .catch((error) => {
          console.error('Помилка при отриманні email:', error);
          setTokenError('Не вдалося отримати email за токеном.');
          setEmailLoading(false);
        });
    } else {
      setTokenError('Токен не знайдено в URL');
      setEmailLoading(false);
    }
  }, [code, setValue]);

  return (
    <div className="grid min-h-screen place-items-center w-full bg-text-black pb-[198px]">
      <LogoSection
        width="700px"
        title="Реєстрація учасника в CRM системі на Baza Trainee Ukraine"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[538px] mt-[50px] mx-auto"
      >
        <div className="relative flex flex-col">
          <label className="font-Open Sans font-sans text-[20px] font-normal leading-[1.5] text-white mb-[2.5px]">
            Логін (Email)
          </label>
          {emailLoading ? (
            <Spinner />
          ) : (
            <>
              <input
                placeholder="Evgen.ga@gmail.com"
                {...register('login')}
                className={`font-Lato font-sans font-normal leading-relaxed text-[16px] bg-input-normal  hover:bg-hover-blue focus:outline-none focus:border-primary-blue border-2 border-solid rounded-[10px] p-[16px] h-[40px] mb-[8px] ${
                  errors?.login || tokenError
                    ? 'border-red border-2 border-solid'
                    : ''
                }`}
              />
              {tokenError && (
                <LuAlertTriangle
                  size={24}
                  className="absolute right-[16px] top-[52px] transform -translate-y-1/2 text-red"
                />
              )}
              <div className="relative h-[18px] mb-[12px]">
                <div className="absolute">
                  {errors?.login && (
                    <p className="font-Open Sans font-sans text-[12px] text-red">
                      {errors.login.message}
                    </p>
                  )}
                  {tokenError && (
                    <p className=" text-red text-[12px]">{tokenError}</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="relative flex flex-col">
          <label className="font-Open Sans font-sans text-[20px] font-normal leading-[1.5] text-white mb-[2.5px]">
            Пароль <span className="text-red">*</span>
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Пароль"
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
            className={`font-Lato font-sans font-normal leading-relaxed text-[16px] hover:bg-hover-blue focus:outline-none focus:border-primary-blue border-2 border-solid rounded-[10px] p-[16px] h-[40px] mb-[8px] ${
              password ? 'bg-white' : 'bg-input-normal'
            } ${errors?.password ? 'border-red border-2 border-solid' : ''}`}
          />
          {errors?.password && (
            <LuAlertTriangle
              size={24}
              className="absolute right-[45px] top-[52px] transform -translate-y-1/2 text-red"
            />
          )}
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
          <div className="font-Open Sans font-sans text-[12px] mb-[12px] text-light-grey">
            <p>Пароль має містити від 8 до 30 символів</p>
          </div>
        </div>
        <div className="relative flex flex-col">
          <label className="font-Open Sans font-sans text-[20px] font-normal leading-[1.5] text-white mb-[2.5px]">
            Підтвердити пароль <span className="text-red">*</span>
          </label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Підтвердити пароль"
            {...register('confirmPassword', {
              required: "обов'язкове поле",
              minLength: {
                value: 8,
                message: 'Мінімум 8 символів',
              },
              maxLength: {
                value: 30,
                message: 'Максимум 30 символів',
              },
              validate: (val: string) => {
                if (watch('password') != val) {
                  return 'Паролі не співпадають';
                }
              },
            })}
            className={`font-Lato font-sans font-normal text-[16px] bg-input-normal  hover:bg-hover-blue focus:outline-none focus:border-primary-blue border-2 border-solid rounded-[10px] p-[16px] h-[40px]  mb-[8px] ${
              confirmPassword ? 'bg-white' : 'bg-input-normal'
            } ${errors?.confirmPassword ? 'border-red border-2 border-solid' : ''}`}
          />
          {errors?.confirmPassword && (
            <LuAlertTriangle
              size={24}
              className="absolute right-[45px] top-[52px] transform -translate-y-1/2 text-red"
            />
          )}
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-[16px] top-[52px] transform -translate-y-1/2 text-gray-500"
          >
            {showConfirmPassword ? (
              <AiOutlineEyeInvisible size={24} />
            ) : (
              <AiOutlineEye size={24} />
            )}
          </button>
          <div className="relative h-[18px] mb-[32px]">
            <div className="absolute text-[12px] text-red">
              {errors?.confirmPassword && (
                <p>{errors?.confirmPassword?.message || 'Error!'}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-[10px] mb-[32px]">
          <input
            {...register('checkbox', {
              required: "обов'язкове поле",
            })}
            type="checkbox"
            className="w-[20px] h-[20px] mt-[4px]"
          />
          <label className="font-Open Sans font-sans text-[16px] text-light-grey">
            Погоджуюсь з{' '}
            <span className="underline leading-[1.62] cursor-pointer duration-500 hover:text-primary-blue">
              <a>Правилами користування</a>
            </span>{' '}
            та{' '}
            <span className="underline leading-[1.62] cursor-pointer duration-500 hover:text-primary-blue">
              <a>Політикою конфіденційності</a>
            </span>
            .
          </label>
        </div>
        {isLoading ? (
          <div className="flex justify-center mt-4">
            <Spinner />
          </div>
        ) : (
          <ButtonLogin
            label="Зареєструватись"
            type="submit"
            disabled={!isValid || emailLoading}
          />
        )}
      </form>
    </div>
  );
};

export default Register;
