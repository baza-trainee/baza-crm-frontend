import axios from 'axios';

type RegisterResponse = {
  message: string;
  stack: string;
  token?: string;
  user?: {
    id: number;
    email: string;
    isAdmin: boolean;
  };
};

export const registerUser = async (data: {
  email: string;
  password: string;
}): Promise<RegisterResponse> => {
  const url = `${import.meta.env.VITE_API_URL}/auth/register`;
  const response = await axios.post<RegisterResponse>(url, data);
  return response.data;
};
