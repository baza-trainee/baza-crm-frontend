export type Link = {
  href: string;
  label: string;
};

export type SelectOptionType = {
  value: string;
  label: string;
};

export type OptionType = {
  value: string;
  label: string;
};

export type StatusCount = {
  [key: string]: number;
};

type ProjectRequirement = {
  projectId: number;
  tagId: number;
  count: number;
};

type ProjectMember = {
  projectId: number;
  tagId: number;
  userId: number;
};

export type Project = {
  id: number;
  name: string;
  description: string;
  projectPoints: number;
  projectStatus: string;
  projectType: 'free' | 'light' | 'strong';
  price: number;
  dateStart: string;
  dateTeam: string;
  links: string[];
  projectRequirments: ProjectRequirement[];
  projectMember: ProjectMember[];
};

export type Tag = {
  id: number;
  name: string;
  color: string;
  isSpecialization: boolean;
  count?: number;
};

export type User = {
  token: string;
  user: {
    id: string;
    email: string;
    isAdmin: boolean;
  };
};

export type UserState = {
  user: User | null;
};

export type RootState = {
  userState: UserState;
};

export type RegisterResponse = {
  message: string;
  stack: string;
  token?: string;
  user?: {
    id: number;
    email: string;
    isAdmin: boolean;
  };
};

export type Inputs = {
  login: string;
  password: string;
};

type Specialization = {
  id: number;
  count: number;
  name?: string;
  color?: string;
  isSpecialization?: boolean;
};

export type CreateProjectRequest = {
  description: string;
  name: string;
  projectPoints: number;
  projectType: 'free' | 'light' | 'strong';
  price: number;
  dateStart: string;
  dateTeam: string;
  specializations: Specialization[];
};

export type CreateProjectMutationVariables = {
  projectData: CreateProjectRequest;
  token: string;
};

export type UpdateProjectRequest = {
  description: string;
  name: string;
  projectPoints: number;
  projectType: 'free' | 'light' | 'strong';
  price: number;
  dateStart: string;
  dateTeam: string;
  links: string[];
  specializations: Specialization[];
};

export type UpdateProjectMutationVariables = {
  projectData: UpdateProjectRequest;
  token: string;
  projectId: number;
};

export type CreateProjectResponse = {
  id: string;
};

export type UpdateProjectResponse = {
  message: string;
};

export type MemberData = {
  email: string;
  tagId: number;
};

export type AddMemberMutationVariables = {
  memberData: MemberData;
  token: string;
  projectId: number;
};

export type addMemberResponse = {
  message: string;
};

export type DeleteMemberMutationVariables = {
  userId: number;
  token: string;
  projectId: number;
};

export type deleteMemberResponse = {
  message: string;
};
