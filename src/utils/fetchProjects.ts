import axios from 'axios';

const url = `${import.meta.env.VITE_API_URL}/project`;
const token = import.meta.env.VITE_TOKEN;

export const fetchProjects = async () => {
  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ` + token,
    },
  });
  return data;
};
