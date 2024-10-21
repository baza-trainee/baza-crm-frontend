import axios from 'axios';

import {
  Application,
  resolveApplicationMutationVariables,
  MessageResponse,
  UserInformation,
} from '../types';
import { useQuery } from '@tanstack/react-query';
import { getUserById } from './userApi';

export const getApplicationsById = async (
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

export const useApplicationsWithUsers = (token: string, projectId: number) => {
  return useQuery<Application[], Error>({
    queryKey: ['applicationsWithUsers', projectId],
    queryFn: async () => {
      const requests = await getApplicationsById(token, projectId);

      // ARRAY OF UNIQUE USER IDS
      const userIds = [...new Set(requests.map((req) => req.userId))];

      // FETCH USER DATA IN PARALLEL
      const users = await Promise.all(
        userIds.map((id) => getUserById(token, id)),
      );

      // CREATE AN OBJECT FOR FAST USER LOOKUP BY ID
      const usersById = users.reduce(
        (acc, userWrapper) => {
          const user = userWrapper.user; // EXTRACT USER OBJECT
          if (user && user.id) {
            // CHECK IF USER EXISTS AND HAS A VALID ID
            acc[user.id] = userWrapper; // STORE THE ENTIRE WRAPPER
          } else {
            console.error('Invalid user data:', userWrapper); // LOG IF USER DATA IS INVALID
          }
          return acc;
        },
        {} as Record<number, UserInformation>, // TYPE FOR THE WHOLE WRAPPER
      );

      // RETURN APPLICATIONS WITH USER DATA INCLUDED
      const data = requests.map((req) => ({
        ...req,
        user: usersById[req.userId],
      }));

      return data;
    },
  });
};

export const resolveApplication = async ({
  token,
  projectId,
  aplicationId,
  status,
}: resolveApplicationMutationVariables): Promise<MessageResponse> => {
  const url = `${import.meta.env.VITE_API_URL}/project/${projectId}/aplication/resolve`;
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post<MessageResponse>(
    url,
    { aplicationId, status },
    authHeaders,
  );

  return data;
};
