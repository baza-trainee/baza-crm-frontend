import axios from 'axios';
import { Member } from '../types';

export const getCurrentUser = async (token: string): Promise<Member> => {
  const url = `${import.meta.env.VITE_API_URL}/auth/me`;

  const response = await axios.post<Member>(
    url,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
