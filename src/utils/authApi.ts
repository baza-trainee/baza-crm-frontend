import axios from 'axios';

import { RegisterResponse, Auth } from '../types';

export const loginUserApi = async (data: {
  email: string;
  password: string;
}): Promise<Auth> => {
  const url = `${import.meta.env.VITE_API_URL}/auth/login`;
  const response = await axios.post<Auth>(url, data);
  return response.data;
};

export const registerUserApi = async (data: {
  email: string;
  password: string;
  code: string;
}): Promise<RegisterResponse> => {
  const url = `${import.meta.env.VITE_API_URL}/auth/register`;
  const response = await axios.post<RegisterResponse>(url, data);
  return response.data;
};

export const getEmailByTokenApi = async (code: string) => {
  const url = `${import.meta.env.VITE_API_URL}/auth/confirmRegisterCode`;
  const response = await axios.post(url, { code: `${code}` });
  return response.data;
};
