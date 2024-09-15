import axios from 'axios';
import { type Project } from '../../types';

export const fetchProject = async (id: number): Promise<Project> => {
  const url = `${import.meta.env.VITE_API_URL}/project/${id}`;
  const token = import.meta.env.VITE_TOKEN;

  const { data } = await axios.get<Project>(url, {
    headers: {
      Authorization: `Bearer ` + token,
    },
  });
  return data;
};
