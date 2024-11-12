import { useEffect, useState } from 'react';
import star from '../../assets/common/star.svg';
import fullStar from '../../assets/common/full-star.svg';
import { getCurrentUser } from '../../utils/currentUserApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { UserData } from '../../types';

const UserRating: React.FC = () => {
  const token = useSelector((state: RootState) => state.userState.user?.token);
  const [projectPoints, setProjectPoints] = useState<number | null>(null);
  const [karmaPoints, setKarmaPoints] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (token) {
          const userData: UserData = await getCurrentUser(token);
          console.log(userData.projectPoints);
          setProjectPoints(userData.projectPoints ?? 0);
          setKarmaPoints(userData.karmaPoints ?? 0);
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
    <div className="flex-1 h-[719px] overflow-hidden border rounded-xl border-card-border bg-white p-4">
      <h2 className="mb-4 text-lg font-bold text-center">Рейтинг співпраці</h2>
      <table className="m-[-1px] min-w-full text-base border rounded-xl border-card-border ">
        <thead className="font-lato bg-[#e4f1ff]">
          <tr>
            <th className="py-3 border border-card-border rounded-tl-xl">
              Бали за проєкт
            </th>
            <th className="py-3 border border-card-border rounded-tr-xl">
              Оцінка команди
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-3 text-center border border-[#bcd7ff]">
              <div className="flex items-center justify-center gap-3">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={i < (karmaPoints ?? 0) ? fullStar : star}
                    alt={i < (karmaPoints ?? 0) ? 'Full star' : 'Star'}
                    width={24}
                    height={24}
                  />
                ))}
              </div>
            </td>
            <td className="py-3 text-center border border-[#bcd7ff]">
              {projectPoints ?? '-'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserRating;
