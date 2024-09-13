import axios from 'axios';

const url = `${import.meta.env.VITE_API_URL}/project`;
const token = import.meta.env.VITE_TOKEN;

type ProjectsResponse = {
  id: number;
  label: string;
  title: string;
  tags: {
    id: number;
    label: string;
    number: number;
    all: number;
  }[];
  points: number;
  teamStart: string;
  projectStart: string;
};

export const fetchProjects = async (): Promise<ProjectsResponse> => {
  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ` + token,
    },
  });
  return data;
};
