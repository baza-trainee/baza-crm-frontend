import { RootState } from '../types';
import { useQuery } from '@tanstack/react-query';
import { getUserById } from '../utils/userApi';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserProfileHeader from '../components/Portal/UserProfileHeader';
import type { Member } from '../types';
import TitleHeader from '../components/Portal/TitleHeader';
import UserRating from '../components/Portal/UserRating';
import AdminUserForm from '../components/AdminUserView/AdminUserForm';
import { useEffect } from 'react';

const AdminUserView = () => {
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) => state.userState.user);
  const { isSuccess, data } = useQuery({
    queryKey: [`user/${id}`],
    queryFn: () => {
      return getUserById(user!.token, Number(id));
    },
  });
  useEffect(() => {
    scrollTo(0, 0);
  }, []);
  return (
    <section className="flex flex-col w-full min-h-screen gap-5 px-8 pt-5 pb-24 bg-light-blue-bg">
      {isSuccess && (
        <>
          <UserProfileHeader
            firstName={data.user.firstName}
            lastName={data.user.lastName}
            status={data.user.status as Member['status']}
          />
          <TitleHeader title="Інформація учасника" />
          <div className="flex w-full gap-5">
            <div className="flex-0 lg:flex-1 bg-white border rounded-xl border-card-border">
              <AdminUserForm user={data.user} />
            </div>
            <UserRating
              projectPoints={data.user.projectPoints}
              karmaPoints={
                data.user.karmaPoints ? data.user.karmaPoints.toString() : '0'
              }
            />
          </div>
        </>
      )}
    </section>
  );
};

export default AdminUserView;
