export type Link = { href: string; label: string };

export type SelectOptionType = {
  value?: string;
  label?: string;
  id?: number;
  name?: string;
  color?: string;
};

export type SelectStatusType = {
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

export type User = {
  id: number;
  email: string;
  technologies: Technology[];
  specializations: Specialization[];
  linkedin: string;
  discord: string | null;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  country: string;
  discordReceiving: boolean;
  status: string;
  registerAt: string;
  projectPoints: number;
  karmaPoints: number | null;
};

export type UserInformation = {
  user: User;
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
  user?: UserInformation;
};

export type Document = {
  name: string;
  link: string;
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
  documents: Document[] | string;
  projectRequirments: ProjectRequirement[];
  projectMember: ProjectMember[];
};

export type Tag = {
  id: number;
  name: string;
  color: string;
  isSpecialization: boolean;
  count?: number;
  userCount?: number;
};

export type Auth = {
  token: string;
  user: {
    id: string;
    email: string;
    isAdmin: boolean;
  };
};

export type UserState = {
  user: Auth | null;
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

export type Member = {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  specializations: Specialization[];
  technologies: [];
  country: string;
  city: string;
  status: string;
  registerAt: string;
  karmaPoints?: number;
  projectPoints?: number;
  linkedin?: string;
  discord?: string;
  phone?: string;
  discordReceiving?: boolean;
};

export type DataForm = {
  // statuses: string[];
  // formats: string[];
  statuses: { value: string }[];
  formats: { value: string }[];
  technologies?: { value: string; id?: number; label: string }[];
  specializations?: { value: string; id?: number; label: string }[];
  selectedDateTo?: Date;
  selectedDateFrom?: Date;
};

export type RequestBodyProjects = {
  formats?: string[];
  statuses?: string[];
};

// export type RequestBodyMembers = {
//   statuses?: string[];
//   technologies?: number[];
//   specializations?: number[];
//   selectedDateTo?: string;
//   selectedDateFrom?: string;
// };

export type RequestBodyMembers = {
  formats?: string[];
  statuses?: string[];
  technologies?: number[];
  specializations?: number[];
  to?: string;
  from?: string;
};

export type Specialization = {
  id: number;
  count?: number;
  name?: string;
  color?: string;
  isSpecialization?: boolean;
};

export type Technology = {
  id: number;
  name: string;
  color: string;
  isSpecialization: boolean;
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
  documents: Document[];
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

export type MemberData = {
  email: string;
  tagId: number;
};

export type AddMemberMutationVariables = {
  memberData: MemberData;
  token: string;
  projectId: number;
};

export type DeleteMemberMutationVariables = {
  userId: number;
  token: string;
  projectId: number;
};

export type UserRequest = {
  id: number;
  email: string;
  linkedin: string;
  specialization: string;
  discord: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  phone: string;
  isAccepted: boolean | null;
};

export type UpdateUserMutationVariables = {
  token: string;
  requestId: number;
  accepted: boolean;
};

export type UpdateUserResponse = {
  status: boolean;
};

export type Application = {
  id: number;
  projectId: number;
  tagId: number;
  userId: number;
  state: string;
  user?: UserInformation;
};

export type resolveApplicationMutationVariables = {
  token: string;
  projectId: number;
  aplicationId: number;
  status: string;
};

export type ChangeStatusMutationVariables = {
  status: string;
  token: string;
  projectId: number;
};

export type FinishProjectMutationVariables = {
  token: string;
  projectId: number;
};

export type MessageResponse = {
  message: string;
};
