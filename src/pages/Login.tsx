import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../components/LoginRegister/LoginRequest';
import { Link } from 'react-router-dom';
import LogoSection from '../components/LoginRegister/LogoSection';
import ButtonLogin from '../components/LoginRegister/ButtonLogin';

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

  const navigate = useNavigate();

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
