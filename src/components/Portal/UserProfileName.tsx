import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getCurrentUser } from '../../utils/currentUserApi';

const UserProfileName = () => {
  const [userName, setUserName] = useState('');
  const token = useSelector((state: RootState) => state.userState.user?.token);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (token) {
          const userData = await getCurrentUser(token);
          setUserName(userData.firstName + ' ' + userData.lastName);
          console.log(userName);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [token]);

  const initials = userName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');

  return (
    <div className="flex items-center justify-center gap-3">
      <p className="flex items-center justify-center w-24 h-24 text-5xl leading-7 tracking-tight rounded-full bg-hover-gray text-sidebar-text">
        {initials}
      </p>
      <p className="text-xl leading-normal">{userName}</p>
    </div>
  );
};

export default UserProfileName;
