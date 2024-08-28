import axios from 'axios';

type RegisterUserData = {
  email: string;
  password: string;
};

type RegisterResponse = {
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
  };
};

export const registerUser = async (
  data: RegisterUserData,
): Promise<RegisterResponse> => {
  const response = await axios.post<RegisterResponse>(
    'http://185.161.208.63:5000/api/v1/auth/register',
    data,
  );
  return response.data;
};
