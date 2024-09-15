import axios from 'axios';
import { type Project } from '../../types';

export const fetchProjects = async (): Promise<Project[]> => {
  const url = `${import.meta.env.VITE_API_URL}/project`;
  const token = import.meta.env.VITE_TOKEN;

  const { data } = await axios.get<Project[]>(url, {
    headers: {
      Authorization: `Bearer ` + token,
    },
  });
  return data;
};
