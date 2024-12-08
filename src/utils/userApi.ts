import axios from 'axios';
import { UserInformation, UpdateUser } from '../types';

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
export const updateUser = async (
  token: string,
  updateData: UpdateUser,
): Promise<UpdateUser> => {
  const url = `${import.meta.env.VITE_API_URL}/user`;
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.patch<UpdateUser>(url, updateData, authHeaders);
  return data;
};
