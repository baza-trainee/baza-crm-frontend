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
  const response = await axios.post<RegisterResponse>(
    'http://185.161.208.63:5000/api/v1/auth/register',
    data,
  );
  return response.data;
};
