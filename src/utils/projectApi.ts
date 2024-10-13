import axios, { AxiosResponse } from 'axios';
import {
  AddMemberMutationVariables,
  addMemberResponse,
  CreateProjectMutationVariables,
  CreateProjectResponse,
  DeleteMemberMutationVariables,
  deleteMemberResponse,
  UpdateProjectMutationVariables,
  UpdateProjectResponse,
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

export const updateProject = async ({
  projectData,
  token,
  projectId,
}: UpdateProjectMutationVariables): Promise<UpdateProjectResponse> => {
  const urlProject = `${import.meta.env.VITE_API_URL}/project/${projectId}`;
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const projectResponse: AxiosResponse<UpdateProjectResponse> =
    await axios.patch(urlProject, projectData, authHeaders);

  const urlSpecializations = `${import.meta.env.VITE_API_URL}/project/${projectId}/requirment`;

  const promises = projectData.specializations.map((specialization) =>
    axios.patch(
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

export const addMember = async ({
  memberData,
  token,
  projectId,
}: AddMemberMutationVariables): Promise<addMemberResponse> => {
  const url = `${import.meta.env.VITE_API_URL}/project/${projectId}/member`;
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post<addMemberResponse>(
    url,
    memberData,
    authHeaders,
  );

  return data;
};

export const deleteMember = async ({
  userId,
  token,
  projectId,
}: DeleteMemberMutationVariables): Promise<deleteMemberResponse> => {
  const url = `${import.meta.env.VITE_API_URL}/project/${projectId}/member`;
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.delete<deleteMemberResponse>(url, {
    data: { userId },
    ...authHeaders,
  });

  return data;
};
