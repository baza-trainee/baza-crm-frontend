import axios from 'axios';

export const connectBot = async (token: string, discordToken: string) => {
  const url = `${import.meta.env.VITE_API_URL}/user/discord?data=${discordToken}`;
  const response = await axios.post(
    url,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
