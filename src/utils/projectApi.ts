import axios, { AxiosResponse } from 'axios';
import {
  CreateProjectMutationVariables,
  CreateProjectResponse,
  type Project,
} from '../types';

export const getProjects = async (token: string): Promise<Project[]> => {
  const url = `${import.meta.env.VITE_API_URL}/project`;
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get<Project[]>(url, authHeaders);

  return data;
};

export const getProjectById = async (
  id: number,
  token: string,
): Promise<Project> => {
  const url = `${import.meta.env.VITE_API_URL}/project/${id}`;
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get<Project>(url, authHeaders);

  return data;
};

export const createProject = async ({
  projectData,
  token,
}: CreateProjectMutationVariables): Promise<CreateProjectResponse> => {
  const urlProject = `${import.meta.env.VITE_API_URL}/project`;
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const projectResponse: AxiosResponse<CreateProjectResponse> =
    await axios.post(urlProject, projectData, authHeaders);

  const projectId = projectResponse.data;

  const urlSpecializations = `${import.meta.env.VITE_API_URL}/project/${projectId}/requirment`;

  const promises = projectData.specializations.map((specialization) =>
    axios.post(
      `${urlSpecializations}/${specialization.id}`,
      {
        count: specialization.count,
      },
      authHeaders,
    ),
  );

  await Promise.all(promises);

  return projectResponse.data;
};
