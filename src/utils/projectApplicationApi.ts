import axios from 'axios';

import {
  Application,
  resolveApplicationMutationVariables,
  resolveApplicationResponse,
} from '../types';

export const getApplicationById = async (
  token: string,
  projectId: number,
): Promise<Application[]> => {
  const url = `${import.meta.env.VITE_API_URL}/project/${projectId}/aplication`;
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get<Application[]>(url, authHeaders);
  return data;
};

export const resolveApplication = async ({
  token,
  projectId,
  aplicationId,
  status,
}: resolveApplicationMutationVariables): Promise<resolveApplicationResponse> => {
  const url = `${import.meta.env.VITE_API_URL}/project/${projectId}/aplication/resolve`;
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post<resolveApplicationResponse>(
    url,
    { aplicationId, status },
    authHeaders,
  );

  return data;
};
