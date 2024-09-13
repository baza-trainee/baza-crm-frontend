import axios from 'axios';

const url = `${import.meta.env.VITE_API_URL}/project`;
const token = import.meta.env.VITE_TOKEN;

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

// export interface ProjectsResponse {
//   projects: Project[];
// }

export const fetchProjects = async (): Promise<Project[]> => {
  const { data } = await axios.get<Project[]>(url, {
    headers: {
      Authorization: `Bearer ` + token,
    },
  });
  return data;
};
