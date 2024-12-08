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

const UserPortal = () => {
  const token = useSelector((state: RootState) => state.userState.user?.token);
  const [userData, setUserData] = useState<Member>();
  const [status, setStatus] = useState<Member['status']>();

  const handleUserUpdate = async (tags: number[], data: UserData) => {
    console.log(tags);
    console.log(data);
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
    await updateUser(token!, userData); //TODO: tested update User fucnctionality and add tags
    await addUserTag(token!, tags);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (token) {
          const userData: Member = await getCurrentUser(token);
          setUserData(userData);
          setStatus(userData.status);
        } else {
          console.error('No token found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [token]);
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
            <div className="flex-1 bg-white border rounded-xl border-card-border">
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
