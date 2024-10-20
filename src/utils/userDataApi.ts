import axios from 'axios';

import { UserData } from '../types';

export const getUser = async (id: number, token: string): Promise<UserData> => {
  const url = `${import.meta.env.VITE_API_URL}/crm/portal/${id}`;
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get<UserData>(url, authHeaders);
  console.log(response);
  return response.data;
};
