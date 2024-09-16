import axios from 'axios';

type LoginResponse = {
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
  };
};

export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  const url = `${import.meta.env.VITE_API_URL}/auth/login`;
  const response = await axios.post<LoginResponse>(url, data);
  return response.data;
};
