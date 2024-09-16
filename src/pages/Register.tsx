import { useForm, SubmitHandler } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import ButtonLogin from '../components/LoginRegister/ButtonLogin';
import LogoSection from '../components/LoginRegister/LogoSection';
import { registerUser } from '../utils/Auth';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Spinner from '../components/Spinner';

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
  } = useForm<Inputs>({
    mode: 'onBlur',
  });

  // const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  type RegisterResponse = {
    message: string;
  };

  const mutation = useMutation({
    mutationFn: registerUser,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data: RegisterResponse) => {
      console.log('Registration successful:', data);
      // navigate('/crm');
      reset();
    },
    onError: (error: any) => {
      console.error('Registration error:', error);

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
    mutation.mutate({ email: data.login, password: data.password });
  };

  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');

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
        <div className="flex flex-col">
          <label className="font-Open Sans font-sans text-[20px] font-normal leading-[1.5] text-white mb-[2.5px]">
            Логін (Email)
          </label>
          <input
            placeholder="Evgen.ga@gmail.com"
            {...register('login', {
              required: "обов'язкове поле",
            })}
            className={`font-Lato font-sans font-normal leading-relaxed text-[16px] bg-input-normal rounded-[10px] p-[16px] h-[40px] mb-[23.5px] ${errors?.login ? 'border border-red-500' : ''}`}
          />
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
        <div className="flex flex-col relative">
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
            className={`font-Lato font-sans font-normal leading-relaxed text-[16px] rounded-[10px] p-[16px] h-[40px] mb-[8px] ${
              password ? 'bg-white' : 'bg-input-normal-state'
            }`}
          />
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
        <div className="flex flex-col relative">
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
            className={`font-Lato font-sans font-normal text-[16px] bg-input-normal rounded-[10px] p-[16px] h-[40px]  mb-[49px] ${
              confirmPassword ? 'bg-white' : 'bg-input-normal-state'
            }`}
          />
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
          <div className="h-[40px] text-red">
            {errors?.confirmPassword && (
              <p>{errors?.confirmPassword?.message || 'Error!'}</p>
            )}
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
            <span className="underline leading-[1.62] cursor-pointer ">
              <a>Правилами користування</a>
            </span>{' '}
            та{' '}
            <span className="underline leading-[1.62] cursor-pointer">
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
          <ButtonLogin label="Увійти" type="submit" disabled={!isValid} />
        )}
      </form>
    </div>
  );
};

export default Register;
