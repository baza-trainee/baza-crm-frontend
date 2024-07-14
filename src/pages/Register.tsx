import logo from '../../src/assets/common/logo.svg';

const Register = () => {
  return (
    <div className='bg-[#071933] pt-[50px] pb-[198px]'>
      <div className='w-full mx-auto mb-[30px]'>
        <img src={logo} alt='Logo' className='w-[150px] h-[150px] mx-auto' />
      </div>
      <div className='w-[891px] text-center pt-[50px] mx-auto'>
        <h1 className='font-Lato font-sans text-[40px] text-white'>Реєстрація учасника в CRM системі на Baza Trainee Ukraine</h1>
      </div>
      <div className='w-[538px] h-[432px] mt-[50px] mx-auto bg-[#fff]'></div>
    </div>
  );
};

export default Register;
