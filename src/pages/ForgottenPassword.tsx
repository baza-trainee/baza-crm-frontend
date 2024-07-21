import { useForm, SubmitHandler } from 'react-hook-form';
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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    alert(JSON.stringify(data));
    reset();
  };

  return (
    <div className="w-full bg-[#071933] pt-[50px] pb-[280px]">
      <LogoSection width="700px" title="Забули свій пароль?" />
      {/* <div className='w-full mb-[30px]'>
        <img src={logo} alt='Logo' className='w-[150px] h-[150px] mx-auto' />
      </div>
      <div className='w-[469px] text-center pt-[50px] mx-auto'>
        <h1 className='font-Lato font-sans text-[40px] text-white'>Забули свій пароль?</h1>
      </div> */}

      <div className="w-[151px] mt-[50px] mx-auto font-Open Sans font-sans text-[16px] text-[#a1caff] font-normal leading-6 underline decoration-0">
        <a href="#">Повернутися назад</a>
      </div>

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
            className="font-Lato font-sans font-normal leading-relaxed text-[16px] bg-[#d2e4ff] rounded-[10px] p-[16px] h-[40px] mb-[23.5px]"
          />
        </div>
        <div className="font-Open Sans font-sans my-[30px] p-[16px] rounded-[10px] bg-[#91a2b6]">
          <p className="mb-[8px] text-[16px] leading-6 font-semibold text-[rgba(0, 0, 0, 0.2)]">
            На вказану електронну пошту буде відправлено повідомлення з
            посиланням для відновлення паролю. Посилання діє 30хв.
          </p>
          <div className="flex justify-between">
            <p className="text-[14px] font-normal">
              Якщо лист не отримано, спробуйте ще через 1хв.
            </p>
            <p>
              <span className="text-[#1e70eb]">59</span> сек.
            </p>
          </div>
        </div>
        <button
          type="submit"
          disabled={!isValid}
          className="block w-[254px] h-[40px] mx-auto font-Open Sans font-sans text-[16px] font-semibold text-white bg-[#1e70eb] rounded-[10px]"
        >
          Отримати посилання
        </button>
      </form>
    </div>
  );
};

export default ForgottenPassword;
