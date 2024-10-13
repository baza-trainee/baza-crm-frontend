import axios from 'axios';
import {
  type Member,
  Project,
  // DataForm,
  RequestBodyProjects,
  RequestBodyMembers,
} from '../types';

export const filterMembers = async (
  token: string,
  body: RequestBodyMembers,
): Promise<Member[]> => {
  const url = `${import.meta.env.VITE_API_URL}/analytics/users`;

  const { data } = await axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data;
};

export const filterProjects = async (
  token: string,
  body: RequestBodyProjects,
): Promise<Project[]> => {
  const url = `${import.meta.env.VITE_API_URL}/analytics/projects`;
  console.log(body);
  const data = await axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data.data;
};
