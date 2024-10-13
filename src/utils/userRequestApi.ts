import axios from 'axios';

import { UserRequest } from '../types';

export const getUserRequests = async (
  token: string,
): Promise<UserRequest[]> => {
  const url = `${import.meta.env.VITE_API_URL}/userRequest`;

  const { data } = await axios.get<UserRequest[]>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
