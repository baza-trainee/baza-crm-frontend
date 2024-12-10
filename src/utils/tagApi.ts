import axios from 'axios';
import { type Tag } from '../types';

export const getTags = async (token: string): Promise<Tag[]> => {
  const url = `${import.meta.env.VITE_API_URL}/tag`;
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get<Tag[]>(url, authHeaders);

  return data;
};

export const addUserTag = async (
  token: string,
  tags: number[],
): Promise<Tag[][]> => {
  const addTag = async (tagId: number) => {
    const url = `${import.meta.env.VITE_API_URL}/tag/addTag/${tagId}`;
    const authHeaders = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post<Tag[]>(url, {}, authHeaders);

    return data;
  };

  const data = await Promise.all(tags.map(async (t) => await addTag(t)));
  return data;
};
export const deleteTag = (token: string, tagId: string) => {
  const url = `${import.meta.env.VITE_API_URL}/tag/removeTag/${tagId}`;
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const data = axios.post(url, {}, authHeaders);
  return data;
};
