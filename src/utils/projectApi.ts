import axios, { AxiosResponse } from 'axios';
import {
  CreateProjectMutationVariables,
  CreateProjectResponse,
  type Project,
} from '../types';

export const getProjects = async (token: string): Promise<Project[]> => {
  const url = `${import.meta.env.VITE_API_URL}/project`;

  const { data } = await axios.get<Project[]>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getProjectById = async (
  id: number,
  token: string,
): Promise<Project> => {
  const url = `${import.meta.env.VITE_API_URL}/project/${id}`;

  const { data } = await axios.get<Project>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const createProject = async ({
  projectData,
  token,
}: CreateProjectMutationVariables): Promise<CreateProjectResponse> => {
  const url = `${import.meta.env.VITE_API_URL}/project`;

  const { data }: AxiosResponse<CreateProjectResponse> = await axios.post(
    url,
    projectData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};
