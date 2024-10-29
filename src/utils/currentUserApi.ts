import axios from 'axios';
import { UserData } from '../types';

export const getCurrentUser = async (token: string): Promise<UserData> => {
  const url = `${import.meta.env.VITE_API_URL}/auth/me`;

  const response = await axios.post<UserData>(
    url,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log(response.data);
  return response.data;
};
