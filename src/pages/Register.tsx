import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import ButtonLogin from '../components/LoginRegister/ButtonLogin';
import PopUp from '../components/LoginRegister/PopUp';
import LogoSection from '../components/LoginRegister/LogoSection';
import axios from 'axios';

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
    handleSubmit,
    reset,
  } = useForm<Inputs>({
    mode: 'onBlur',
  });

  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (data.password !== data.confirmPassword) {
        return;
      }

      /* add crm url-backend  */
      const response = await axios.post('http://#/register', {
        username: data.login,
        password: data.password,
      });

      if (response.data.token) {
        setIsPopUpVisible(true);
        reset();
      }
    } catch (error) {}
  };

  const handleClosePopUp = () => {
    setIsPopUpVisible(false);
  };

  return (
    <div className="grid h-screen place-items-center w-full bg-text-black pt-[50px] pb-[198px]">
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
        <div className="flex flex-col">
          <label className="font-Open Sans font-sans text-[20px] font-normal leading-[1.5] text-white mb-[2.5px]">
            Підтвердити пароль <span className="text-red">*</span>
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
            className="font-Lato font-sans font-normal text-[16px] bg-input-normal rounded-[10px] p-[16px] h-[40px]  mb-[49px]"
          />
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
        <ButtonLogin
          label="Зареєструватися"
          type="submit"
          disabled={!isValid}
        />
      </form>
      {isPopUpVisible && (
        <PopUp
          text1="Вітаю!"
          text2="Реєстрація пройшла успішно."
          onClose={handleClosePopUp}
        />
      )}
    </div>
  );
};

export default Register;
