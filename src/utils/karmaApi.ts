import axios from 'axios';
import { BotProjectDetails, SetEvaluations } from '../types';

export const getKarmaObject = async (
  karmaToken: string,
  authToken: string,
): Promise<BotProjectDetails> => {
  const url = `${import.meta.env.VITE_API_URL}/karma/prepare?data=${karmaToken}`;
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
export const setKarma = async (
  karmaToken: string,
  authToken: string,
  data: SetEvaluations,
) => {
  const url = `${import.meta.env.VITE_API_URL}/karma/setKarma?data=${karmaToken}`;
  const response = await axios.post<BotProjectDetails>(url, data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response;
};
