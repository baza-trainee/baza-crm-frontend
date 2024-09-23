import axios from 'axios';

import { RegisterResponse, User } from '../types';

export const loginUserApi = async (data: {
  email: string;
  password: string;
}): Promise<User> => {
  const url = `${import.meta.env.VITE_API_URL}/auth/login`;
  const response = await axios.post<User>(url, data);
  return response.data;
};

export const registerUserApi = async (data: {
  email: string;
  password: string;
}): Promise<RegisterResponse> => {
  const url = `${import.meta.env.VITE_API_URL}/auth/register`;
  const response = await axios.post<RegisterResponse>(url, data);
  return response.data;
};
