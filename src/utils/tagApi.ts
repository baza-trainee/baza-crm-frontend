import axios from 'axios';
import { type Tag } from '../types';

export const getTags = async (): Promise<Tag[]> => {
  const url = `${import.meta.env.VITE_API_URL}/tag`;
  const token = import.meta.env.VITE_TOKEN;

  const { data } = await axios.get<Tag[]>(url, {
    headers: {
      Authorization: `Bearer ` + token,
    },
  });
  return data;
};
