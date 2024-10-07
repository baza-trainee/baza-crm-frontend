import axios from 'axios';
import { type Project } from '../types';

export const filterProjects = async (token: string): Promise<Project[]> => {
  const url = `${import.meta.env.VITE_API_URL}/project`;
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get<Project[]>(url, authHeaders);

  return data;
};
