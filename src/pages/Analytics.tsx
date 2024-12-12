import React, { useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { RiFilter3Line } from 'react-icons/ri';
import SortMembers from '../components/SortMembers';
import FilterMembers from '../components/FilterMembers';
import SortProjects from '../components/SortProjects';
import FilterProjects from '../components/FilterProjects';
import SubjectOption from '../components/SubjectOption';
import ActionOption from '../components/ActionOption';

import { useSelector } from 'react-redux';
import {
  Member,
  Project,
  RequestBodyProjects,
  RequestBodyMembers,
  RootState,
} from '../types';
import { filterProjects, filterMembers } from '../utils/filterApi';

const Analytics: React.FC = () => {
  const [action, setAction] = useState<string>('');
  const [infoType, setInfoType] = useState<string>('');

  const user = useSelector((state: RootState) => state.userState.user);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);

  const handleProjectsFilter = async (data: RequestBodyProjects) => {
    console.log(data);
    try {
      if (user?.token) {
        // setLoading(true);
        const result = await filterProjects(user?.token, data);
        setFilteredProjects(result);
      }
    } catch (error) {
      throw new Error('Проєктів не знайдено');
    } finally {
      // setLoading(false); // Stop loading when the request is done
    }
  };

  const handleMembersFilter = async (data: RequestBodyMembers) => {
    console.log(data);
    console.log(data.technologies);

    try {
      if (user) {
        // setLoading(true); // Set loading while fetching

        const membersResult = await filterMembers(user?.token, data);

        setFilteredMembers(membersResult);
      }
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
      <div className="flex w-full gap-5">
        {infoType === 'Учасники' && action === 'Сортування' && (
          <SortMembers members={filteredMembers} />
        )}
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
      </div>
    </section>
  );
};
export default Analytics;
