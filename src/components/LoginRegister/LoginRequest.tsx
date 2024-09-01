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
  const response = await axios.post<LoginResponse>(
    'http://185.161.208.63:5000/api/v1/auth/login',
    data,
  );
  return response.data;
};
