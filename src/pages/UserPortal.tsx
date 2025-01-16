import { useEffect, useState } from 'react';
import PortalUserForm from '../components/Portal/PortalUserForm';
import TitleHeader from '../components/Portal/TitleHeader';
import UserProfileHeader from '../components/Portal/UserProfileHeader';
import UserRating from '../components/Portal/UserRating';
import { useSelector } from 'react-redux';
import { RootState, Member, UserData, UpdateUser } from '../types';
import { getCurrentUser } from '../utils/currentUserApi';
import { updateUser } from '../utils/userApi';
import { addUserTag } from '../utils/tagApi';
import { useNavigate } from 'react-router-dom';

const UserPortal = () => {
  const user = useSelector((state: RootState) => state.userState.user);
  const [userData, setUserData] = useState<Member>();
  const [status, setStatus] = useState<Member['status']>();
  const navigate = useNavigate();

  const handleUserUpdate = async (tags: number[], data: UserData) => {
    const userData: UpdateUser = {
      linkedin: data.linkedin,
      discordReceiving: data.discordReceiving,
      city: data.city,
      country: data.country,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      status: status as string,
    };
    await updateUser(user!.token!, userData);

    await addUserTag(user!.token!, tags);
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user?.token) {
          const userData: Member = await getCurrentUser(user.token);
          setUserData(userData);
          setStatus(userData.status);
          console.log('karmapoints' + ' ' + userData.karmaPoints);
          if (!userData.discord) navigate('/crm/instruction');
        } else {
          console.error('No token found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user]);
  return (
    <section className="flex flex-col w-full min-h-screen gap-5 px-8 pt-5 pb-24 bg-light-blue-bg">
      {userData && (
        <>
          <UserProfileHeader
            firstName={userData.firstName}
            lastName={userData.lastName}
            status={status!}
            setStatus={setStatus}
          />
          <TitleHeader title="Інформація учасника" />
          <div className="flex w-full gap-5">
            <div className="flex-0 lg:flex-1 bg-white border rounded-xl border-card-border">
              <PortalUserForm
                handleUserUpdate={handleUserUpdate}
                userData={userData}
              />
            </div>
            <UserRating
              projectPoints={userData.projectPoints}
              karmaPoints={userData.karmaPoints}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default UserPortal;
