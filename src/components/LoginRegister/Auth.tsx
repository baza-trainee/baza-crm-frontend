// import axios from 'axios';

// export const registerUser = async (data: { email: string; password: string }) => {
//   const response = await axios.post('http://185.161.208.63:5000/api/v1/auth/register', data);
//   return response.data;
// };

import axios from 'axios';

type RegisterResponse = {
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
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
