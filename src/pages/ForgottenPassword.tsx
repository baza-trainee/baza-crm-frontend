import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/authSlice';
import axios from 'axios';
import ButtonLogin from '../components/LoginRegister/ButtonLogin';
import LogoSection from '../components/LoginRegister/LogoSection';

type Inputs = {
  email: string;
};

const ForgottenPassword = () => {
  const {
    register,
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<Inputs>({
    mode: 'onBlur',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log('sent:', data);
    try {
      const response = await axios.post(
        'http://185.161.208.63:5000/api/v1/auth/#',
        {
          email: data.email,
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

      navigate('/login');
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
          <input
            {...register('email')}
            className="font-Lato font-sans font-normal leading-relaxed text-[16px] bg-input-normal rounded-[10px] p-[16px] h-[40px] mb-[23.5px]"
          />
        </div>
        <div className="font-Open Sans font-sans my-[30px] p-[16px] rounded-[10px] bg-normal-ui">
          <p className="mb-[8px] text-[16px] leading-6 font-semibold text-[rgba(0, 0, 0, 0.2)]">
            На вказану електронну пошту буде відправлено повідомлення з
            посиланням для відновлення паролю. Посилання діє 30хв.
          </p>
          <div className="flex justify-between">
            <p className="text-[14px] font-normal">
              Якщо лист не отримано, спробуйте ще через 1хв.
            </p>
            <p>
              <span className="text-primary-blue">59</span> сек.
            </p>
          </div>
        </div>
        <ButtonLogin
          label="Отримати посилання"
          type="submit"
          disabled={!isValid}
        />
      </form>
    </div>
  );
};

export default ForgottenPassword;
