import axios from 'axios';

import {
  UpdateUserMutationVariables,
  UpdateUserResponse,
  UserRequest,
} from '../types';

export const getUserRequests = async (
  token: string,
  resolvedFilter: boolean,
): Promise<UserRequest[]> => {
  const url = `${import.meta.env.VITE_API_URL}/userRequest?resolved=${resolvedFilter}`;

  const { data } = await axios.get<UserRequest[]>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const updateUserRequest = async ({
  token,
  requestId,
  accepted,
}: UpdateUserMutationVariables): Promise<UpdateUserResponse> => {
  const url = `${import.meta.env.VITE_API_URL}/userRequest/${requestId}`;
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.patch<UpdateUserResponse>(
    url,
    { accepted },
    authHeaders,
  );
  return data;
};
