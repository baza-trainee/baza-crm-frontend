import { useForm, SubmitHandler } from "react-hook-form";
import logo from '../assets/common/logo.svg';
import help from '../../src/assets/common/circle-help.svg';

type Inputs = {
  login: string;
  password: string;
};

const Login = () => {

  const {
    register,
    formState: {errors, isValid},
    handleSubmit,
    reset,
  } = useForm<Inputs>({
    mode: 'onBlur'
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    alert(JSON.stringify(data));
    reset();
  }

  return (
    <div className='w-full bg-[#071933] pt-[50px] pb-[280px]'>
      <div className='w-full mb-[30px]'>
        <img src={logo} alt='Logo' className='w-[150px] h-[150px] mx-auto' />
      </div>
      <div className='w-[469px] text-center pt-[50px] mx-auto'>
        <h1 className='font-Lato font-sans text-[40px] text-white'>Вхід до CRM системи Baza Trainee Ukraine </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='w-[538px] mt-[50px] mx-auto'>
        <div className='flex flex-col'>
          <label className='font-Open Sans font-sans text-[20px] font-normal leading-[1.5] text-white mb-[2.5px]'>Логін (Email)</label>
          <input
            {...register('login')}
            className='font-Lato font-sans font-normal leading-relaxed text-[16px] bg-[#d2e4ff] rounded-[10px] p-[16px] h-[40px] mb-[23.5px]'
          /> 
        </div>
        <div className='flex flex-col'>
          <label className='font-Open Sans font-sans text-[20px] font-normal leading-[1.5] text-white mb-[2.5px]'>Пароль <span className='text-red'>*</span></label>
          <input
            {...register('password', {
              required: "обов'язкове поле",
              minLength: {
                value: 5,
                message: 'Мінімум 5 символів'
              }
            })}
            className='font-Lato font-sans font-normal leading-relaxed text-[16px] bg-[#d2e4ff] rounded-[10px] p-[16px] h-[40px]  mb-[23.5px]'
          />
          <div className='h-[40px] text-red'>
            {errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}
          </div>
        </div>
        <button type='submit' disabled={!isValid} className='block w-[254px] h-[40px] mx-auto font-Open Sans font-sans text-[16px] font-semibold text-white bg-[#1e70eb] rounded-[10px]'>Увійти</button>
      </form>
      <div className='flex justify-between w-[254px] mx-auto pt-[50px]'>
        <div  className='w-[216px] text-center'>
          <p className='font-Open Sans font-sans text-[16px] leading-[1.5] text-[#b1aeae]'>Забули свій пароль?<br />
          <a href='#resetpassword' className='underline cursor-pointer text-[#788aa0]'>Відновити</a></p>
        </div>
        <div>
          <img src={help} alt='help' className='w-[24px] h-[24px] cursor-pointer' />
        </div>
      </div>
    </div>
  );
};

export default Login;
