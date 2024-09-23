import React, { useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { RiFilter3Line } from 'react-icons/ri';
import ActionChoice from '../components/ActionChoice';
// import AnalyticsTable from '../components/AnalyticsTable';
import SubjectOption from '../components/SubjectOption';
import ActionOption from '../components/ActionOption';

const Analytics: React.FC = () => {
  const [action, setAction] = useState<string>('');
  const [infoType, setInfoType] = useState<string>('');

  console.log(action);
  console.log(infoType);
  console.log(infoType);
  // console.log(text);
  // const data = [];
  return (
    <section className="p-8 font-lato font-normal text-[20px] leading-[30px]">
      <div className="flex flex-row mb-[30px]">
        <div className="flex flex-row">
          <ActionOption
            id="filter"
            text="Фільтр"
            action="Фільтр"
            setAction={setAction}
            infoType={infoType}
          >
            <FiFilter className="w-6 h-6 mr-2.5" />
          </ActionOption>
          <ActionOption
            id="sorting"
            text="Сортування"
            action="Сортування"
            setAction={setAction}
            infoType={infoType}
          >
            <RiFilter3Line className="w-6 h-6 mr-2.5" />
          </ActionOption>
        </div>
        <div className="flex flex-row ">
          <SubjectOption
            // infoType="Учасники"
            id="users"
            text="Учасники"
            setInfoType={setInfoType}
            setAction={setAction}
            action={''}
          />

          <SubjectOption
            // infoType="Проєкти"
            id="projects"
            text="Проєкти"
            setInfoType={setInfoType}
            setAction={setAction}
            action={''}
          />
        </div>
      </div>
      <div className="flex gap-5">
        <div className="">
          <ActionChoice action={action} infoType={infoType} />
        </div>
        {/* {data.length > 0 ? (
          <AnalyticsTable />
        ) : (
          <div>За обраними параметрами дані не знайдено </div>
        )} */}
      </div>
    </section>
  );
};
export default Analytics;
