import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../utils/LoginRequest';
import { Link } from 'react-router-dom';
import LogoSection from '../components/LoginRegister/LogoSection';
import ButtonLogin from '../components/LoginRegister/ButtonLogin';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

type Inputs = {
  login: string;
  password: string;
};

const Login = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    reset,
  } = useForm<Inputs>({
    mode: 'onBlur',
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  type LoginResponse = {
    message: string;
  };

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: LoginResponse) => {
      console.log('Login successful:', data);
      navigate('/crm');
      reset();
    },
    onError: (error: Error) => {
      console.error('Login error:', error);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate({ email: data.login, password: data.password });
  };

  const password = watch('password', '');

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
              placeholder="example@gmail.com"
              className="font-Lato font-sans font-normal leading-relaxed text-[16px] bg-input-normal rounded-[10px] p-[16px] h-[40px] mb-[23.5px]"
            />
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
              className={`font-Lato font-sans font-normal leading-relaxed text-[16px] bg-input-normal rounded-[10px] p-[16px] h-[40px]  mb-[23.5px] ${
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
            <div className="h-[40px] text-red">
              {errors?.password && (
                <p>{errors?.password?.message || 'Error!'}</p>
              )}
            </div>
          </div>
          <ButtonLogin label="Увійти" type="submit" disabled={!isValid} />
        </form>
        <div className="w-[216px] mx-auto pt-[50px] text-center">
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
      </div>
    </div>
  );
};

export default Login;
