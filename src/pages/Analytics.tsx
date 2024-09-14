import React from 'react';
import { FiFilter } from 'react-icons/fi';
import { RiFilter3Line } from 'react-icons/ri';
import Button from '../components/Button';
// import { ButtonProps } from '../components/Button';

const Analytics: React.FC = () => {
  return (
    <section className="p-8 flex flex-row font-lato font-normal text-[20px] leading-[30px]">
      <div className="flex flex-row">
        <div className="mr-4 flex flex-row items-center has-[:checked]:text-primary-blue">
          <label className="w-full  text-center flex items-center">
            <input
              type="radio"
              id="filter"
              name="action"
              value="Фільтр"
              className="invisible"
            />
            <FiFilter className="w-6 h-6 mr-2.5" />
            Фільтри
          </label>
        </div>
        <div className="mr-4 flex flex-row items-center has-[:checked]:text-primary-blue">
          <label className="w-full flex text-center items-center">
            <input
              type="radio"
              id="sorting"
              name="action"
              value="Сортування"
              className="invisible"
            />
            <RiFilter3Line className="w-6 h-6 mr-2.5" />
            Сортування
          </label>
        </div>
      </div>
      <div className="flex flex-row ">
        <div className="mr-4 flex items-center justify-center h-14 w-64 rounded-xl border-2 border-solid border-primary-blue  has-[:checked]:text-primary-blue">
          {/* <div className="justify-center before:hidden has-[:checked]:before:block  before:absolute  before:bottom-[-12px]	 before:rounded-b-lg before:bg-primary-blue before:h-5 before:w-64 relative  mr-4 flex items-center h-14 w-64 rounded-xl border-2 border-solid border-primary-blue has-[:checked]:text-primary-blue"> */}
          <input
            type="radio"
            id="users"
            name="info"
            value="Учасники"
            className="invisible"
          />
          {/* <img src={blueLine} alt="blue line" /> */}
          <label htmlFor="users" className="w-full inline-block text-center">
            Учасники
          </label>
        </div>
        <div className="mr-4 flex items-center justify-center h-14 w-64 rounded-xl border-2 border-solid border-primary-blue  has-[:checked]:text-primary-blue">
          <input
            type="radio"
            id="projects"
            name="info"
            value="Проєкти"
            className="invisible"
          />
          <label htmlFor="projects" className="w-full inline-block text-center">
            Проєкти
          </label>
        </div>
      </div>
      <Button label={'Застосувати'} />
    </section>
  );
};
export default Analytics;
