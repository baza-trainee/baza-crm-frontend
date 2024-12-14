import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import ButtonLogin from '../components/LoginRegister/ButtonLogin';
import PopUp from '../components/LoginRegister/PopUp';
import LogoSection from '../components/LoginRegister/LogoSection';
import { confirmPasswordApi } from '../utils/authApi';

type Inputs = {
  password: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const location = useLocation();
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [token, setToken] = useState<string>();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setError,
    reset,
  } = useForm<Inputs>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<Inputs> = async ({
    password,
    confirmPassword,
  }) => {
    if (password === confirmPassword) console.log(true);
    else
      setError('confirmPassword', {
        type: 'custom',
        message: "Passwords don't match",
      });
    await confirmPasswordApi(password, token!);
    setIsPopUpVisible(true);
    reset();
  };

  useEffect(() => {
    const dataQueryParams = new URLSearchParams(location.search);
    setToken(dataQueryParams.get('data')!);
  }, [location]);

  const handleClosePopUp = () => {
    setIsPopUpVisible(false);
  };

  return (
    <div className="grid min-h-screen place-items-center w-full bg-text-black pb-[198px]">
      <LogoSection width="700px" title="Відновлення пароля" />
      <div className="w-[151px] mt-[50px] mx-auto font-Open Sans font-sans text-[16px] text-hover-blue font-normal leading-6 underline decoration-0">
        <Link to="/forgotten-password">Повернутися назад</Link>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[538px] mt-[50px] mx-auto"
      >
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
            className="font-Lato font-sans font-normal leading-relaxed text-[16px] bg-input-normal rounded-[10px] p-[16px] h-[40px]  mb-[8px]"
          />
          <p className="font-Open Sans font-sans text-[12px] font-normal text-normal-ui">
            Пароль має містити від 8 до 30 символів
          </p>
          <div className="h-[40px] text-red">
            {errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}
          </div>
        </div>
        <div className="flex flex-col">
          <label className="font-Open Sans font-sans text-[20px] font-normal leading-[1.5] text-white mb-[2.5px]">
            Підтвердження пароля<span className="text-red">*</span>
          </label>
          <input
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
            })}
            className="font-Lato font-sans font-normal text-[16px] bg-input-normal rounded-[10px] p-[16px] h-[40px]  mb-3"
          />
          <div className="h-[40px] text-red">
            {errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>
        </div>
        <ButtonLogin label="Зберегти" type="submit" disabled={!isValid} />
      </form>
      {isPopUpVisible && (
        <PopUp
          text1="Вітаю!"
          text2="Пароль успішно відновлено."
          onClose={handleClosePopUp}
        />
      )}
    </div>
  );
};

export default ResetPassword;
