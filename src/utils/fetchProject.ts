import axios from 'axios';

interface ProjectRequirement {
  projectId: number;
  tagId: number;
  count: number;
}

interface ProjectMember {
  projectId: number;
  tagId: number;
  userId: number;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  projectPoints: number;
  projectStatus: string;
  projectType: string;
  price: number;
  dateStart: string;
  dateTeam: string;
  links: string[];
  projectRequirments: ProjectRequirement[];
  projectMember: ProjectMember[];
}

export const fetchProject = async (id: number): Promise<Project> => {
  const url = `${import.meta.env.VITE_API_URL}/project/${id}`;
  const token = import.meta.env.VITE_TOKEN;

  const { data } = await axios.get<Project>(url, {
    headers: {
      Authorization: `Bearer ` + token,
    },
  });
  return data;
};
