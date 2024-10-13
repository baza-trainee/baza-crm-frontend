import React, { useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { RiFilter3Line } from 'react-icons/ri';
// import SortMembers from '../components/SortMembers'; // додай імпорт компонента
import FilterMembers from '../components/FilterMembers'; // додай імпорт компонента
import SortProjects from '../components/SortProjects'; // додай імпорт компонента
import FilterProjects from '../components/FilterProjects';
import SubjectOption from '../components/SubjectOption';
import ActionOption from '../components/ActionOption';

// import { useMutation } from '@tanstack/react-query';
// import { useSelector } from 'react-redux';
import {
  Member,
  Project,
  RequestBodyProjects,
  RequestBodyMembers,
} from '../types';
import { filterProjects, filterMembers } from '../utils/filterApi';

const Analytics: React.FC = () => {
  const [action, setAction] = useState<string>('');
  const [infoType, setInfoType] = useState<string>('');

  // const user = useSelector((state: RootState) => state.userState.user);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzI4ODIwMzQwLCJleHAiOjE3Mjg5MDY3NDB9.ZEhMEU2j0IlrT-oa_WP4l7OniQv2SjWUvg3-NmBa8co';

  const handleProjectsFilter = async (data: RequestBodyProjects) => {
    console.log(data);
    try {
      // setLoading(true); // Set loading while fetching
      const result = await filterProjects(token, data); // Fetch filtered projects
      setFilteredProjects(result); // Update the projects state with fetched data
    } catch (error) {
      throw new Error('Проєктів не знайдено');
      console.error('Error fetching projects:', error);
    } finally {
      // setLoading(false); // Stop loading when the request is done
    }
  };

  const handleMembersFilter = async (data: RequestBodyMembers) => {
    console.log(data);
    try {
      // setLoading(true); // Set loading while fetching
      const membersResult = await filterMembers(token, data); // Fetch filtered projects
      setFilteredMembers(membersResult); // Update the projects state with fetched data
    } catch (error) {
      throw new Error('Проєктів не знайдено');
      console.error('Error fetching projects:', error);
    } finally {
      // setLoading(false); // Stop loading when the request is done
    }
  };

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
          {infoType === 'Учасники' && action === 'Фільтр' && (
            <FilterMembers
              members={filteredMembers}
              onFilterMembers={handleMembersFilter}
              error={'error'}
            />
          )}
          {infoType === 'Проєкти' && action === 'Сортування' && (
            <SortProjects projects={filteredProjects} />
          )}
          {infoType === 'Проєкти' && action === 'Фільтр' && (
            <FilterProjects
              projects={filteredProjects}
              onFilterProjects={handleProjectsFilter}
              error={'fvsdfgsdf'}
            />
          )}
          {/* <ActionChoice action={action} infoType={infoType} /> */}
        </div>
      </div>
    </section>
  );
};
export default Analytics;
