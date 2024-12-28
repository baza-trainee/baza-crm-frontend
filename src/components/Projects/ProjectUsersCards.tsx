import type { Project, RootState, Tag, UserInformation } from '../../types';
import { getUserById } from '../../utils/userApi';
import { useSelector } from 'react-redux';
import { useQueries, useQueryClient } from '@tanstack/react-query';

const ProjectUsersCards = ({
  project,
  tags,
}: {
  project: Project;
  tags: Tag[];
}) => {
  const token = useSelector((state: RootState) => state.userState.user?.token);
  const queryClient = useQueryClient();

  useQueries({
    queries: project.projectMember.map((m) => {
      return {
        queryKey: ['user', m.userId],
        queryFn: () => getUserById(token!, m.userId),
      };
    }),
  });
  const membersFilter = (tagId: number) => {
    const usersIds = project.projectMember.filter((m) => m.tagId === tagId);
    const users = usersIds.map((u) => userFromCache(u.userId));
    return users;
  };

  const userFromCache = (id: number) => {
    const user: UserInformation | undefined = queryClient.getQueryData([
      'user',
      id,
    ]);
    return user?.user;
  };
  const taginfo = (tagId: number) => {
    const currentTag = tags?.find((t) => t.id === tagId);
    return currentTag;
  };
  console.log(project.projectRequirments);
  return (
    <div className="flex flex-wrap gap-5">
      {project.projectRequirments.map((tag) => (
        <div
          key={tag.tagId}
          className="w-[268px] bg-white rounded-[10px] px-8 py-5 border-card-border border h-[282px] flex flex-col justify-start gap-3"
        >
          <div className="flex items-center justify-between">
            <div
              style={
                taginfo(tag.tagId)?.color
                  ? { backgroundColor: taginfo(tag.tagId)?.color }
                  : { backgroundColor: '#1e70eb' }
              }
              className="px-8 py-2 text-white rounded-r-[10px] -ml-8 self-start bg-primary-blue"
            >
              {taginfo(tag.tagId)?.name}
            </div>
            <p>
              <span
                style={
                  tag.count === membersFilter(tag.tagId).length
                    ? { color: '#1e70eb' }
                    : { color: 'black' }
                }
              >
                {membersFilter(tag.tagId).length}
              </span>
              <span className="text-primary-blue">/{tag.count}</span>
            </p>
          </div>
          <div className="flex flex-col gap-1">
            {membersFilter(tag.tagId).map((user, index) => (
              <div className="bg-blue-hover px-3 rounded-[10px]" key={index}>
                <p className="font-sans">{`${user?.firstName} ${user?.lastName}`}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectUsersCards;
