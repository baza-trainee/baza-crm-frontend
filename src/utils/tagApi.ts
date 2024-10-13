import axios from 'axios';
import { type Tag } from '../types';

export const getTags = async (token: string): Promise<Tag[]> => {
  const url = `${import.meta.env.VITE_API_URL}/tag`;

  const { data } = await axios.get<Tag[]>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(data);
  return data;
};
