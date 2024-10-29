import { useQuery } from '@tanstack/react-query';
import { Project, UserInformation } from '../types';
import { getUserById } from './userApi';
import { getProjectById } from './projectApi';

export const useProjectWithUsers = (token: string, projectId: number) => {
  return useQuery<Project, Error>({
    queryKey: ['projectWithUsers', projectId],
    queryFn: async () => {
      // GET PROJECT BY ID AND token
      const project = await getProjectById(projectId, token);

      // ARRAY OF UNIQUE USER IDS
      const userIds = [
        ...new Set(project.projectMember.map((req) => req.userId)),
      ];

      // FETCH USER DATA IN PARALLEL
      const users = await Promise.all(
        userIds.map((id) => getUserById(token, id)),
      );

      // CREATE AN OBJECT FOR FAST USER LOOKUP BY ID
      const usersById = users.reduce(
        (acc, userWrapper) => {
          const user = userWrapper.user; // EXTRACT USER OBJECT
          if (user && user.id) {
            // CHECK IF USER EXISTS AND HAS A VALID ID
            acc[user.id] = userWrapper; // STORE THE ENTIRE WRAPPER
          } else {
            console.error('Invalid user data:', userWrapper); // LOG IF USER DATA IS INVALID
          }
          return acc;
        },
        {} as Record<number, UserInformation>, // TYPE FOR THE WHOLE WRAPPER
      );

      // RETURN PROJECT WITH USER DATA INCLUDED
      const data = {
        ...project,
        projectMember: project.projectMember.map((req) => ({
          ...req,
          user: usersById[req.userId],
        })),
      };

      return data;
    },
  });
};
