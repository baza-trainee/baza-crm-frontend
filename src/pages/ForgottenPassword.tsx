import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import ButtonLogin from '../components/LoginRegister/ButtonLogin';
import LogoSection from '../components/LoginRegister/LogoSection';
import Countdown from '../components/Forgotten-Password/Countdown';
import { forgottenPasswordApi } from '../utils/authApi';
import axios from 'axios';

type Inputs = {
  email: string;
};

const ForgottenPassword = () => {
  const [send, setSend] = useState(false);
  const [dontExistUser, setDontExistUser] = useState(false);
  const {
    register,
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<Inputs>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await forgottenPasswordApi(data.email);
      setSend(true);
      setDontExistUser(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setDontExistUser(true);
      } else {
        console.error('Unexpected error:', error);
      }
    }
    reset();
  };

  return (
    <div className="grid min-h-screen place-items-center w-full bg-text-black pb-[280px]">
      <LogoSection width="700px" title="Забули свій пароль?" />
      <Link
        to="/login"
        className="flex w-[151px] mt-[50px] mx-auto font-Open Sans font-sans text-[16px] text-hover-blue font-normal leading-6 underline decoration-0"
      >
        Повернутися назад
      </Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[538px] mt-[29.5px] mx-auto"
      >
        <div className="flex flex-col">
          <label className="font-Open Sans font-sans text-[20px] font-normal leading-[1.5] text-white mb-[2.5px]">
            Email
          </label>
          <div className="w-full mb-[23.5px]">
            <input
              type="email"
              {...register('email', { required: true })}
              className="font-Lato w-full mb-2 font-sans font-normal leading-relaxed text-[16px] bg-input-normal rounded-[10px] p-[16px] h-[40px]"
            />
            {dontExistUser && (
              <p className="text-sm text-red">User dont exist</p>
            )}
          </div>
        </div>
        {send ? (
          <Countdown send={send} setSend={setSend} />
        ) : (
          <ButtonLogin
            label="Отримати посилання"
            type="submit"
            disabled={!isValid}
          />
        )}
      </form>
    </div>
  );
};

export default ForgottenPassword;
