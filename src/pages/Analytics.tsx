import React, { useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { RiFilter3Line } from 'react-icons/ri';
// import SortMembers from '../components/SortMembers'; // додай імпорт компонента
// import FilterMembers from '../components/FilterMembers'; // додай імпорт компонента
import SortProjects from '../components/SortProjects'; // додай імпорт компонента
import FilterProjects from '../components/FilterProjects';
import SubjectOption from '../components/SubjectOption';
import ActionOption from '../components/ActionOption';

// import { useMutation } from '@tanstack/react-query';
// import { useSelector } from 'react-redux';
import { Project, RequestBody } from '../types';
import { filterProjects } from '../utils/filterApi';

const Analytics: React.FC = () => {
  const [action, setAction] = useState<string>('');
  const [infoType, setInfoType] = useState<string>('');

  // const user = useSelector((state: RootState) => state.userState.user);
  const [filterData, setFilterData] = useState<Project[]>([]);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzI4MzMyMjY2LCJleHAiOjE3Mjg0MTg2NjZ9.5sBn9j5NSoSba-yCfFrYT0Wb5SACjHzpaDdJ5RCMZac';

  const handleFilter = async (data: RequestBody) => {
    console.log(data);
    try {
      // setLoading(true); // Set loading while fetching
      const result = await filterProjects(token, data); // Fetch filtered projects
      setFilterData(result); // Update the projects state with fetched data
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      // setLoading(false); // Stop loading when the request is done
    }
  };

  // const fetchFilteredProjects = async (
  //   data: RequestBody,
  // ): Promise<Project[]> => {
  //   return await filterProjects(token, data);
  // };

  // const { mutate: handleFilter, isLoading } = useMutation<
  //   Project[],
  //   Error,
  //   RequestBody
  // >(fetchFilteredProjects, {
  //   onSuccess: (data: Project[]) => {
  //     setFilterData(data); // Update the projects state with fetched data
  //   },
  //   onError: (error: string) => {
  //     console.error('Error fetching projects:', error);
  //   },
  // });

  console.log(filterData);
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
            id="users"
            text="Учасники"
            setInfoType={setInfoType}
            setAction={setAction}
            action={''}
          />

          <SubjectOption
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
          {/* {infoType === 'Учасники' && action === 'Сортування' && (
            <SortMembers members={} />
          )} */}
          {/* {infoType === 'Учасники' && action === 'Фільтр' && <FilterMembers />} */}
          {infoType === 'Проєкти' && action === 'Сортування' && (
            <SortProjects projects={filterData} />
          )}
          {infoType === 'Проєкти' && action === 'Фільтр' && (
            <FilterProjects projects={filterData} onFilter={handleFilter} />
          )}
          {/* <ActionChoice action={action} infoType={infoType} /> */}
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
