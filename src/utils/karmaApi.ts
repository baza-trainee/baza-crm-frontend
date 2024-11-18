import axios from 'axios';
import { BotProjectDetails } from '../types';

export const getKarmaInfo = async (
  prepareToken: string,
  authToken: string,
): Promise<BotProjectDetails> => {
  const url = `${import.meta.env.VITE_API_URL}/karma/prepare?data=${prepareToken}`;
  const response = await axios.post<BotProjectDetails>(
    url,
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );
  return response.data;
};
export const setKarma = async () => {}; //оцінювання користувачів
