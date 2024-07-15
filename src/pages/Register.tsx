import React, { useState } from 'react';
import logo from '../../src/assets/common/logo.svg';

const Register = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agree: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Паролі не співпадають!");
      return;
    }
    if (!formData.agree) {
      alert("Ви повинні погодитися з Правилами користування та Політикою конфіденційності!");
      return;
    }
    console.log('Form submitted', formData);
  };

  return (
    <div className='w-full bg-[#071933] pt-[50px] pb-[198px]'>
      <div className='w-full mb-[30px]'>
        <img src={logo} alt='Logo' className='w-[150px] h-[150px] mx-auto' />
      </div>
      <div className='w-[891px] text-center pt-[50px] mx-auto'>
        <h1 className='font-Lato font-sans text-[40px] text-white'>Реєстрація учасника в CRM системі на Baza Trainee Ukraine</h1>
      </div>
        <form onSubmit={handleSubmit} className='w-[538px] mt-[50px] mx-auto'>
          <div className='flex flex-col'>
            <label className='font-Open Sans font-sans text-[20px] font-normal leading-[1.5] text-white mb-[2.5px]'>Логін (Email)</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              className='font-Lato font-sans font-normal leading-relaxed text-[16px] bg-[#d2e4ff] rounded-[10px] p-[16px] h-[40px] mb-[23.5px]'
            /> 
          </div>
          <div className='flex flex-col'>
            <label className='font-Open Sans font-sans text-[20px] font-normal leading-[1.5] text-white mb-[2.5px]'>Пароль <span className='text-red'>*</span></label>
            <input
              type='email'
              name='email'
              value={formData.password}
              onChange={handleChange}
              required
              className='font-Lato font-sans font-normal leading-relaxed text-[16px] bg-[#d2e4ff] rounded-[10px] p-[16px] h-[40px]  mb-[23.5px]'
            /> 
          </div>
          <div className='flex flex-col'>
            <label className='font-Open Sans font-sans text-[20px] font-normal leading-[1.5] text-white mb-[2.5px]'>Підтвердити пароль <span className='text-red'>*</span></label>
            <input
              type='email'
              name='email'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className='font-Lato font-sans font-normal text-[16px] bg-[#d2e4ff] rounded-[10px] p-[16px] h-[40px]  mb-[49px]'
            /> 
          </div>
          <div className='flex gap-[10px] mb-[32px]'>
            <input
              type='checkbox'
              name='agree'
              checked={formData.agree}
              onChange={handleChange}
              required
              className='w-[20px] h-[20px] mt-[4px]'
            />
            <label className='font-Open Sans font-sans text-[16px] text-[#b1aeae]'>Погоджуюсь з <span className='underline leading-[1.62] cursor-pointer '><a>Правилами користування</a></span> та <span className='underline leading-[1.62] cursor-pointer'><a>Політикою конфіденційності</a></span>.</label>
          </div>
          <button type='submit' className='block w-[254px] h-[40px] mx-auto font-Open Sans font-sans text-[16px] font-semibold text-white bg-[#1e70eb] rounded-[10px]'>Зареєструватися</button>
        </form>
      </div>
  );
};

export default Register;
