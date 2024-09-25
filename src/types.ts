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
  projectType: string;
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
};

// export type User = {
//   username: string;
//   jwt: string;
//   isAdmin: boolean;
// };

export type User = {
  // message: string;
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
