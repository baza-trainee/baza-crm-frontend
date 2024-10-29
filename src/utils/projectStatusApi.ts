import axios from 'axios';
import {
  ChangeStatusMutationVariables,
  FinishProjectMutationVariables,
  MessageResponse,
} from '../types';

export const changeStatus = async ({
  status,
  token,
  projectId,
}: ChangeStatusMutationVariables): Promise<MessageResponse> => {
  const url = `${import.meta.env.VITE_API_URL}/project/${projectId}/status`;
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.patch<MessageResponse>(
    url,
    { status },
    authHeaders,
  );

  return data;
};

export const finishProject = async ({
  token,
  projectId,
}: FinishProjectMutationVariables): Promise<MessageResponse> => {
  const url = `${import.meta.env.VITE_API_URL}/project/finish/${projectId}`;
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post<MessageResponse>(url, {}, authHeaders);

  return data;
};
