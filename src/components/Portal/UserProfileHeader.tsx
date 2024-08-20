import UserActivityStatus from './UserActivityStatus';
import UserProfileName from './UserProfileName';

const UserProfileHeader = () => {
  return (
    <div className="flex justify-between items-center py-4 font-normal">
      <UserProfileName />
      <UserActivityStatus />
    </div>
  );
};

export default UserProfileHeader;
