import UserActivityStatus from './UserActivityStatus';
import UserProfileName from './UserProfileName';
import type { Member } from '../../types';
import { Dispatch, SetStateAction } from 'react';

const UserProfileHeader = ({
  firstName,
  lastName,
  status,
  setStatus,
}: {
  firstName: string;
  lastName: string;
  status: Member['status'];
  setStatus: Dispatch<
    SetStateAction<'active' | 'working' | 'pause' | undefined>
  >;
}) => {
  return (
    <div className="flex justify-between items-center py-4 font-normal">
      <UserProfileName firstName={firstName} lastName={lastName} />
      <UserActivityStatus status={status} setStatus={setStatus} />
    </div>
  );
};

export default UserProfileHeader;
