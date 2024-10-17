import axios from 'axios';
import { UserInformation } from '../types';

export const getUserById = async (
  token: string,
  userId: number,
): Promise<UserInformation> => {
  const url = `${import.meta.env.VITE_API_URL}/user/${userId}`;
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get<UserInformation>(url, authHeaders);
  return data;
};
